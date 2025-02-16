"use client"
import React, { useState } from 'react';

const UpdateTeamForm = () => {
    const [teamID, setTeamID] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [github, setGithub] = useState('');
    const [prompt, setPrompt] = useState('');
    const [technologies, setTechnologies] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            teamID,
            title,
            description,
            github,
            prompt,
            technologies,
        };

        try {
            const response = await fetch('api/sql/editProject', { // Adjust the URL to your endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('Update successful: ' + result.message);
            } else {
                setMessage('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Team ID"
                value={teamID}
                onChange={(e) => setTeamID(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="GitHub URL"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Technologies"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                required
            />
            <button type="submit">Update Team</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default UpdateTeamForm;