import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useAuth } from "../../hook/AuthContext";

const NavBar = () => {

  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const homeHandler= () =>{navigate('/')}

  return (
    <nav className={styles.navBar}>
      
        <div className={styles.header} type="button">
            <span type="button" className={styles.logotext} onClick={homeHandler}>Weing</span>
        </div>

        <div className={styles.main}>
        <div className={styles.navItem}>
          <Link className={styles.navLink} to="/lists">
            토론🔥
          </Link>
        </div>
        <div className={styles.navLink}><a>케미&nbsp;&nbsp;&nbsp;</a></div>
        <div className={styles.navLink}><a>Chat</a></div>
        </div>
        
      
      <div className={styles.footer}>
        {isLoggedIn ? (
          <>
            <div className={styles.navItem}>
              <Link
                className={`${styles.navLink} ${styles.smallText}`}
                to="/Mydiscussion"
              >
                마이페이지
              </Link>
            </div>
            <div className={styles.navItem}>
              <Link
                className={`${styles.navLink} ${styles.smallText}`}
                to="/lists"
                onClick={handleLogout}
              >
                로그아웃
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className={styles.navItem}>
              <Link
                className={`${styles.navLink} ${styles.smallText}`}
                to="/login"
              >
                Login
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
