import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import MonthMultiSelect from "./MonthMultiSelect";

const FilterContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const Label = styled.label`
  font-weight: bold;
  margin-right: 8px;
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 4px;
`;

const MultiSelect = styled.select`
  padding: 8px;
  border-radius: 4px;
  height: 100px;
`;

const Filters = ({
  selectedMonths,
  selectedYear,
  onMonthsChange,
  onYearChange,
}) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = ["2025", "2024", "2023", "2022", "2021"];

  return (
    <FilterContainer>
      <MonthMultiSelect
        months={months}
        selectedMonths={selectedMonths}
        onChange={onMonthsChange}
      />
      <div>
        <Label htmlFor="year">Year:</Label>
        <Select
          id="year"
          value={selectedYear}
          onChange={(e) => onYearChange(e.target.value)}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </div>
    </FilterContainer>
  );
};

Filters.propTypes = {
  selectedMonths: PropTypes.array.isRequired,
  selectedYear: PropTypes.string.isRequired,
  onMonthsChange: PropTypes.func.isRequired,
  onYearChange: PropTypes.func.isRequired,
};

export default Filters;
