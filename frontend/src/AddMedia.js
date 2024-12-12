import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddMedia.css';

function AddMedia() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        type: 'movie', 
        title: '',
        genres: '',
        director: '',
        duration: '',
        description: '',
        episodes: [],
        languages: [],
        subtitles: [],
    });

    const [newEpisodeTitle, setNewEpisodeTitle] = useState('');
    const [newLanguage, setNewLanguage] = useState('');
    const [newSubtitle, setNewSubtitle] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddEpisode = () => {
        if (newEpisodeTitle.trim()) {
            setFormData({
                ...formData,
                episodes: [...formData.episodes, newEpisodeTitle],
            });
            setNewEpisodeTitle('');
        }
    };

    const handleAddLanguage = () => {
        if (newLanguage && !formData.languages.includes(newLanguage)) {
            setFormData({ ...formData, languages: [...formData.languages, newLanguage] });
            setNewLanguage('');
        }
    };

    const handleAddSubtitle = () => {
        if (newSubtitle && !formData.subtitles.includes(newSubtitle)) {
            setFormData({ ...formData, subtitles: [...formData.subtitles, newSubtitle] });
            setNewSubtitle('');
        }
    };

    const handleEpisodeChange = (index, newValue) => {
        const updatedEpisodes = [...formData.episodes];
        updatedEpisodes[index] = newValue;
        setFormData({ ...formData, episodes: updatedEpisodes });
    };

    const handleDeleteEpisode = (index) => {
        const updatedEpisodes = formData.episodes.filter((_, i) => i !== index);
        setFormData({ ...formData, episodes: updatedEpisodes });
    };

    const handleSave = () => {
        console.log('Saved Media:', formData);
        navigate('/mediaPage'); // Redirect back to MediaPage
    };

    return (
        <div className="addMediaBody">
            <div className="navNewMediaButton" onClick={() => navigate('/mediaPage')}>
                &lt; Go to Media Page
            </div>
            <h1>Add New Media</h1>
            <form>
                <label>
                    Type:
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    >
                        <option value="movie">Movie</option>
                        <option value="show">Show</option>
                    </select>
                </label>

                <label>
                    Title:
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Genres:
                    <input
                        name="genres"
                        value={formData.genres}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Director:
                    <input
                        name="director"
                        value={formData.director}
                        onChange={handleChange}
                    />
                </label>

                {formData.type === 'movie' && (
                    <label>
                        Duration:
                        <input
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                        />
                    </label>
                )}

                {formData.type === 'show' && (
                    <div>
                        <label>Episode List:</label>
                        <ul>
                            {formData.episodes.map((episode, index) => (
                                <li
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: '10px',
                                    }}
                                >
                                    <input
                                        type="text"
                                        value={episode}
                                        onChange={(e) =>
                                            handleEpisodeChange(index, e.target.value)
                                        }
                                        style={{ marginRight: '10px', flexGrow: 1 }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteEpisode(index)}
                                        style={{ color: 'red' }}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <input
                            type="text"
                            placeholder="New Episode Title"
                            value={newEpisodeTitle}
                            onChange={(e) => setNewEpisodeTitle(e.target.value)}
                            style={{ marginRight: '10px' }}
                        />
                        <button type="button" onClick={handleAddEpisode}>
                            Add Episode
                        </button>
                    </div>
                )}

                <div>
                    <label>Languages:</label>
                    <input
                        type="text"
                        value={newLanguage}
                        onChange={(e) => setNewLanguage(e.target.value)}
                    />
                    <button type="button" onClick={handleAddLanguage}>
                        Add Language
                    </button>
                    <ul>
                        {formData.languages.map((lang, idx) => (
                            <li key={idx}>{lang}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <label>Subtitles:</label>
                    <input
                        type="text"
                        value={newSubtitle}
                        onChange={(e) => setNewSubtitle(e.target.value)}
                    />
                    <button type="button" onClick={handleAddSubtitle}>
                        Add Subtitle
                    </button>
                    <ul>
                        {formData.subtitles.map((sub, idx) => (
                            <li key={idx}>{sub}</li>
                        ))}
                    </ul>
                </div>

                <label>
                    Description:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </label>
            </form>

            <div className="handleButtons">
                <button onClick={() => navigate('/mediaPage')}>Cancel</button>
                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    );
}

export default AddMedia;
