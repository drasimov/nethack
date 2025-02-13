"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

const CompetitionContext = createContext();

export const CompetitionProvider = ({ children }) => {
    const [competitionState, setCompetitionState] = useState(null);

    const fetchCompetitionState = async () => {
        try {
            const response = await fetch("/api/sql/phase");
            if (response.ok) {
                const data = await response.json();
                setCompetitionState(data[0].phase);
            }
            else {
                console.error("Failed to fetch entries");
            }
        }
        catch (error) {
            console.error("Error fetching entries: ", error);
        }
    };

    useEffect(() => {
        fetchCompetitionState();
    })

    return (
        <CompetitionContext.Provider value={{ competitionState }}>
            {children}
        </CompetitionContext.Provider>
    );
};

export const useCompetition = () => {
    return useContext(CompetitionContext);
};