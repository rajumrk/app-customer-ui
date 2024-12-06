import React, { useState, useEffect } from 'react';

const BASE_URL = 'https://rmlm8rxgvg.execute-api.us-east-1.amazonaws.com/prod';

const CustomerDetail = ({ selectedCustomer, clearSelectedCustomer, fetchCustomers }) => {
  const [customerId, setCustomerId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (selectedCustomer) {
      console.log('Selected customer:', selectedCustomer);
      setCustomerId(selectedCustomer.customerId || '');
      setName(selectedCustomer.name || '');
      setEmail(selectedCustomer.email || '');
    }
  }, [selectedCustomer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/customers/${customerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId, name, email })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchCustomers();
      clearSelectedCustomer();
    } catch (error) {
      console.error('Failed to update:', error);
    }
  };

  if (!selectedCustomer) {
    return <div>No customer selected</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '20px' }}>
        <div style={{ marginBottom: '10px', marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
          <label style={{ width: '100px' }}>Customer ID:</label>
          <input
            type="text"
            placeholder="Customer ID"
            value={customerId}
            readOnly
            style={{ marginLeft: '20px', width: '120px' }}
          />
        </div>
        <div style={{ marginBottom: '10px', marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
          <label style={{ width: '100px' }}>Name:</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginLeft: '20px', width: '150px' }}
          />
        </div>
        <div style={{ marginBottom: '20px', marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
          <label style={{ width: '100px' }}>Email:</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginLeft: '20px', width: '180px' }}
          />
        </div>
        <div style={{ marginBottom: '20px', marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
          <label style={{ width: '100px' }}></label>
          <button type="submit" style={{ marginLeft: '20px', marginRight: '10px' }}>Update Customer</button>
        </div>
      </form>
    </div>
  );
};

export default CustomerDetail;