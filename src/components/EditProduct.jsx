import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select'; 
import './universal.css';  // Zaimportowanie globalnych styli

const EditProduct = () => {
    const { productId } = useParams();  
    const [productData, setProductData] = useState(null);
    const [productName, setProductName] = useState('');
    const [bidAmount, setBidAmount] = useState('');
    const [status, setStatus] = useState(true);
    const [companyId, setCompanyId] = useState('');
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const [companies, setCompanies] = useState([]);
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

    const keywordOptions = keywords.map(keyword => ({ value: keyword, label: keyword }));

    useEffect(() => {
        axios.get('http://localhost:8080/api/companies')
            .then(response => {
                setCompanies(response.data);
            })
            .catch(error => {
                console.error('GET error:', error);
            });
    }, []);

    useEffect(() => {
        if (productId) {
            axios.get(`http://localhost:8080/api/products/${productId}`)
                .then(response => {
                    setProductData(response.data);
                    setProductName(response.data.productName);
                    setBidAmount(response.data.bidAmount);
                    setStatus(response.data.status);
                    setCompanyId(response.data.company.companyId);
                    setSelectedKeywords(JSON.parse(response.data.keyword));
                })
                .catch(error => {
                    console.warn('Parsing unresolved');
                });
        } else {
            console.error('ID error');
        }
    }, [productId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const productData = {
            productName,
            keyword: JSON.stringify(selectedKeywords.map(keyword => keyword.value)), 
            bidAmount: parseFloat(bidAmount),
            status,
            company: {
                companyId: parseInt(companyId),
            }
        };

        if (productId) {
            axios.put(`http://localhost:8080/api/products/${productId}`, productData)
                .then(response => {
                    console.log('PUT succeeded:', response.data);
                    navigate('/'); 
                })
                .catch(error => {
                    console.error('PUT error:', error);
                });
        }
    };

    if (!productData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="form-container">
            <h1>Edit Product</h1>
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
                        onChange={(selectedOptions) => setSelectedKeywords(selectedOptions)}  
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
                        className="styled-select"
                        required
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
                    <button type="submit" className="submit-btn">Update Product</button>
                    <button type="button" className="back-btn" onClick={() => navigate('/')}>Back to Dashboard</button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;
