import React, { useState, useEffect } from 'react';
import CustomerForm from './CustomerForm';
import CustomerDetail from './CustomerDetail';

const BASE_URL = 'https://rmlm8rxgvg.execute-api.us-east-1.amazonaws.com/prod';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showAddCustomerForm, setShowAddCustomerForm] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/customers`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/customers/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchCustomers();
    } catch (error) {
      console.error('Failed to delete customer:', error);
    }
  };

  const selectCustomer = (customer) => {
    setSelectedCustomer(customer);
  };

  const clearSelectedCustomer = () => {
    setSelectedCustomer(null);
  };

  const toggleAddCustomerForm = () => {
    setShowAddCustomerForm(true);
  };

  const handleCustomerAdded = () => {
    setShowAddCustomerForm(false);
    fetchCustomers();
  };

  return (
    <div>
      <h1 style={{ marginLeft: '40px' }}>Customer List</h1>
      <ul>
        {customers.map((customer) => (
          <li key={customer.customerId} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
            {customer.name} - {customer.email}
            </div>
            <button onClick={() => selectCustomer(customer)} style={{ marginLeft: '10px', marginRight: '10px' }}>Edit</button>
            <button onClick={() => deleteCustomer(customer.customerId)} style={{ marginRight: '600px' }}>Delete</button>
          </li>
        ))}
      </ul>
      {!showAddCustomerForm && (
        <button onClick={toggleAddCustomerForm} style={{ marginBottom: '20px', marginLeft: '40px' }}>
          Add a new Customer
        </button>
      )}
      {showAddCustomerForm && <CustomerForm fetchCustomers={handleCustomerAdded} />}
      {selectedCustomer && (
        <CustomerDetail
          selectedCustomer={selectedCustomer}
          clearSelectedCustomer={clearSelectedCustomer}
          fetchCustomers={fetchCustomers}
        />
      )}
    </div>
  );
};

export default CustomerList;