"use client"
import React from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { useCompetition } from '@/context/CompetitionContext';
import Link from "next/link";

const Login = () => {
    const { data: session } = useSession();
    const competitionState = useCompetition().competitionState;

  return (
    <div>
        {console.log(competitionState)}
        <p><span className="cWhite serifBold big">User Login</span></p>
        <hr/>
        <p className="cBlue">This is the portal for <span className="serifBold">competitor, voter, and judge</span> account login.</p>
        <p className="cYellow">Please note you should login using your <span className = "console">@basischina.com</span> Microsoft email account.</p>
        <div className="console lightBox loginBox cBlack">
        {session ? (
        <>
            <p className="center">You are logged in. <span className="button serifBold bWhite" onClick={() => signOut()}>Sign out</span></p>
            <br/>
            <p className = "serifBold">Your Account Information</p>
            <p>Name: {session.user.name}</p>
            <p>Email: {session.user.email}</p>
            <p>Account type: </p>
            <p className = "center"><Link href="/dashboard"><span className="button serifBold bBlue">Open My Hackathon Dashboard</span></Link></p>
        </>
        ):(
        <>
            <p className="center">You are not currently logged in. <span className="button serifBold" onClick={() => signIn("azure-ad")}>Sign in</span></p>
        </>
        )}
      </div>
        
    </div>
  );
};

export default Login;