import React, { useState, useEffect } from 'react';
import "./MediaPage.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { API_HOST } from './config';

const itemsPerPage = 5;

function MediaPage() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('movies');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchMedia = async () => {
        setLoading(true);
        setError('');
        try {
            const endpoint = activeTab === 'movies' ? '/movies' : '/series';
            const response = await fetch(`${API_HOST}${endpoint}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setMedia(data.data);
            } else {
                setError(`Failed to fetch ${activeTab}`);
            }
        } catch (error) {
            setError(`Error fetching ${activeTab}: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedia();
    }, [activeTab]);

    const filteredMedia = media.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const currentMedia = filteredMedia.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredMedia.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderPagination = () => {
        const maxVisibleButtons = 5; // Limit visible buttons
        const half = Math.floor(maxVisibleButtons / 2);
        let start = Math.max(1, currentPage - half);
        let end = Math.min(totalPages, currentPage + half);

        if (currentPage <= half) {
            end = Math.min(totalPages, maxVisibleButtons);
        } else if (currentPage + half >= totalPages) {
            start = Math.max(1, totalPages - maxVisibleButtons + 1);
        }

        const buttons = [];
        for (let i = start; i <= end; i++) {
            buttons.push(
                <button
                    key={i}
                    className={currentPage === i ? 'active' : ''}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        return (
            <>
                {currentPage > 1 && (
                    <button onClick={() => handlePageChange(currentPage - 1)}>
                        Previous
                    </button>
                )}
                {start > 1 && <span>...</span>}
                {buttons}
                {end < totalPages && <span>...</span>}
                {currentPage < totalPages && (
                    <button onClick={() => handlePageChange(currentPage + 1)}>
                        Next
                    </button>
                )}
            </>
        );
    };

    return (
        <div className="body">
            <div className="navButton" onClick={() => navigate("/actionSelect")}>
                &lt; Go to Management Page
            </div>

            <div className="addMediaButton">
                <button onClick={() => navigate('/addMedia')}>Add New Media</button>
            </div>

            <input
                type="text"
                placeholder="Search..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="tabs">
                <button
                    className={activeTab === 'movies' ? 'active' : ''}
                    onClick={() => {
                        setActiveTab('movies');
                        setCurrentPage(1);
                    }}
                >
                    Movies
                </button>
                <button
                    className={activeTab === 'series' ? 'active' : ''}
                    onClick={() => {
                        setActiveTab('series');
                        setCurrentPage(1);
                    }}
                >
                    Shows
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <div className={activeTab === 'movies' ? "movieList" : "seriesList"}>
                    <h1>{activeTab === 'movies' ? 'Films' : 'Shows'}</h1>
                    <ul>
                        {currentMedia.map((item) => (
                            <li key={item.id}>
                                <Link className='linkStyle' to={`/media/${activeTab === 'movies' ? 'movie' : 'show'}/${item.id}`}>
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                        {currentMedia.length === 0 && <p>No {activeTab === 'movies' ? 'movies' : 'shows'} found</p>}
                    </ul>
                    <div className="pagination">{renderPagination()}</div>
                </div>
            )}
        </div>
    );
}

export default MediaPage;
