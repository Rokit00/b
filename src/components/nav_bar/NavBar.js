import React from "react";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useAuth } from "../AuthContext";

const NavBar = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <nav className={styles.navBar}>
      <div className={styles.navList}>
        <div>
          <Link to="/">
            <img className={styles.logo} src={Logo} alt="logo" />
          </Link>
        </div>
        <div className={styles.navItem}>
          <Link className={styles.navLink} to="/lists">
            HOT🔥
          </Link>
        </div>
        <div className={styles.navItem}>
          <Link className={styles.navLink} to="/section2">
            케미확인
          </Link>
        </div>
      </div>
      <div className={styles.navList}>
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
                로그인
              </Link>
            </div>
            <div className={styles.navItem}>
              <Link
                className={`${styles.navLink} ${styles.smallText}`}
                to="/signup"
              >
                회원가입
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
