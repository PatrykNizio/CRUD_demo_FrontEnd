import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import './universal.css';

const EditCompany = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState({
        companyName: '',
        companyFound: '',
        town: '',
        radius: '',
    });

    useEffect(() => {
        axiosInstance.get(`/api/companies/${id}`)
            .then(response => {
                setCompany(response.data);
            })
            .catch(error => {
                console.error('GET error:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompany({
            ...company,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axiosInstance.put(`/api/companies/${id}`, company)
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.error('PUT error:', error);
            });
    };

    return (
        <div className="form-container">
            <h1 className="form-title">Edit Campaign</h1>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="companyName">Campaign Name</label>
                    <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={company.companyName}
                        onChange={handleChange}
                        placeholder="Enter campaign name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="companyFound">Campaign Fund</label>
                    <input
                        type="number"
                        id="companyFound"
                        name="companyFound"
                        value={company.companyFound}
                        onChange={handleChange}
                        placeholder="Enter campaign fund"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="town">Town</label>
                    <input
                        type="text"
                        id="town"
                        name="town"
                        value={company.town}
                        onChange={handleChange}
                        placeholder="Enter town name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="radius">Radius</label>
                    <input
                        type="number"
                        id="radius"
                        name="radius"
                        value={company.radius}
                        onChange={handleChange}
                        placeholder="Enter radius"
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="submit-btn">Update Campaign</button>
                    <button type="button" className="back-btn" onClick={() => navigate('/')}>Back to Dashboard</button>
                </div>
            </form>
        </div>
    );
};

export default EditCompany;
