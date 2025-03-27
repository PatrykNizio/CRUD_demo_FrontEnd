import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/companies')
            .then(response => {
                setCompanies(response.data);
            })
            .catch(error => {
                console.error('Get error:', error);
            });
    }, []);

    const handleDeleteCompany = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to remove this Campaign?');
        if (confirmDelete) {
            axios.delete(`http://localhost:8080/api/companies/${id}`)
                .then(response => {
                    setCompanies(companies.filter(company => company.companyId !== id));
                })
                .catch(error => {
                    console.error('Delate error:', error);
                });
        }
    };

    // Usuwanie produktu
    const handleDeleteProduct = (companyId, productId) => {
        const confirmDelete = window.confirm('Are you sure you want to remove this product?');
        if (confirmDelete) {
            axios.delete(`http://localhost:8080/api/companies/${companyId}/products/${productId}`)
                .then(response => {
                    setCompanies(companies.map(company => {
                        if (company.companyId === companyId) {
                            return {
                                ...company,
                                products: company.products.filter(product => product.productId !== productId)
                            };
                        }
                        return company;
                    }));
                })
                .catch(error => {
                    console.error('Delate error:', error);
                });
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Campaign name</th>
                        <th>Campaign fund</th>
                        <th>Town</th>
                        <th>Radius</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map(company => (
                        <tr key={company.companyId}>
                            <td>{company.companyName}</td>
                            <td>{company.companyFound}</td>
                            <td>{company.town}</td>
                            <td>{company.radius}</td>
                            <td>
                                <Link to={`/edit/${company.companyId}`}>
                                    <button>Edit campaign</button>
                                </Link>
                                <button onClick={() => handleDeleteCompany(company.companyId)} style={{ backgroundColor: 'red', color: 'white' }}>
                                    Delate campaign
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <div>
                {companies.map(company => (
                    <div key={company.companyId}>
                        <h3>Products for {company.companyName}</h3>
                        {company.products && company.products.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Bid amount</th>
                                        <th>Status</th>
                                        <th>Keywords </th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {company.products.map(product => (
                                        <tr key={product.productId}>
                                            <td>{product.productName}</td>
                                            <td>{product.bidAmount}</td>
                                            <td>{product.status ? 'Active' : 'Inactive'}</td>
                                            <td>
                                                <span>
                                                    {product.keyword ? JSON.parse(product.keyword).join(', ') : 'no key words'}
                                                </span>
                                            </td>
                                            <td>
                                                <Link to={`/edit-product/${product.productId}`}>
                                                    <button>Edit product</button>
                                                </Link>
                                                <button onClick={() => handleDeleteProduct(company.companyId, product.productId)} style={{ backgroundColor: 'red', color: 'white' }}>
                                                    Delete product
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No products</p>
                        )}
                    </div>
                ))}
            </div>

            <div>
                <Link to="/add-company">
                    <button>Add campaign </button>
                </Link>
                <Link to="/add-product">
                    <button>Add product</button>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
