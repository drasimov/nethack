"use client"
import Link from "next/link";
import styles from './Navbar.module.css'; 
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { status: authStatus } = useSession();
  return (
    <div className={styles.nav}>
        <div className={styles.wrap}>
            <Link href = "/">BIBS·C Network Hackathon</Link>
            <Link href = "/login" className = {`${styles.right} med`}>{authStatus === 'authenticated' ? 'Logout' : 'Login'}</Link>
        </div>
    </div>
  );
};

export default Navbar;