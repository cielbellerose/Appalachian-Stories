export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <h2>Login</h2>

      <form className="App" onSubmit={(event) => event.preventDefault()}>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <input type="submit" style={{ backgroundColor: "#a1eafb" }} />
      </form>
    </>
  );
}
