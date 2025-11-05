import LoginForm from "../components/LoginForm";
import TrailNavbar from "../components/NavBar";
import RegisterForm from "../components/RegisterForm";
import { useState } from "react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <TrailNavbar />
      {isLogin ? (
        <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
      ) : (
        <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
      )}

      <RegisterForm />
    </>
  );
}
