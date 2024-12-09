"use client";

import AuthGuard from "@/middleware/AuthGuard";
import LogoutButton from "@/components/page/logout";

export default function Dashboard() {
  return (
    <AuthGuard>
      <div>
        <h1>Welcome to the Dashboard</h1>
        <p>This is a protected page.</p>
          <LogoutButton/>
      </div>
    </AuthGuard>
  );
}
