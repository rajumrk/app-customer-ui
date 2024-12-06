import React, { useState } from 'react';

const BASE_URL = 'https://rmlm8rxgvg.execute-api.us-east-1.amazonaws.com/prod'; // Replace with your remote URL

const CustomerForm = ({ fetchCustomers }) => {
  const [customerId, setCustomerId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${BASE_URL}/customers/${customerId}`;
    console.log('Making POST request to:', url);
    console.log('Request body:', { customerId, name, email });
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId, name, email })
      });
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setCustomerId('');
      setName('');
      setEmail('');
      fetchCustomers();
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '10px', marginLeft: '30px' }}>
        <input
          type="text"
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '10px', marginLeft: '30px' }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '10px', marginLeft: '30px' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '10px', marginLeft: '30px' }}>
        <button type="submit">Add Customer</button>
      </div>
    </form>
  );
};

export default CustomerForm;