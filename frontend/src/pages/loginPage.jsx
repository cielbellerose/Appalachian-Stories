import LoginForm from "../components/LoginForm";
import TrailNavbar from "../components/NavBar";
import RegisterForm from "../components/RegisterForm";

export default function LoginPage() {
  console.log("Hello from React!");

  return (
    <>
      <TrailNavbar />
      <LoginForm />
      <RegisterForm />
    </>
  );
}
