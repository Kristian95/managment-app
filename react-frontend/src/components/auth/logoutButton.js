const LogoutButton = () => {
    const handleLogout = async () => {
      try {
        const response = await fetch("http://localhost:4000/logout", {
          method: "POST",
          credentials: "include",
        });
        const data = await response.json();
  
        if (response.ok) {
          alert(data.message);
        } else {
          alert(data.error || "Logout failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    return <button onClick={handleLogout}>Logout</button>;
  };
  
  export default LogoutButton;
  