import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./MediaDetailsPage.css";

const movieDetails = {
  1: { title: 'Inception', genres: 'Sci-Fi', director: 'Christopher Nolan', duration: '2h 28m', languages: ['English'], subtitles: ['English', 'Spanish'], description: 'A mind-bending thriller.' },
  2: { title: 'The Matrix', genres: 'Action', director: 'Wachowskis', duration: '2h 16m', languages: ['English'], subtitles: ['English', 'Spanish'], description: 'A virtual reality epic.' },
};

const showDetails = {
  1: { title: 'The Office', genres: 'Comedy', director: 'Greg Daniels', episodes: ['Pilot', 'Diversity Day', 'Health Care'], languages: ['English'], subtitles: ['English'], description: 'A mockumentary sitcom.' },
  3: { title: 'Gravity Falls', genres: 'Mystery', director: 'Alex Hirsch', episodes: ['Tourist Trapped', 'The Legend of the Gobblewonker'], languages: ['English'], subtitles: ['English', 'French'], description: 'A mystery-filled animated series.' },
};

function MediaDetailsPage() {
    const { type, id } = useParams(); 
    const navigate = useNavigate();

    const [media, setMedia] = useState(null); 
    const [formData, setFormData] = useState(null); 
    const [selectedEpisode, setSelectedEpisode] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [newLanguageInput, setNewLanguageInput] = useState(''); 
    const [selectedSubtitle, setSelectedSubtitle] = useState('');
    const [newSubtitleInput, setNewSubtitleInput] = useState('');

    useEffect(() => {
        let fetchedData = null;
      
        if (type === 'movie') {
            fetchedData = movieDetails[id];
        } else if (type === 'show') {
            fetchedData = showDetails[id];
        }
      
        if (fetchedData) {
            const languages = Array.isArray(fetchedData.languages)
            ? fetchedData.languages
            : fetchedData.languages.split(', ').map(lang => lang.trim());

            const subtitles = Array.isArray(fetchedData.subtitles)
            ? fetchedData.subtitles
            : fetchedData.subtitles.split(', ').map(sub => sub.trim());
      
            setMedia(fetchedData);
            setFormData({
                ...fetchedData,
                languages: languages, 
                subtitles: subtitles, 
            });
        } else {
            setMedia(null);
        }
    }, [type, id]);

    if (!media) {
        return <p>Media not found!</p>;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEpisodeChange = (index, newValue) => {
        const updatedEpisodes = [...formData.episodes];
        updatedEpisodes[index] = newValue;
        setFormData({ ...formData, episodes: updatedEpisodes });
    };

    const handleAddEpisode = () => {
        const newEpisodeName = `Episode ${formData.episodes.length + 1}`;
        const updatedEpisodes = [...formData.episodes, newEpisodeName];
        setFormData({ ...formData, episodes: updatedEpisodes });
        setSelectedEpisode(newEpisodeName); 
    };

    const handleAddLanguage = () => {
        if (newLanguageInput && !formData.languages.includes(newLanguageInput)) {
            const updatedLanguages = [...formData.languages, newLanguageInput];
            setFormData({
                ...formData,
                languages: updatedLanguages, 
            });
            setSelectedLanguage(newLanguageInput); 
            setNewLanguageInput(''); 
        }
    };
      
    const handleLanguageChange = (newValue) => {
        const updatedLanguages = formData.languages.map((lang) =>
            lang === selectedLanguage ? newValue : lang
        );
        setFormData({
            ...formData,
            languages: updatedLanguages,
        });
    };
      
    const handleDeleteLanguage = (languageToDelete) => {
        const updatedLanguages = formData.languages.filter(language => language !== languageToDelete);
        setFormData({
            ...formData,
            languages: updatedLanguages, 
        });
        setSelectedLanguage(updatedLanguages.length > 0 ? updatedLanguages[0] : '');
    };

    const handleAddSubtitle = () => {
        if (newSubtitleInput && !formData.subtitles.includes(newSubtitleInput)) {
            const updatedSubtitles = [...formData.subtitles, newSubtitleInput];
            setFormData({
                ...formData,
                subtitles: updatedSubtitles, 
            });
            setSelectedSubtitle(newSubtitleInput); 
            setNewSubtitleInput(''); 
        }
    };

    const handleDeleteSubtitle = (subtitleToDelete) => {
        const updatedSubtitles = formData.subtitles.filter(subtitle => subtitle !== subtitleToDelete);
        setFormData({
            ...formData,
            subtitles: updatedSubtitles, 
        });
        setSelectedSubtitle(updatedSubtitles.length > 0 ? updatedSubtitles[0] : '');
    };


    // PUT HANDLING OF SAVED CHANGES HERE
    const handleSave = () => {
        console.log('Saved:', formData);
        navigate(-1); 
    };

    const handleCancel = () => {
        navigate(-1); 
    };

    // PUT HANDLING OF DELETED DATA HERE
    const handleDelete = () => {
        console.log(`Deleted ${type} with ID: ${id}`);
        navigate(-1); 
    };

    return (
        <div className='mediaBody'>
            <div className="navMediaButton" onClick={() => navigate("/mediaPage")}>
                &lt; Go to Media Page
            </div>
            <h1>{type === 'movie' ? 'Edit Movie' : 'Edit Show'}</h1>
            <form>
                <label>
                    Title:
                    <input
                        name="title"
                        value={formData.title || ''}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Genres:
                    <input
                        name="genres"
                        value={formData.genres || ''}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Director:
                    <input
                        name="director"
                        value={formData.director || ''}
                        onChange={handleChange}
                    />
                </label>

                {type === 'movie' && (
                    <label>
                        Duration:
                        <input
                            name="duration"
                            value={formData.duration || ''}
                            onChange={handleChange}
                        />
                    </label>
                )}

                {type === 'show' && (
                    <div>
                        <label>Episode List:</label>
                        <select
                            value={selectedEpisode}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === 'new') {
                                    handleAddEpisode(); // Adds new episode
                                } else {
                                    setSelectedEpisode(value); // Selects existing episode for editing
                                }
                            }}
                        >
                            <option value="" disabled>
                                Select an episode
                            </option>
                            {formData.episodes.map((episode, index) => (
                                <option key={index} value={episode}>
                                    {episode}
                                </option>
                            ))}
                            <option value="new">Add New Episode</option>
                        </select>

    
                        {selectedEpisode && selectedEpisode !== 'new' && (
                            <div className="editSection">
                                <label>Edit Episode:</label>
                                <input
                                    type="text"
                                    value={selectedEpisode}
                                    onChange={(e) => {
                                        const newValue = e.target.value;
                                        const index = formData.episodes.indexOf(selectedEpisode);
                                        if (index !== -1) {
                                            handleEpisodeChange(index, newValue);
                                            setSelectedEpisode(newValue);
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const index = formData.episodes.indexOf(selectedEpisode);
                                        if (index !== -1) {
                                            const updatedEpisodes = formData.episodes.filter((_, i) => i !== index);
                                            setFormData({ ...formData, episodes: updatedEpisodes });
                                            setSelectedEpisode('');
                                        }
                                    }}
                                    style={{ marginLeft: '10px', color: 'red' }}
                                >
                                    Delete Episode
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <div>
                    <label>
                        Languages:
                    </label>
                    <select
                        value={selectedLanguage}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value === 'new') {
                                handleAddLanguage(); 
                            } else {
                                setSelectedLanguage(value); 
                            }
                        }}
                    >
                        <option value="" disabled>Select a language</option>
                        {formData.languages.map((language, index) => (
                            <option key={index} value={language}>
                                {language}
                            </option>
                        ))}
                    </select>

                    {selectedLanguage && selectedLanguage !== 'new' && (
                        <div className="editSection">
                            <label>Edit Language:</label>
                            <input
                                type="text"
                                value={selectedLanguage}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    handleLanguageChange(newValue);
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => handleDeleteLanguage(selectedLanguage)}
                                style={{ marginLeft: '10px', color: 'red' }}
                            >
                                Delete Language
                            </button>
                        </div>
                    )}

                    <label>
                        Add New Language:
                        <input
                            type="text"
                            value={newLanguageInput}
                            onChange={(e) => setNewLanguageInput(e.target.value)}
                        />
                        <button type="button" onClick={handleAddLanguage}>
                            Add Language
                        </button>
                    </label>
                </div>

                <div>
                    <label>
                        Subtitles:
                    </label>
                    <select
                        value={selectedSubtitle}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value === 'new') {
                                handleAddSubtitle(); 
                            } else {
                                setSelectedSubtitle(value); 
                            }
                        }}
                    >
                        <option value="" disabled>Select a subtitle</option>
                        {formData.subtitles.map((subtitle, index) => (
                            <option key={index} value={subtitle}>
                                {subtitle}
                            </option>
                        ))}
                    </select>

                    {selectedSubtitle && selectedSubtitle !== 'new' && (
                        <div className="editSection">
                            <label>Edit Subtitle:</label>
                            <input
                                type="text"
                                value={selectedSubtitle}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    handleLanguageChange(newValue); 
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => handleDeleteSubtitle(selectedSubtitle)}
                                style={{ marginLeft: '10px', color: 'red' }}
                            >
                                Delete Subtitle
                            </button>
                        </div>
                    )}

                    <label>
                        Add New Subtitle:
                        <input
                            type="text"
                            value={newSubtitleInput}
                            onChange={(e) => setNewSubtitleInput(e.target.value)}
                        />
                        <button type="button" onClick={handleAddSubtitle}>
                            Add Subtitle
                        </button>
                    </label>
                </div>

                <label>
                    Description:
                    <textarea
                        name="description"
                        value={formData.description || ''}
                        onChange={handleChange}
                    />
                </label>
            </form>

            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSave}>Save Changes</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default MediaDetailsPage;
