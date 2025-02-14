"use client"
import React from 'react';
import { useSession } from "next-auth/react";
import { useCompetition } from '@/context/CompetitionContext';
import CountdownMini from '@/components/CountdownMini';

const Dashboard = () => {
    const { data: session } = useSession();
    const competitionState = useCompetition().competitionState;

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
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" transform="translate(0,-.6)" viewBox="0 0 16 16">
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
    <div>
        {competitionState}
        <p><span className="cWhite serifBold big">Name's Dashboard</span></p>
        <hr/>
        <p className="cBlue">As a <span className="serifBold">competitor</span>, this is where you can view the progress of the competition and your project.</p>
        <p className="cYellow">The 2025 Network Hackathon is currently in the
            <span className = "qBox">&nbsp;Closed&nbsp;
                <span className="tooltip">The Hackathon is <span className="serifBold">Closed</span>. It is currently not accepting work, meaning you may not edit or submit files at this time.</span>
            </span>&gt;
            <span className = "qBox">&nbsp;Active&nbsp;
                <span className="tooltip">The Hackathon is <span className="serifBold">Active</span>. You have this time to complete all aspects of your project submission. Be mindful of the stated deadline and carefully follow the instructions given on this page.</span>
            </span>&gt;
            <span className = "qBox">&nbsp;Review&nbsp;
                <span className="tooltip">The Hackathon is <span className="serifBold">Under Review</span>. You are no longer able to edit your submission as it is being reviewed by judges and packaged for presentation.</span>
            </span>
            phase.
        </p>
        <br/>
        <div className="flexBox">
            <div className="leftBox">
                <div className="projBox cYellow padBottom">
                    <p className="serifBold med">Hackathon is Active</p>
                    <p>Time remaining: <span className="bSmooth console"><CountdownMini targetDate='2025-02-17T08:59:59Z' ></CountdownMini></span></p>
                </div>
                <div className="projBox console cBlue">
                    <p className="serifBold med">Project Checklist</p>
                    <p className="wrapCheckbox"><label className="labelCheckbox">
                        <input type="checkbox" />
                        {iconCheck} 
                    </label>
                    Hello Test</p>
                    <p className="wrapCheckbox"><label className="labelCheckbox">
                        <input type="checkbox" />
                        {iconCheck} 
                    </label>
                    Hello Test</p>
                </div>
            </div>
            <div className="rightBox">
                <div className="projBox console">
                    <span className="inputWrap">
                        <input className="txtBox medBig serifBold" type="text" defaultValue="Project Title"/>
                        <div className="action">{iconEdit}{iconSave}</div>
                    </span>
                </div>
            </div>
        </div>
        
    </div>
  );
};

export default Dashboard;