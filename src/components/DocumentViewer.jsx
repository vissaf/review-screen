/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import DocumentPage from "./DocumentPage";

// A custom component that renders a document viewer with zoom buttons
const DocumentViewer = ({ pagesData, sectionsData }) => {
  // A state variable that stores the information of boxes
  const [boxes, setBoxes] = useState([]);
  // A state variable that stores pages array
  const [pages, setPages] = useState(["a2cbec1124234a6d846f908ba9531a2e-1.jpg"]);
  // A state variable that stores the current page index
  const [pageIndex, setPageIndex] = useState(0);
  // A state variable that stores the current zoom level
  const [zoom, setZoom] = useState(1);
  useEffect(() => {
    const boxesData = sectionsData?.children?.map((section) => {
      return {
        x: section?.content?.position[0],
        y: section?.content?.position[1],
        w: section?.content?.position[2],
        h: section?.content?.position[3],
      };
    });
    console.log(boxesData, "boxes");
    setBoxes([boxesData]);
  }, [sectionsData]);

  useState(() => {
    console.log("yahan bhi hai");
    const pageArr = pagesData.data?.documents[0]?.pages?.map(
      (page) => page?.image?.url
    );
    // setPages(pageArr);
    console.log(pageArr, pagesData, "page");
  }, [pagesData]);

  // A function that handles the previous page button click
  const handlePrevPage = () => {
    // If the page index is not the first one
    if (pageIndex > 0) {
      // Decrement the page index
      setPageIndex(pageIndex - 1);
    }
  };
  // A function that handles the next page button click
  const handleNextPage = () => {
    // If the page index is not the last one
    if (pageIndex < pages.length - 1) {
      // Increment the page index
      setPageIndex(pageIndex + 1);
    }
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
  // A function that handles the fit button click
  const handleFit = () => {
    // Set the zoom level to 0.5
    setZoom(0.5);
  };
  // Return the document viewer element
  return (
    <div className="document-viewer">
      <div className="document-page">
        {pages && boxes ? (
          <DocumentPage
            src={pages[pageIndex]}
            zoom={zoom}
            boxes={boxes[pageIndex]}
          />
        ) : null}
      </div>
      <div className="document-controls">
        {/* <button onClick={handlePrevPage} disabled={pageIndex === 0}>
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
        {/* <button onClick={handleFit} disabled={zoom === 0.5}>
          Fit
        </button> */}
      </div>
    </div>
  );
};
// A sample usage of the document viewer component
// const App = () => {
//   // A sample array of document pages as jpeg files
//   const pages = ["page1.jpg", "page2.jpg", "page3.jpg"];
//   // A sample array of boxes objects with coordinates for each page
//   const boxes = [
//     [
//       { x: 100, y: 50, w: 200, h: 100 },
//       { x: 400, y: 300, w: 150, h: 50 },
//     ],
//     [
//       { x: 50, y: 100, w: 100, h: 200 },
//       { x: 300, y: 400, w: 50, h: 150 },
//     ],
//     [{ x: 200, y: 200, w: 200, h: 200 }],
//   ];
//   // Return the app element
//   return (
//     <div className="app">
//       <DocumentViewer pages={pages} boxes={boxes} />
//     </div>
//   );
// };

export default DocumentViewer;
