"use client"
import styles from './Submission.module.css'; 

const Submission = ({submission, user}) => {
    return (
        <div className={styles.wrap}>
            {submission &&
                        <div className={styles.outline}>
                        <p>Project Title: {submission.title}</p>
                        <p>Project Description: {submission.description}</p>
                        <p>Technologies: {submission.technologies}</p>
                        <p>Code Submission: {submission.sub_code == "Github" ? submission.github : submission.sub_code}</p>
                        <p>Video Submission: {submission.sub_video}</p>
        
                    </div>
            }
        </div>        

    );
};

export default Submission;