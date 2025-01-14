import React, { useState, useEffect } from "react";
import "./CheckExchangeRates.css";
import { useNavigate } from 'react-router-dom';

const CheckExchangeRates = () => {
    const [rates, setRates] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const navigate = useNavigate();

    const API_KEY = process.env.REACT_APP_FIXER_API_KEY;
    const BASE_URL = "https://data.fixer.io/api/latest";

    // Function to fetch exchange rates
    useEffect(() => {
        const fetchRates = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${BASE_URL}?access_key=${API_KEY}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch exchange rates");
                }

                const data = await response.json();
                if (data.success) {
                    setRates(data.rates);
                } else {
                    setError(data.error.info);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRates();
    }, []);

    // Pagination Logic: Get the current page's data
    const indexOfLastRate = currentPage * rowsPerPage;
    const indexOfFirstRate = indexOfLastRate - rowsPerPage;
    const currentRates = rates ? Object.entries(rates).slice(indexOfFirstRate, indexOfLastRate) : [];

    const totalPages = rates ? Math.ceil(Object.entries(rates).length / rowsPerPage) : 1;

    // Handle page changes
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (loading) return <div className="loading-message">Loading exchange rates...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <div>
            <div className="navButtonUsers" onClick={() => navigate("/actionSelect")}>
                &lt; Go to Management Page
            </div>
            <h1>Exchange Rates</h1>
            <table>
                <thead>
                <tr>
                    <th>Currency</th>
                    <th>Rate</th>
                </tr>
                </thead>
                <tbody>
                {currentRates.map(([currency, rate]) => (
                    <tr key={currency}>
                        <td>{currency}</td>
                        <td>{rate}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>
          Page {currentPage} of {totalPages}
        </span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default CheckExchangeRates;
