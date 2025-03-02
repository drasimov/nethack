"use client"
import styles from './JudgeToolbox.module.css'; 
import React from 'react';
import { useEffect, useState } from "react";

const JudgeToolbox = ({submission}) => {

    const [title, setTitle] = useState(submission.title);
    const [technologies, setTechnologies] = useState(submission.technologies);
    
    const changeEntries = async () => {
        const data = {
            teamID: submission.teamID,
            title,
            description: submission.description,
            github: submission.github,
            prompt: submission.prompt,
            technologies,
        };

        try {
            const response = await fetch('api/sql/editProject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (response.ok) {
                // fetchEntries();
            } else {
                console.error('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={`${styles.wrap} smallMed judgeTools serifBold`}>
            <span className="small cRed">Judge Tools<br/></span>
            <span className="button" onClick={() => {
        const newTitle = prompt("Enter a new title:");
        if (newTitle) {
            setTitle(newTitle);
            changeEntries();
        }
    }}>Edit Title</span>
            <span className="button">Edit Techs</span>
            <span className="button">Add Comment</span>
        </div>        

    );

}

export default JudgeToolbox;