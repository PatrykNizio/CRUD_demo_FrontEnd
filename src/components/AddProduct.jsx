import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import './universal.css';

const AddProduct = () => {
    const [companies, setCompanies] = useState([]);
    const [productName, setProductName] = useState('');
    const [bidAmount, setBidAmount] = useState('');
    const [status, setStatus] = useState(true);
    const [companyId, setCompanyId] = useState('');
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const navigate = useNavigate();

    const keywords = [
        "innovation",
        "technology",
        "gadget",
        "profesional",
        "ecology",
        "design",
        "modernity",
        "intelligent"
    ];

    const keywordOptions = keywords.map(keyword => ({
        value: keyword,
        label: keyword
    }));

    useEffect(() => {
        axios.get('https://152.70.28.100:8080/api/companies')
            .then(response => setCompanies(response.data))
            .catch(error => console.error('Get error:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (parseFloat(bidAmount) < 5) {
            alert("Bid amount cannot be less than 5.");
            return;
        }

        const productData = {
            productName,
            keyword: JSON.stringify(selectedKeywords.map(k => k.value)),
            bidAmount: parseFloat(bidAmount),
            status,
            company: {
                companyId: parseInt(companyId),
            }
        };

        axios.post('https://152.70.28.100:8080/api/products', productData)
            .then(() => navigate('/'))
            .catch(error => console.error('Post error:', error));
    };

    return (
        <div className="form-container">
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="productName">Product Name:</label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="keyword">Keywords</label>
                    <Select
                        isMulti
                        id="keyword"
                        options={keywordOptions}
                        value={selectedKeywords}
                        onChange={(selected) => setSelectedKeywords(selected)}
                        className="react-select-container"
                        classNamePrefix="react-select"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="bidAmount">Bid Amount</label>
                    <input
                        type="number"
                        id="bidAmount"
                        min={5}
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value === 'true')}
                        className="styled-select"
                    >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="companyId">Campaign</label>
                    <select
                        id="companyId"
                        value={companyId}
                        onChange={(e) => setCompanyId(e.target.value)}
                        required
                        className="styled-select"
                    >
                        <option value="">Select campaign</option>
                        {companies.map((company) => (
                            <option key={company.companyId} value={company.companyId}>
                                {company.companyName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-btn">Add Product</button>
                    <button type="button" className="back-btn" onClick={() => navigate('/')}>Back to Dashboard</button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
