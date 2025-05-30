// fetchCustomerData.js
import customerData from "../data/customerData.json";

export const fetchCustomerData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomFail = Math.random() < 0.05; // simulate 5% error chance
      if (randomFail) {
        reject("Failed to fetch customer data. Please try again.");
      } else {
        resolve(customerData);
      }
    }, 1000); // simulate 1 second delay
  });
};
