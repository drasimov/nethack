"use client"
import React from 'react';
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useCompetition } from '@/context/CompetitionContext';
import CountdownMini from '@/components/CountdownMini';
import SubmissionPresent from '@/components/SubmissionPresent';

const Dashboard = () => {
    const { data: session } = useSession();
    const competitionState = useCompetition().competitionState;
    const [entries, setEntries] = useState([]);
    
    // TODO: implement edit mode and view mode? prevent accidental changes
    const [edit, setEdit] = useState(false);

    const [teamID, setTeamID] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [github, setGithub] = useState("");
    const [prompt, setPrompt] = useState("");
    const [technologies, setTechnologies] = useState("");

    const fetchEntries = async () => {
        if(session){
            try {
                let winners = ["c0ad4f19", "d34f1c1d", "dbb3b35b", "012ba255", "17b07c3a", "46ff65b7", "f4da2d19", "7fea1e8e"]
                let all = [];
                let data;
                for(let i=0; i<winners.length; i++){
                    let response = await fetch("/api/sql/pullProject?search=" + winners[i]);
                    if (response.ok) {
                        data = await response.json();
                        all.push(data[0]);
                    }
                    else {
                        console.error("Failed to fetch entries");
                    }    
                }
                setEntries(all);
            }
            catch (error) {
                console.error("Error fetching entries: ", error);
            }    
        }
    };

    useEffect(() => {
        fetchEntries();
        if(session){
            setTeamID(session.user.teamID)
        }
    }, [session]);
  return (
    <>
            <p><span className="cWhite serifBold big">Project Showcase (2025R1)</span></p>
            <hr/>
            <p className="cBlue">As a <span className="serifBold">Judge</span>, this is where you can survey and manage the competition submission.</p><br/>
            <p>The Hackathon submissions for 2025R1 can be found below. Some notes on judging:</p>
            <div>
                {entries.map(entry => (
                    <SubmissionPresent key = {entry.teamID} submission ={entry}></SubmissionPresent>
                ))}

            </div>

    </>
  );
};

export default Dashboard;