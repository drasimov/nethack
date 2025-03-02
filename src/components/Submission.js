    "use client"
    import styles from './Submission.module.css'; 
    import { useEffect, useState } from "react";
    import Link from "next/link";
    import JudgeToolbox from '@/components/JudgeToolbox'; 

    const Submission = ({submission, user, onUpdate}) => {

        const updateSubmission = (updatedSubmission) => {
            setSubmission(updatedSubmission);
        };

        return (
            <div className={`${styles.wrap} displayBox`}>
                {submission &&
                    <div className={styles.outline}>
                        <p className = "cWhite medBig serifBold">{submission.title == null ? <span className="cRed">Untitled Submission</span> : submission.title}<span className="smallMed">&nbsp;</span><span className="small cGray serifBold">{submission.teamID}</span></p>
                        {user.access >= 2 &&
                        <div className={styles.toolbox}><JudgeToolbox submission={submission} onUpdate={onUpdate}/></div>
                        }
                        <hr/>
                        <p className="cWhite ">Developed by <span className="serifBold cBlue">{submission.members}</span></p>
                        <p className="cWhite">Built using <span className="serifBold cGreen">{submission.technologies == null ? <span className="cRed">No Technologies Listed</span> : submission.technologies}</span></p>

                        <p className="cWhite">{submission.description}</p>
                        <br/>
                        <span className="console">
                            <p className="cWhite sub"><span className="cPurple serifBold">Code&nbsp;</span> {submission.sub_code == "Github" ? <a href={submission.github} target="_blank">{submission.github}</a> : submission.sub_code == "NOT SUBMITTED" ? <span className="cRed">{submission.sub_code}</span> : <a href={submission.sub_code} target="_blank">{submission.sub_code}</a> }</p>
                            <p className="cWhite sub"><span className="cPurple serifBold">Video</span> {submission.sub_video == "NOT SUBMITTED" ? <span className="cRed">{submission.sub_video}</span> : <a href={submission.sub_video} target="_blank">{submission.sub_video}</a>}</p>
                        </span>
                    </div>
                }
            </div>        

        );
    };

    export default Submission;