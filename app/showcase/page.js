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
    const [entries, setEntries] = useState("Loading...");

    const fetchEntries = async () => {
        if(session){
            try {
                // TODO: prob modify database schema (i.e. make new fields) so this can be done in 1 api call
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
    }, [session]);

    const iconAward = (
        // <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-award" viewBox="0 0 16 16">
        //     <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702z"/>
        //     <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z"/>
        // </svg>    
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-award-fill" viewBox="0 0 16 16">
            <path d="m8 0 1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864z"/>
            <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z"/>
        </svg>
    )
    return (
        <>
            <p><span className="cWhite serifBold big">Project Showcase (2025R1)</span></p>
            <hr/>
            <p className="cBlue">As a <span className="serifBold">Judge</span>, this is where you can survey and manage the competition submission.</p><br/>
            <p>The Hackathon submissions for 2025R1 can be found below. Some notes on judging:</p>
            <div>
            {entries != "Loading..." && (
                <>
                <div className = "border gold">
                    <SubmissionPresent key = "0" submission ={entries[0]} override = {0}></SubmissionPresent>
                    <div className = "award">{iconAward}</div>
                </div>
                <div className = "border silver">
                    <SubmissionPresent key = "1" submission ={entries[1]} override = {0}></SubmissionPresent>
                    <div className = "award">{iconAward}</div>
                </div>
                <div className = "border bronze">
                    <SubmissionPresent key = "2" submission ={entries[2]} override = {0}></SubmissionPresent>
                    <div className = "award">{iconAward}</div>
                </div>

                <div className = "border green">
                    <SubmissionPresent key = "3" submission ={entries[3]} override = {0}></SubmissionPresent>
                    <div className = "award">{iconAward}</div>
                </div>
                <div className = "border green">
                    <SubmissionPresent key = "4" submission ={entries[4]} override = {0}></SubmissionPresent>
                    <div className = "award">{iconAward}</div>
                </div>
                <div className = "border green">
                    <SubmissionPresent key = "5" submission ={entries[5]} override = {0}></SubmissionPresent>
                    <div className = "award">{iconAward}</div>
                </div>
                <div className = "border green">
                    <SubmissionPresent key = "6" submission ={entries[6]} override = "https://david-why.tech/bmplogicsim/"></SubmissionPresent>
                    <div className = "award">{iconAward}</div>
                </div>
                <div className = "border green">
                    <SubmissionPresent key = "7" submission ={entries[7]} override = {0}></SubmissionPresent>
                    <div className = "award">{iconAward}</div>
                </div>
                </>
            )}
            </div>
        </>
    );
};

export default Dashboard;