"use client"
import styles from './Submission.module.css'; 
import { useEffect, useState } from "react";
import Link from "next/link";

const SubmissionPresent = ({submission}) => {

    return (
        <div className={`${styles.wrap} displayBox`}>
            {submission &&
                <div className={styles.outline}>
                    <p className = "cWhite medBig serifBold">{submission.title == null ? <span className="cRed">Untitled Submission</span> : submission.title}<span className="smallMed">&nbsp;</span><span className="small cGray serifBold">{submission.teamID}</span></p>
                    <hr/>
                    <p className="cWhite ">Developed by <span className="serifBold cBlue">{submission.members}</span></p>
                    <p className="cWhite">Built using <span className="serifBold cGreen">{submission.technologies == null ? <span className="cRed">No Technologies Listed</span> : submission.technologies}</span></p>

                    <p className="cWhite"><span className="cYellow serifBold">{submission.prompt} </span>| {submission.description}</p>
                    <br/>
                </div>
            }
        </div>        

    );
};

export default SubmissionPresent;