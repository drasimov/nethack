"use client"
import React from 'react';
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useCompetition } from '@/context/CompetitionContext';
import CountdownMini from '@/components/CountdownMini';

const Dashboard = () => {
    const { data: session } = useSession();
    const competitionState = useCompetition().competitionState;
    const [entries, setEntries] = useState([]);
    
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
            catch (error) {
                console.error("Error fetching entries: ", error);
            }    
        }
    };

    const changeEntries = async () => {

        const data = {
            teamID,
            title,
            description,
            github,
            prompt,
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
                setEdit(false)
                fetchEntries();
            } else {
                console.error('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchEntries();
        if(session){
            setTeamID(session.user.teamID)
        }
    }, [session]);

    const iconEdit = (
        <span className="iconEdit">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
            </svg>
        </span>
    );
    const iconSave = (
        <span className="iconSave">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" transform="translate(0,-.6)" viewBox="0 0 16 16">
                <path d="M11 2H9v3h2z"/>
                <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"/>
            </svg>        
        </span>
    )
    const iconCheck = (
        <span className="iconCheck">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
            </svg>
        </span>
    )

  return (
    <>
    {session ? (
    <>
        <p><span className="cWhite serifBold big">Dashboard for {session.user.name}</span></p>
        <hr/>
        <p className="cBlue">As a <span className="serifBold">competitor</span>, this is where you can view the progress of the competition and your project.</p>
        <p className="cYellow">The 2025 Network Hackathon is currently in the&nbsp;
            <span className = {`qBox ${competitionState == "closed" ? 'serifBold serifUnderline' : ''}`}>Closed
                <span className="tooltip">The Hackathon is <span className="serifBold">Closed</span>. It is currently not accepting work, meaning you may not edit or submit files at this time.</span>
            </span>&nbsp;&gt;&nbsp;
            <span className = {`qBox ${competitionState == "active" ? 'serifBold serifUnderline' : ''}`}>Active
                <span className="tooltip">The Hackathon is <span className="serifBold">Active</span>. You have this time to complete all aspects of your project submission. Be mindful of the stated deadline and carefully follow the instructions given on this page.</span>
            </span>&nbsp;&gt;&nbsp;
            <span className = {`qBox ${competitionState == "review" ? 'serifBold serifUnderline' : ''}`}>Review
                <span className="tooltip">The Hackathon is <span className="serifBold">Under Review</span>. You are no longer able to edit your submission as it is being reviewed by judges and packaged for presentation.</span>
            </span>&nbsp;
            phase.
        </p>

        {competitionState == "closed" &&
        <>
        <br/>
        <div className="projBox cYellow padBottom">
            <p className="serifBold med">Hackathon is Closed</p>
            <p>Time remaining: <span className="bSmooth console"><CountdownMini targetDate='2025-02-17T08:59:59Z' ></CountdownMini></span></p>
        </div>
        </>}
        {/* CHANGE THIS TO active */}
        {competitionState == "active" &&
         session.user.access >=1 ? (
            <>
            <br/>
            <div className="flexBox">
                <div className="leftBox">
                    <div className="projBox cYellow padBottom">
                        <p className="serifBold med">Hackathon is Active</p>
                        <p>Time remaining: <span className="bSmooth console"><CountdownMini targetDate='2025-02-23T23:59:59Z' ></CountdownMini></span></p>
                    </div>
                    <div className="projBox console cBlue">
                        <p className="serifBold med">Project Checklist</p>
                        <p>Your team: <span className="serifBold">{entries.members}</span></p><br/>
                        <p className="wrapCheckbox"><label className="labelCheckbox">
                            <input type="checkbox" />
                            {iconCheck} 
                        </label>
                        Checklist Coming Soon</p>
    
                        {/* <p className="wrapCheckbox"><label className="labelCheckbox">
                            <input type="checkbox" />
                            {iconCheck} 
                        </label>
                        Hello Test</p> */}
                    </div>
                </div>
                <div className="rightBox">
                <form onSubmit={changeEntries}>
                    <div className="projBox console">
                        <button type="submit">{iconSave}</button>   
                        <span className="inputWrap">
                            <input className="txtBox medBig serifBold" 
                                type="text" 
                                placeholder="Project Title"
                                defaultValue={entries.title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </span>
                        <div className="flexBox clientWrap">
                            <div className="leftBoxInv">
                                <span className="inputWrap">
                                    Project Description
                                    <textarea className="txtBox txtArea med serifItalic" 
                                        placeholder="Describe your project in 3-8 sentences."
                                        defaultValue={entries.description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </span>
                            </div>
                            
                            <div className="rightBoxInv">
                                Prompt Select
                                <div className="txtArea">
                                    <p className="wrapRadio small"><label className="labelRadio">
                                        <input 
                                            type="radio" 
                                            value="Wiring and computing" 
                                            checked={prompt === 'Wiring and computing'} 
                                            onChange={(e) => setPrompt(e.target.value)} 
                                        />  
                                        <span className="iconRadio"></span>
                                    </label>
                                    Wires and computing</p>
                                    <p className="wrapRadio small"><label className="labelRadio">
                                        <input 
                                            type="radio" 
                                            value="Culture and humanity" 
                                            checked={prompt === 'Culture and humanity'} 
                                            onChange={(e) => setPrompt(e.target.value)} 
                                        />
                                        <span className="iconRadio"></span>
                                    </label>
                                    Culture and humanity</p>
                                    <p className="wrapRadio small"><label className="labelRadio">
                                        <input 
                                            type="radio" 
                                            value="Theory and reality" 
                                            checked={prompt === 'Theory and reality'} 
                                            onChange={(e) => setPrompt(e.target.value)} 
                                        />
                                        <span className="iconRadio"></span>
                                    </label>
                                    Theory and reality</p>
                                </div><br/>
                                <span className="inputWrap">
                                    List of technologies (optional)
                                    <textarea className="txtBox txtArea medSmall serifItalic" 
                                        placeholder="e.g. Javascript, Python, numpy, Scratch"
                                        defaultValue={entries.technologies}
                                        onChange={(e) => setTechnologies(e.target.value)}
                                    />
                                </span>
                                <span className="inputWrap">
                                    Link to Github (optional)
                                    <textarea className="txtBox txtArea medSmall serifItalic" 
                                        placeholder="https://..."
                                        defaultValue={entries.github}
                                        onChange={(e) => setGithub(e.target.value)}
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                </form>
                </div>
            </div>
            </>
    
        ):(
            <>
            <p>Your account does not grant you access to this page.</p>
            </>
        )}
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