import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  position: relative;
  width: 200px;
`;

const DropdownHeader = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: white;
  border-radius: 4px;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  border: 1px solid #ccc;
  background: white;
  border-radius: 4px;
  list-style: none;
  padding: 10px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
`;

const ListItem = styled.li`
  margin-bottom: 6px;
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-right: 8px;
`;

const MonthMultiSelect = ({ months, selectedMonths, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (month) => {
    const newSelection = selectedMonths?.includes(month)
      ? selectedMonths?.filter((m) => m !== month)
      : selectedMonths ? [...selectedMonths, month] : [month];
    onChange(newSelection);
  };

  const handleClickOutside = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      <DropdownHeader onClick={toggleDropdown}>
        {selectedMonths?.length > 0
          ? selectedMonths?.join(", ")
          : "Select Months"}
      </DropdownHeader>

      {isOpen && (
        <DropdownList>
          {months.map((month) => (
            <ListItem key={month}>
              <Checkbox
                type="checkbox"
                checked={selectedMonths?.includes(month)}
                onChange={() => handleSelect(month)}
              />
              {month}
            </ListItem>
          ))}
        </DropdownList>
      )}
    </Wrapper>
  );
};

MonthMultiSelect.propTypes = {
  months: PropTypes.array.isRequired,
  selectedMonths: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MonthMultiSelect;
