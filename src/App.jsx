import React, { useEffect, useState } from "react";
import { fetchCustomerData } from "./api/fetchCustomerData";
import styled from "styled-components";
import { getRecentThreeMonths } from "./utils/dateUtils";
import Filters from "./components/filter/Filters";
import CustomerTable from "./components/CustomerTable";
import MonthlyRewardsTable from "./components/MonthlyRewardsTable";
import TransactionTable from "./components/TransactionTable";
import dayjs from "dayjs";

const AppContainer = styled.div`
  padding: 20px;
`;
const DashboardWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
  flex-wrap: nowrap;
  overflow-x: auto;
`;

const TableContainer = styled.div`
  flex: 1;
  min-width: 300px;
`;


function App() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const [selectedCustomer, setSelectedCustomer] = useState(null);
const [selectedMonths, setSelectedMonths] = useState(getRecentThreeMonths());
const [selectedYear, setSelectedYear] = useState(dayjs().format("YYYY"));
const [activeMonthForTransactions, setActiveMonthForTransactions] =
  useState(null);

  useEffect(() => {
    fetchCustomerData()
      .then((data) => {
        setCustomers(data);
        setSelectedCustomer(data[0]); 
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading customers...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <AppContainer>
      <h1>Customer Rewards Dashboard</h1>
      <Filters
        selectedMonths={selectedMonths}
        onMonthsChange={setSelectedMonths}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
      />
      <DashboardWrapper>
        <TableContainer>
          <CustomerTable
            customers={customers}
            selectedCustomerId={selectedCustomer?.id}
            onSelectCustomer={setSelectedCustomer}
          />
        </TableContainer>
        {selectedCustomer && (
          <>
            <TableContainer>
              <MonthlyRewardsTable
                transactions={selectedCustomer.transactions}
                selectedMonths={selectedMonths}
                selectedYear={selectedYear}
                onMonthClick={(month) => setActiveMonthForTransactions(month)}
                activeMonth={activeMonthForTransactions}
              />
            </TableContainer>
            <TableContainer>
              <TransactionTable
                transactions={selectedCustomer?.transactions}
                selectedMonth={activeMonthForTransactions}
                selectedYear={selectedYear}
              />
            </TableContainer>
          </>
        )}
      </DashboardWrapper>
    </AppContainer>
  );
}

export default App;
