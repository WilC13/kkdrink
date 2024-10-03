"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
// import { useUser } from "../context/UserContext";
import Cookies from "js-cookie";

const FirebaseUI = dynamic(() => import("../firebaseui"), { ssr: false });

export default function Register() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const { setUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    const loggedInCookie = Cookies.get("logged_in");
    if (loggedInCookie === "true") {
      router.push("/"); // 如果已經登錄，重定向到首頁
    } else if (typeof window !== "undefined") {
      import("../firebaseui")
        .then(({ ui, uiConfig }) => {
          ui.start("#firebaseui-auth-container", {
            ...uiConfig,
            callbacks: {
              signInSuccessWithAuthResult: (authResult) => {
                const user = authResult.user;
                Cookies.set(
                  "user",
                  JSON.stringify({ uid: user.uid, email: user.email })
                ); // 設置用戶狀態到 cookies
                Cookies.set("logged_in", "true");
                router.push("/"); // 註冊成功後重定向到首頁
                return false; // 防止自動重定向
              },
            },
          });
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to load authentication UI. Please try again later.");
          setLoading(false);
        });
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      <p className="mb-6 text-gray-700">Create an account to get started</p>
      {loading && <div className="loader">Loading...</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div
        id="firebaseui-auth-container"
        className={`bg-white p-6 rounded shadow-md ${
          loading || error ? "hidden" : ""
        }`}
      ></div>
    </div>
  );
}
