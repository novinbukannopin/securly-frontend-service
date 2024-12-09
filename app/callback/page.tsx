"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function DashboardRedirectHandler() {
  const router = useRouter();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (token) {
      Cookies.set("token", token, {
        httpOnly: false, // Bisa diakses dari JavaScript (untuk autentikasi)
        secure: process.env.NODE_ENV === "production", // Hanya pada HTTPS jika produksi
        sameSite: "strict", // Melindungi dari serangan CSRF
      });

      // Redirect ke dashboard tanpa query parameter
      router.replace("/dashboard");
    } else {
      router.push("/login");
    }
  }, [router]);

  return <div>Loading...</div>; // Placeholder hingga token diproses
}
