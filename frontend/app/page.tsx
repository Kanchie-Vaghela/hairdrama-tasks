"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface User {
  id: string;
  email: string;
  name: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

export default function Home() {
  const [user, setUser] = useState<any>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  useEffect(() => {
    getUser();
    fetchUsers();
    fetchTasks();
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

  const fetchUsers = async () => {
    const res = await fetch("http://127.0.0.1:5000/users");
    const data = await res.json();

    setUsers(data.data);
  };

  const fetchTasks = async () => {
    const res = await fetch("http://127.0.0.1:5000/tasks");
    const data = await res.json();

    setTasks(data.data);
  };

  const createTask = async () => {
    if (!title || !description || !assignedTo) {
      alert("Fill all fields");
      return;
    }

    await fetch("http://127.0.0.1:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        created_by: user.id,
        assigned_to: assignedTo,
      }),
    });

    setTitle("");
    setDescription("");
    setAssignedTo("");

    fetchTasks();
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

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <button
          onClick={handleLogin}
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Login with Google
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <div className="max-w-3xl mx-auto">

        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <div className="flex items-center gap-4">

            <img
              src={user.user_metadata.avatar_url}
              alt="avatar"
              className="w-16 h-16 rounded-full"
            />

            <div>
              <h1 className="text-2xl font-bold">
                {user.user_metadata.full_name}
              </h1>

              <p>{user.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
          >
            Logout
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-xl font-bold mb-4">
            Create Task
          </h2>

          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <textarea
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4"
          >
            <option value="">Assign User</option>

            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.email})
              </option>
            ))}
          </select>

          <button
            onClick={createTask}
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Create Task
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">
            Tasks
          </h2>

          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="border p-4 rounded-lg"
              >
                <h3 className="text-lg font-bold">
                  {task.title}
                </h3>

                <p className="text-gray-600">
                  {task.description}
                </p>

                <p className="mt-2">
                  Status:
                  <span className="font-semibold ml-2">
                    {task.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}