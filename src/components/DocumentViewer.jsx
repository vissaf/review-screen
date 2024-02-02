/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import DocumentPage from "./DocumentPage";

// A custom component that renders a document viewer with zoom buttons
const DocumentViewer = ({
  pagesData,
  boxesData,
  hoveredItemId,
  onItemHover,
  onItemHoverLeave,
}) => {
  // A state variable that stores pages array. Would store all image names.
  const [pages, setPages] = useState([]);
  // A state variable that stores the current page index. Would be used if multiple pages were there.
  const [pageIndex, setPageIndex] = useState(0);
  // A state variable that stores the current zoom level
  const [zoom, setZoom] = useState(0.35);

  useEffect(() => {
    if (pagesData?.length) {
      const pageArr = pagesData?.map((page) => page?.image?.url);
      setPages([...pageArr]);
      console.log(pageArr, pagesData, "page");
      const initialZoom =
        calculateZoom(pagesData[0].image.height, pagesData[0].image.width) /
        1.5;
      setZoom(initialZoom);
    }
  }, [pagesData]);

  // Calculate initial page zoom.
  const calculateZoom = (imageWidth, imageHeight) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const zoomWidth = viewportWidth / imageWidth;
    const zoomHeight = viewportHeight / imageHeight;
    // Choose the smaller zoom level to ensure the image fits within the viewport
    return Math.min(zoomWidth, zoomHeight);
  };

  // A function that handles the zoom in button click
  const handleZoomIn = () => {
    // If the zoom level is not the maximum one
    if (zoom < 1) {
      // Increase the zoom level by 0.25
      setZoom(zoom + 0.25);
    }
  };
  // A function that handles the zoom out button click
  const handleZoomOut = () => {
    // If the zoom level is not the minimum one
    if (zoom > 0.5) {
      // Decrease the zoom level by 0.25
      setZoom(zoom - 0.25);
    }
  };

  // Methods to handle page navigation.
  // const handlePrevPage = () => {
  //   if (pageIndex > 0) {
  //     setPageIndex(pageIndex - 1);
  //   }
  // };
  // const handleNextPage = () => {
  //   if (pageIndex < pages.length - 1) {
  //     setPageIndex(pageIndex + 1);
  //   }
  // };

  // Return the document viewer element
  return (
    <div className="document-viewer">
      <div className="document-page">
        {pages && boxesData ? (
          <DocumentPage
            src={pages[pageIndex]}
            zoom={zoom}
            boxes={boxesData[pageIndex]}
            hoveredItemId={hoveredItemId}
            onItemHover={onItemHover}
            onItemHoverLeave={onItemHoverLeave}
          />
        ) : null}
      </div>
      <div className="document-controls">
        {/* 
        Buttons to navigate pages if there are multiple pages. Commented as that is not the case in this assignment.
        <button onClick={handlePrevPage} disabled={pageIndex === 0}>
          Prev
        </button>
        <button
          onClick={handleNextPage}
          disabled={pageIndex === pages?.length - 1}
        >
          Next
        </button> */}
        <div className="button-handle">
          <button onClick={handleZoomIn} disabled={zoom === 1}>
            +
          </button>
          <button onClick={handleZoomOut} disabled={zoom === 0.5}>
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
