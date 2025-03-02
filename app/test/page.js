"use client"
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import Submission from '@/components/Submission';

const Test = () => {
    const { data: session } = useSession();
    const [entries, setEntries] = useState([]);
    
    const fetchEntries = async () => {
        if(session){
            try {
                const response = await fetch("/api/sql/pullProject");
                if (response.ok) {
                    const data = await response.json();
                    setEntries(data);
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

    useEffect(() => {
        fetchEntries();
    }, [session]);

    return (
    <>
        {session &&
            <div>
                {console.log(entries)}
                <Submission submission = {entries[0]} user = {session.user.email}></Submission>
            </div>
        }
    </>
    );
};

export default Test;