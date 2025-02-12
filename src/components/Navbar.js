"use client"
import Link from "next/link";
import styles from './Navbar.module.css'; 

const Navbar = () => {
  return (
    <div className={styles.nav}>
        <div className={styles.wrap}>
            <Link href = "/">BIBS·C Network Hackathon</Link>
            <Link href = "/login" className = {`${styles.right} med`}>Login</Link>
        </div>
    </div>
  );
};

export default Navbar;