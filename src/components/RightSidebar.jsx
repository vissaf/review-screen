/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { titleToInitials } from "../utils/common";

function RightSidebar({
  sectionsData,
  boxesData,
  hoveredItemId,
  onItemHover,
  onItemHoverLeave,
  handleDelete,
}) {
  const [checkedState, setCheckedState] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const dropdownRef = useRef(null);

  const findFillColorById = (sectionId, type) => {
    const box = boxesData[0]?.find((box) => box.id === sectionId);
    if (type === "border") {
      return box ? box.strokeColor : null;
    }
    return box ? box.fillColor : null;
  };

  useEffect(() => {
    if (sectionsData) {
      const initialState = sectionsData.reduce((acc, section) => {
        acc[section.id] = selectAll;
        return acc;
      }, {});
      setCheckedState(initialState);
    }
  }, [sectionsData, selectAll]);

  useEffect(() => {
    const areAllSelected = sectionsData?.every(
      (section) => checkedState[section.id]
    );
    setSelectAll(areAllSelected);
  }, [checkedState, sectionsData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (sectionId) => {
    setCheckedState((prevState) => ({
      ...prevState,
      [sectionId]: !prevState[sectionId],
    }));
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  const isAnyCheckboxSelected = Object.values(checkedState).some(
    (checked) => checked
  );

  const toggleDropdown = (sectionId) => {
    setDropdownVisible((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handleConfirmClick = () => {
    setShowConfirmModal(true);
  };

  const handleModalConfirm = () => {
    setShowConfirmModal(false);
    setShowSuccessModal(true);
  };

  const handleModalCancel = () => {
    setShowConfirmModal(false);
  };

  const handleSuccessOk = () => {
    setShowSuccessModal(false);
  };

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
                    <div
                      className="dot"
                      onClick={() => toggleDropdown(section.id)}
                    >
                      <img src="../../dot.png" />
                      {/* Dropdown menu */}
                      {dropdownVisible[section.id] && (
                        <div className="dropdown-menu" ref={dropdownRef}>
                          <button
                            onClick={() => {
                              handleDelete(section.id);
                              setDropdownVisible({});
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
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
        <button disabled={!isAnyCheckboxSelected} onClick={handleConfirmClick}>
          Confirm
        </button>
      </div>
      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal">
          <p>Are you sure you want to confirm the selected fields?</p>
          <div className="modal-button">
            <button onClick={handleModalConfirm}>Confirm</button>
            <button onClick={handleModalCancel}>Cancel</button>
          </div>
        </div>
      )}
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal">
          <p>Fields confirmed and processed successfully!</p>
          <button onClick={handleSuccessOk}>OK</button>
        </div>
      )}
    </>
  );
}

export default RightSidebar;
