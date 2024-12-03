import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const movieDetails = {
  1: { title: 'Inception', genres: 'Sci-Fi', director: 'Christopher Nolan', duration: '2h 28m', languages: 'English', subtitles: 'English, Spanish', description: 'A mind-bending thriller.' },
  2: { title: 'The Matrix', genres: 'Action', director: 'Wachowskis', duration: '2h 16m', languages: 'English', subtitles: 'English, French', description: 'A virtual reality epic.' },
};

const showDetails = {
  1: { title: 'The Office', genres: 'Comedy', director: 'Greg Daniels', episodes: ['Pilot', 'Diversity Day', 'Health Care'], languages: 'English', subtitles: 'English, Spanish', description: 'A mockumentary sitcom.' },
  2: { title: 'Gravity Falls', genres: 'Mystery', director: 'Alex Hirsch', episodes: ['Tourist Trapped', 'The Legend of the Gobblewonker'], languages: 'English', subtitles: 'English', description: 'A mystery-filled animated series.' },
};

function MediaDetailsPage() {
    const { type, id } = useParams(); 
    const navigate = useNavigate();

    const [media, setMedia] = useState(null); 
    const [formData, setFormData] = useState(null); 

    useEffect(() => {
        let fetchedData = null;

        if (type === 'movie') {
            fetchedData = movieDetails[id];
        } else if (type === 'show') {
            fetchedData = showDetails[id];
        }

        if (fetchedData) {
            setMedia(fetchedData);
            setFormData(fetchedData); 
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
        setFormData({ ...formData, episodes: [...formData.episodes, ''] });
    };

    const handleRemoveEpisode = (index) => {
        const updatedEpisodes = formData.episodes.filter((_, i) => i !== index);
        setFormData({ ...formData, episodes: updatedEpisodes });
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
        <div>
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
                            {formData.episodes?.map((episode, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                                    <input
                                        type="text"
                                        value={episode}
                                        onChange={(e) => handleEpisodeChange(index, e.target.value)}
                                    />
                                    <button type="button" onClick={() => handleRemoveEpisode(index)}>
                                        Remove
                                    </button>`
                                </div>
                            ))}
                            <button type="button" onClick={handleAddEpisode}>
                                Add Episode
                            </button>
                    </div>
                )}

                <label>
                    Languages:
                    <input
                        name="languages"
                        value={formData.languages || ''}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Subtitles:
                    <input
                        name="subtitles"
                        value={formData.subtitles || ''}
                        onChange={handleChange}
                    />
                </label>

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
