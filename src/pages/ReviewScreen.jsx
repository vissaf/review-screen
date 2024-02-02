import { useEffect, useState } from "react";
import DocumentViewer from "../components/DocumentViewer";
import Header from "../components/Header";
import RightSidebar from "../components/RightSidebar";

function ReviewScreen() {
  const [sectionsData, setSectionsData] = useState({});
  const [pagesData, setPagesData] = useState({});
  const [boxesData, setBoxesData] = useState([]);
  const [hoveredItemId, setHoveredItemId] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredItemId(id);
  };

  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };

  useEffect(() => {
    //Dynamically importing sections.json to pretend like an API response and improve performance.
    getSections();
    //Dynamically importing pages.jsonto pretend like an API response and improve performance.
    getPages();
  }, []);

  useEffect(() => {
    const sectionsArr = sectionsData?.data?.sections[0]?.children;
    if (sectionsArr?.length) {
      const boxesData = sectionsArr?.map((section, index) => {
        return {
          x: section?.content?.position[0],
          y: section?.content?.position[1],
          w: section?.content?.position[2],
          h: section?.content?.position[3],
          id: section.id,
          strokeColor: `hsl(${(index * 360) / sectionsArr.length}, 100%, 50%)`,
          fillColor: `hsla(${
            (index * 360) / sectionsArr.length
          }, 100%, 50%, 0.2)`,
        };
      });
      console.log(boxesData, "boxes");
      setBoxesData([boxesData]);
    }
  }, [sectionsData]);

  function getSections() {
    import("../data/sections.json")
      .then((json) => {
        if (json.default.status_code === 200) {
          setSectionsData(json.default);
          console.log(json.default);
        }
      })
      .catch((error) => console.error("Error loading JSON:", error));
  }

  function getPages() {
    import("../data/pages.json")
      .then((json) => {
        if (json.default.status_code === 200) {
          setPagesData(json.default.data.documents[0].pages);
          console.log(json.default, "page ka ");
        }
      })
      .catch((error) => console.error("Error loading JSON:", error));
  }

  return (
    <div>
      <Header />
      <div className="section">
        <div className="section-left">
          {pagesData && sectionsData ? (
            <DocumentViewer
              pagesData={pagesData}
              boxesData={boxesData}
              hoveredItemId={hoveredItemId}
              onItemHover={handleMouseEnter}
              onItemHoverLeave={handleMouseLeave}
            />
          ) : null}
        </div>
        <div className="section-right">
          {sectionsData ? (
            <RightSidebar
              sectionsData={sectionsData?.data?.sections[0].children}
              boxesData={boxesData}
              hoveredItemId={hoveredItemId}
              onItemHover={handleMouseEnter}
              onItemHoverLeave={handleMouseLeave}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ReviewScreen;
