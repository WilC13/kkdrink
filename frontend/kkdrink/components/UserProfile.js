"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    const loggedInCookie = Cookies.get("logged_in");
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
    if (loggedInCookie === "true") {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div>
      {loggedIn ? (
        <div>
          <h1>Welcome, {user.email}</h1>
          <p>Your UID: {user.uid}</p>
        </div>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
}
