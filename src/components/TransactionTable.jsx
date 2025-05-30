import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TableWrapper = styled.div`
  margin-top: 20px;
  max-height: 500px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #f0f0f0;
  padding: 10px;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #eee;
`;

const Pagination = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 6px 12px;
  border: none;
  background: #0077cc;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
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

const ITEMS_PER_PAGE = 5;

const TransactionTable = ({ transactions, selectedMonth, selectedYear }) => {
  const [page, setPage] = useState(1);

  const filteredTransactions = transactions.filter((txn) => {
    const txnDate = new Date(txn.date);
    const txnMonth = txnDate.toLocaleString("default", { month: "long" });
    const txnYear = txnDate.getFullYear().toString();
    return txnMonth === selectedMonth && txnYear === selectedYear;
  });

  filteredTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginated = filteredTransactions.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <TableWrapper>
      <Table>
        <thead>
          <tr>
            <Th>Transaction ID</Th>
            <Th>Date</Th>
            <Th>Amount</Th>
            <Th>Reward Points</Th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((txn) => (
            <tr key={txn.id}>
              <Td>{txn.id}</Td>
              <Td>{new Date(txn.date).toLocaleDateString()}</Td>
              <Td>${txn.amount.toFixed(2)}</Td>
              <Td>{calculateRewardPoints(txn.amount)}</Td>
            </tr>
          ))}
          {paginated.length === 0 && (
            <tr>
              <Td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                No transactions for selected filters.
              </Td>
            </tr>
          )}
        </tbody>
      </Table>

      {totalPages > 1 && (
        <Pagination>
          <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Previous
          </Button>
          <span>
            Page {page} of {totalPages}
          </span>
          <Button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </Pagination>
      )}
    </TableWrapper>
  );
};

TransactionTable.propTypes = {
  transactions: PropTypes.array.isRequired,
  selectedMonths: PropTypes.array.isRequired,
  selectedYear: PropTypes.string.isRequired,
};

export default TransactionTable;
