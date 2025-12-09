import Server from "./ServerConnector.js";

const user = {};

user.getCurrentUser = async () => {
  try {
    console.log(
      "Getting current user from:",
      Server.serverName + "/api/auth/current_user"
    );
    const response = await fetch(Server.serverName + "/api/auth/current_user", {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Current user data:", data);
      if (data.authenticated) {
        return data.username;
      }
      return null;
    }
    return null;
  } catch (error) {
    console.error("Error checking login info:", error);
    return null;
  }
};

export default user;
