const user = {};

user.getCurrentUser = async () => {
  try {
    console.log("entered try of get current user...")
    const response = await fetch("/api/current_user", {
      credentials: "include",
    });
    if (response.ok) {
      console.log("response was okayy!!! response", response)
      const data = await response.json();
      console.log("response.json : ", data)
      return data.username;
    }
    return null;
  } catch (error) {
    console.error("Error checking login info:", error);
    return null;
  }
};

export default user;
