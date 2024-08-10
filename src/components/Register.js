import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './Register.css'; // Import the CSS file

const supabase = createClient('https://pzkdbludanipokuucwtj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6a2RibHVkYW5pcG9rdXVjd3RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI3ODAwNTcsImV4cCI6MjAzODM1NjA1N30.QbVYgsi8nh9519HGup_53-sz3LpgplH29qh8Kh4nFys');

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    date_of_birth: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
    gov_id_number: '',
    eth_address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('BRC KYC').insert([formData]);
    if (error) {
      alert("Error submitting form: " + error.message);
    } else {
      console.log(data);
      alert("Registration submitted successfully! You can now log in with Metamask");
      window.location = "/app";
    }
  };

  return (
    <div className="form-container">
      <h2>Partner Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="full_name">Full Name:</label>
        <input type="text" id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} required />

        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} required />

        <input type="hidden" id="date_of_birth" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} />

        <label htmlFor="address">Address:</label>
        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />

        <label htmlFor="city">City:</label>
        <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} />

        <label htmlFor="state">State:</label>
        <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} />

        <label htmlFor="zip_code">Zip Code:</label>
        <input type="text" id="zip_code" name="zip_code" value={formData.zip_code} onChange={handleChange} />

        <label htmlFor="country">Country:</label>
        <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} required />

        <input type="hidden" id="gov_id_number" name="gov_id_number" value={formData.gov_id_number} onChange={handleChange} />

        <label htmlFor="eth_address">Eth Address:</label>
        <input type="text" id="eth_address" name="eth_address" value={formData.eth_address} onChange={handleChange} placeholder="0x..." required />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
