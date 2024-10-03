"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // 導入 js-cookie 庫

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    // 清除 cookies
    Cookies.remove("user");
    Cookies.remove("logged_in");

    // 重定向到登錄頁面或首頁
    router.push("/login");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p>Logging out...</p>
    </div>
  );
}
