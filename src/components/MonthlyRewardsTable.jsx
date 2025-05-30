import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TableWrapper = styled.div`
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow-x: auto;
  max-height: 500px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #f0f0f0;
  padding: 10px;
  text-align: left;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #eee;
`;

const calculateRewardPoints = (amount) => {
  let points = 0;
  if (amount > 100) {
    points += (amount - 100) * 2 + 50;
  } else if (amount > 50) {
    points += (amount - 50) * 1;
  }
  return Math.floor(points);
};

const getMonthlyRewards = (transactions, selectedMonths, selectedYear) => {
  const rewards = {};
  transactions.forEach((txn) => {
    const txnDate = new Date(txn.date);
    const month = txnDate.toLocaleString("default", { month: "long" });
    const year = txnDate.getFullYear().toString();

    if (selectedMonths.includes(month) && year === selectedYear) {
      const reward = calculateRewardPoints(txn.amount);
      if (!rewards[month]) rewards[month] = 0;
      rewards[month] += reward;
    }
  });

  return rewards;
};

const MONTH_ORDER = [
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

const MonthlyRewardsTable = ({
  transactions,
  selectedMonths,
  selectedYear,
  onMonthClick,
  activeMonth,
}) => {
  const monthlyRewards = getMonthlyRewards(
    transactions,
    selectedMonths,
    selectedYear
  );

  // Sort selectedMonths by MONTH_ORDER
  const sortedMonths = [...selectedMonths].sort(
    (a, b) => MONTH_ORDER.indexOf(a) - MONTH_ORDER.indexOf(b)
  );

  const totalRewards = Object.values(monthlyRewards).reduce(
    (acc, val) => acc + val,
    0
  );

  return (
    <TableWrapper>
      <Table>
        <thead>
          <tr>
            <Th>Month</Th>
            <Th>Reward Points</Th>
          </tr>
        </thead>
        <tbody>
          {sortedMonths.map((month) => (
            <tr
              key={month}
              onClick={() => onMonthClick(month)}
              style={{
                cursor: "pointer",
                backgroundColor: activeMonth === month ? "#f0f8ff" : "inherit",
              }}
            >
              <Td>{month}</Td>
              <Td>{monthlyRewards[month] || 0}</Td>
            </tr>
          ))}
          <tr>
            <Td>
              <strong>Total</strong>
            </Td>
            <Td>
              <strong>{totalRewards}</strong>
            </Td>
          </tr>
        </tbody>
      </Table>
    </TableWrapper>
  );
};

MonthlyRewardsTable.propTypes = {
  transactions: PropTypes.array.isRequired,
  selectedMonths: PropTypes.array.isRequired,
  selectedYear: PropTypes.string.isRequired,
  onMonthClick: PropTypes.func.isRequired,
  activeMonth: PropTypes.string,
};

export default MonthlyRewardsTable;
