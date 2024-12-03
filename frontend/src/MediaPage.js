import React from 'react';
import "./MediaPage.css";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const movies = [
  { id: 1, title: 'Inception' },
  { id: 2, title: 'The Matrix' },
  { id: 3, title: 'Interstellar' },
  { id: 4, title: 'The Barbie Movie' },
  { id: 5, title: 'The Sixth Sense' },
  { id: 6, title: 'Knives Out' },
  { id: 7, title: "Emperor's New Groove" },
];

const series = [
  { id: 1, title: 'The Office' },
  { id: 2, title: 'House MD' },
  { id: 3, title: 'Gravity Falls' },
];

const itemsPerPage = 5;

function MediaPage() {
    const navigate = useNavigate(); 

    const [activeTab, setActiveTab] = useState('movies');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
     );
    const filteredSeries = series.filter((show) =>
        show.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const currentMovies = filteredMovies.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const currentSeries = filteredSeries.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPagesMovies = Math.ceil(filteredMovies.length / itemsPerPage);
    const totalPagesSeries = Math.ceil(filteredSeries.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="body">
            <div className="navButton" onClick={() => navigate("/actionSelect")}>
                &lt; Go to Management Page
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
                onClick={() => setActiveTab('movies')}
                >
                    Movies
                </button>
                <button
                className={activeTab === 'series' ? 'active' : ''}
                onClick={() => setActiveTab('series')}
                >
                    Shows
                </button>
            </div>

            {activeTab === 'movies' && (
                <div className="movieList">
                    <h1>Films</h1>
                    <ul>
                        {currentMovies.map((movie) => (
                            <li key={movie.id}>
                                <Link className='linkStyle' to={`/media/movie/${movie.id}`}>{movie.title}</Link>
                            </li>
                        ))}
                        {currentMovies.length === 0 && <p>No movies found</p>}
                    </ul>
                    <div className="pagination">
                        {Array.from({ length: totalPagesMovies }).map((_, index) => (
                            <button
                            key={index}
                            className={currentPage === index + 1 ? 'active' : ''}
                            onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'series' && (
                <div className="seriesList">
                    <h1>Shows</h1>
                    <ul>
                        {currentSeries.map((show) => (
                            <li key={show.id}>
                                <Link className='linkStyle' to={`/media/show/${show.id}`}>{show.title}</Link>
                            </li>
                        ))}
                        {currentSeries.length === 0 && <p>No shows found</p>}
                    </ul>
                    <div className="pagination">
                        {Array.from({ length: totalPagesSeries }).map((_, index) => (
                            <button
                            key={index}
                            className={currentPage === index + 1 ? 'active' : ''}
                            onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MediaPage;