"use client"
import React from 'react';
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useCompetition } from '@/context/CompetitionContext';
import Submission from '@/components/Submission';
import CompetitorDashboard from '@/components/CompetitorDashboard';

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
                if(session.user.access == 1){
                    const response = await fetch("/api/sql/pullProject?search=" + session.user.teamID);
                    if (response.ok) {
                        const data = await response.json();
                        setEntries(data[0]);
                        setTitle(data[0]?.title)
                        setDescription(data[0]?.description)            
                        setGithub(data[0]?.github)
                        setPrompt(data[0]?.prompt)
                        setTechnologies(data[0]?.technologies)
                    }
                    else {
                        console.error("Failed to fetch entries");
                    }    
                }
                if(session.user.access > 1){
                    const response = await fetch("/api/sql/pullProject");
                    if (response.ok) {
                        const data = await response.json();
                        setEntries(data);
                    }
                    else {
                        console.error("Failed to fetch entries");
                    }    
                }
            }
            catch (error) {
                console.error("Error fetching entries: ", error);
            }    
        }
    };

    // this is called by an onUpdate that goes through Submission > JudgeToolbox
    const refreshData = () => {
        fetchEntries(); 
    };

    useEffect(() => {
        fetchEntries();
        if(session){
            setTeamID(session.user.teamID)
        }
    }, [session]);

  return (
    <>
    {session ? (
    <>
        {/* handle access level 0 - visitor.voter */}
        {session.user.access <1 &&
        <>
            <p>Your account (<span className="serifBold">Visitor/Voter</span>)does not grant you access to this page.</p>
        </>
        }
        {/* handle access level 1 - competitor */}
        {session.user.access == 1 && 
            <CompetitorDashboard />
        }
        {competitionState != "judging" && session.user.access > 1 &&
        <>
            <p>Page under construction.</p>
        </>
        }

        {competitionState == "judging" && session.user.access > 1 &&
        <>
            <p><span className="cWhite serifBold big">Dashboard for {session.user.name}</span></p>
            <hr/>
            <p className="cBlue">As a <span className="serifBold">Judge</span>, this is where you can survey and manage the competition submission.</p><br/>
            <p>The Hackathon submissions for 2025R1 can be found below. Some notes on judging:</p>
            <ul>
                <li>Code, Video, and Project Information (title, description) should be mandatory.</li>
                <li>Github and Technologies list was explicitly stated to be optional. </li>
                <li>Submissions are uniquely identified by teamID.</li>
            </ul><br/>
            <p>Some additional notes:</p>
            <ul>
                <li>Since these submissions will eventually be displayed on this site, it is better for submissions to have proper titles and technologies lists</li>
                <li>A very basic tool is given on the upper-right corner for you to edit these as needed. This will directly change the entries in our Hackathon database</li>
                <li>Links are included for your convenience. However, some may be broken/locked behind login; you may need to go back to the Teams assignment page to see the submission</li>
                <li>Additional judging features should be available for future rounds (e.g. Add Comment). For now we suggest you keep organized in external documents :(</li>
            </ul>
            <div>
                {entries.map(entry => (
                    <Submission key = {entry.teamID} submission ={entry} user={session.user} onUpdate={refreshData}></Submission>
                ))}

            </div>

        </>
        }
    </>
    ):(
    <>
        <p>You need to <b><Link className="button bGray" href = "/login">Login</Link></b> to access this page.</p>
    </>
    )}
    </>
  );
};

export default Dashboard;