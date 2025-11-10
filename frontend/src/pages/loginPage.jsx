import LoginForm from "../components/LoginForm";
import TrailNavbar from "../components/NavBar";
import RegisterForm from "../components/RegisterForm";
import { useState, useEffect } from "react";
import styles from "../css/LoginPage.module.css";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  // this page doesn't scroll vertically
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      <TrailNavbar />
      <div className={styles.contentContainer}>
        <div className={styles.container}>
          {isLogin ? (
            <LoginForm onSignupSelection={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onLoginSelection={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </>
  );
}
