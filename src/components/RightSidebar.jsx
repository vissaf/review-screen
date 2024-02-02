/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { titleToInitials } from "../utils/common";

function RightSidebar({
  sectionsData,
  boxesData,
  hoveredItemId,
  onItemHover,
  onItemHoverLeave,
}) {
  // State to manage the checked status of checkboxes
  const [checkedState, setCheckedState] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  // Helper function to find the fillColor for a given section by ID
  const findFillColorById = (sectionId, type) => {
    const box = boxesData[0]?.find((box) => box.id === sectionId);
    if (type === "border") {
      return box ? box.strokeColor : null;
    }
    return box ? box.fillColor : null;
  };

  // Effect to initialize or update the checkedState when sectionsData changes
  useEffect(() => {
    if (sectionsData) {
      const initialState = sectionsData.reduce((acc, section) => {
        acc[section.id] = selectAll;
        return acc;
      }, {});
      setCheckedState(initialState);
    }
  }, [sectionsData, selectAll]);

  // Effect to update selectAll when all checkboxes are manually selected or deselected
  useEffect(() => {
    const areAllSelected = sectionsData?.every(
      (section) => checkedState[section.id]
    );
    setSelectAll(areAllSelected);
  }, [checkedState, sectionsData]);

  // Handler for checkbox change
  const handleCheckboxChange = (sectionId) => {
    setCheckedState((prevState) => ({
      ...prevState,
      [sectionId]: !prevState[sectionId],
    }));
  };

  // Handler for Select All button
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  // Check if at least one checkbox is selected
  const isAnyCheckboxSelected = Object.values(checkedState).some(
    (checked) => checked
  );

  return (
    <>
      <div className="fields-top">
        <div className="fields-name">Fields</div>
        <div className="flex fields-list">
          <span>Regular Field</span>
          <span>Columns Field</span>
        </div>
      </div>
      <ul>
        {sectionsData?.length
          ? sectionsData.map((section) =>
              section?.content?.position?.length ? (
                <li
                  className={`card ${
                    hoveredItemId === section.id ? "highlight" : ""
                  }`}
                  key={`${section.id}-sidebar`}
                  onMouseEnter={() => onItemHover(section.id)}
                  onMouseLeave={onItemHoverLeave}
                >
                  <div className="flex card-left">
                    <div
                      className="card-initial"
                      style={{
                        background: findFillColorById(section.id),
                        borderLeftColor: findFillColorById(
                          section.id,
                          "border"
                        ),
                      }}
                    >
                      {titleToInitials(section.label)}
                    </div>
                    <div>
                      {section.label}
                      <div className="card-name">
                        {section.content?.value}
                        <span>{section.p_title}</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-right flex">
                    <input
                      type="checkbox"
                      checked={checkedState[section.id] || false}
                      onChange={() => handleCheckboxChange(section.id)}
                    />
                    <div className="dot">
                      <img src="../../dot.png" />
                    </div>
                  </div>
                </li>
              ) : null
            )
          : null}
      </ul>
      <div className="flex fields-bottom">
        <button onClick={handleSelectAll}>
          {selectAll ? "Deselect All" : "Select All"}
        </button>
        <button disabled={!isAnyCheckboxSelected}>Confirm</button>
      </div>
    </>
  );
}

export default RightSidebar;
