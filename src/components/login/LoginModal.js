// LoginModal.js
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./LoginModal.module.css";
import kakao from "../../assets/kakao_login.png";
import HorizonLine from "./HorizonLine";
import useInput from "../../hook/useInput";
import { useAuth } from "../../hook/AuthContext";
import axios from "axios";

function LoginModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = useInput("");
  const password = useInput("");
  const [errorMessage, setErrorMessage] = useState("");
  const REST_API_KEY = "9394c1ee0de2fd55a8ccc154f6cc5114";
  const REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";
  const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_LOGIN_URL;
  };

  let from = { pathname: "/lists" };
  if (location && location.state && location.state.from) {
    from = location.state.from;
  }
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/signin",
      {
        email: email.value,
        password: password.value,
      })
      .then((response) => {
        let accessToken = response.headers["authorization"];
        localStorage.setItem("token", accessToken.substring(accessToken.lastIndexOf(" ") + 1));
        setIsLoggedIn(true);
        navigate('/');
      })
      .catch((error) => {
        console.error("Login error:", error);
        setErrorMessage(
          "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요."
        );
      });
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className={styles.body}>
      <div className={styles.card}>
        <form id="form" className={styles.form} onSubmit={handleLogin}>
          <h1 className={styles.text}>WEING</h1>
          <img
            src={kakao}
            className={styles.kakao_image}
            alt="kakao"
            onClick={handleKakaoLogin}
          />
          <HorizonLine text="   or  " />
          <div className={styles.form_down}>
            <div className={styles.form_control}>
              <input
                type="text"
                id="email"
                placeholder="Email"
                value={email.value}
                onChange={email.onChange}
                required
              />
            </div>
            <div className={styles.form_control}>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password.value}
                onChange={password.onChange}
                required
              />
            </div>
            <button type="submit"className={styles.login_button}>로그인</button>
            <div className={styles.login_signup}>
              <div className={styles.login_signup_desc}>계정이 없으신가요?</div>
              <button
                className={styles.login_signup_link}
                onClick={handleSignUp}
              >
                가입하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
