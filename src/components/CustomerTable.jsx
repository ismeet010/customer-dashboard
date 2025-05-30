import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TableWrapper = styled.div`
  width: 100%;
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
`;


const Th = styled.th`
  background-color: #f0f0f0;
  padding: 10px;
  text-align: left;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  &:hover {
    background-color: #fafafa;
  }
`;

const PaginationWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Button = styled.button`
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const CustomerTable = ({ customers, onSelectCustomer, selectedCustomerId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Calculate pagination
  const totalPages = Math.ceil(customers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentCustomers = customers.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const goToPrevious = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const goToNext = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  return (
    <>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>Customer ID</Th>
              <Th>Name</Th>
              <Th>Total Transactions</Th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer) => (
              <tr
                key={customer.id}
                style={{
                  backgroundColor:
                    customer.id === selectedCustomerId
                      ? "#e0f7fa"
                      : "transparent",
                }}
                onClick={() => onSelectCustomer(customer)}
              >
                <Td>{customer.id}</Td>
                <Td>{customer.name}</Td>
                <Td>{customer.transactions.length}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

      <PaginationWrapper>
        <Button onClick={goToPrevious} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button onClick={goToNext} disabled={currentPage === totalPages}>
          Next
        </Button>
      </PaginationWrapper>
    </>
  );
};

CustomerTable.propTypes = {
  customers: PropTypes.array.isRequired,
  onSelectCustomer: PropTypes.func.isRequired,
  selectedCustomerId: PropTypes.string,
};

export default CustomerTable;
