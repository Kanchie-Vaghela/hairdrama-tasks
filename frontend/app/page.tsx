"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);

    if (user) {
      await fetch("http://127.0.0.1:5000/save-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          email: user.email,
          name: user.user_metadata.full_name,
          avatar_url: user.user_metadata.avatar_url,
        }),
      });
    }
  };

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      {!user ? (
        <button
          onClick={handleLogin}
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Login with Google
        </button>
      ) : (
        <div className="text-center">
          <img
            src={user.user_metadata.avatar_url}
            alt="avatar"
            className="w-20 h-20 rounded-full mx-auto"
          />

          <h1 className="text-2xl mt-4">
            {user.user_metadata.full_name}
          </h1>

          <p>{user.email}</p>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-lg mt-4"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}