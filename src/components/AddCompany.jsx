import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import './universal.css'; 

const AddCompany = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyFound, setCompanyFound] = useState('');
  const [town, setTown] = useState('');
  const [radius, setRadius] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sprawdzamy, czy radius nie jest mniejszy niż 1
    if (radius < 1) {
      alert("Radius must be at least 1.");
      return;
    }

    const newCompany = {
      companyName,
      companyFound: parseFloat(companyFound),
      town,
      radius: parseInt(radius),
    };

    try {
      const response = await axiosInstance.post('/api/companies', newCompany);
      navigate('/'); 
    } catch (error) {
      console.error('Error adding company:', error);
    }
  };

  return (
    <div className="form-container">
      <h1>Add New Campaign</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="companyName">Campaign Name:</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyFound">Bid Amount:</label>
          <input
            type="number"
            id="companyFound"
            value={companyFound}
            onChange={(e) => setCompanyFound(e.target.value)}
            required
            min="5"  // Minimalna wartość 5 dla bid amount
          />
        </div>
        <div className="form-group">
          <label htmlFor="town">Town:</label>
          <input
            type="text"
            id="town"
            value={town}
            onChange={(e) => setTown(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="radius">Radius:</label>
          <input
            type="number"
            id="radius"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            required
            min="1"  // Minimalna wartość 1 dla radius
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-btn">Add Campaign</button>
          <button type="button" className="back-btn" onClick={() => navigate('/')}>Back to Dashboard</button>
        </div>
      </form>
    </div>
  );
};

export default AddCompany;
