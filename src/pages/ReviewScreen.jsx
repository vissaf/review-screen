import { useEffect, useState } from "react";
import DocumentViewer from "../components/DocumentViewer";
import Header from "../components/Header";
import RightSidebar from "../components/RightSidebar";

function ReviewScreen() {
  const [sectionsData, setSectionsData] = useState({});
  const [pagesData, setPagesData] = useState({});

  useEffect(() => {
    //Dynamically importing sections.json
    getSections();

    //Dynamically importing pages.json
    getPages();
  }, []);

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
          setPagesData(json.default);
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
          sectionsData={sectionsData?.data?.sections[0]}
        />
      ) : null}
      </div>
      <div className="section-right">
      {sectionsData ? (
        <RightSidebar data={sectionsData?.data?.sections[0]} />
      ) : null}
    </div>
      </div>
    </div>
  );
}

export default ReviewScreen;
