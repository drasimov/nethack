"use client"
import styles from './Submission.module.css'; 

const Submission = ({submission, user}) => {
    return (
        <div className={`${styles.wrap} displayBox`}>
            {submission &&
                <div className={styles.outline}>
                    <p className = "cWhite medBig serifBold">{submission.title == null ? <span className="cRed">Untitled Submission</span> : submission.title}<span className="smallMed">&nbsp;</span><span className="small cGray serifBold">{submission.teamID}</span></p>
                    <hr/>
                    <p className="cWhite ">Developed by <span className="serifBold cBlue">{submission.members}</span></p>
                    <p className="cWhite">Built using <span className="serifBold cGreen">{submission.technologies == null ? <span className="cRed">No Technologies Listed</span> : submission.technologies}</span></p>

                    <p className="cWhite">{submission.description}</p>
                    <p>Code : {submission.sub_code == "Github" ? submission.github : submission.sub_code == "NOT SUBMITTED" ? <span className="cRed">{submission.sub_code}</span> : submission.sub_code }</p>
                    <p>Video: {submission.sub_video == "NOT SUBMITTED" ? <span className="cRed">{submission.sub_video}</span> : submission.sub_video}</p>
                </div>
            }
        </div>        

    );
};

export default Submission;