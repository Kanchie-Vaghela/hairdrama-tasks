"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import Auth from "@/components/Auth";
import UserProfile from "@/components/UserProfile";
import CreateTask from "@/components/CreateTask";
import TaskList from "@/components/TaskList";

import { User, Task } from "@/types";

import {
  fetchUsersApi,
  fetchTasksApi,
  createTaskApi,
  saveUserApi,
  completeTaskApi,
} from "@/services/api";

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
      await saveUserApi({
        id: user.id,
        email: user.email,
        name: user.user_metadata.full_name,
        avatar_url: user.user_metadata.avatar_url,
      });
    }
  };

  const fetchUsers = async () => {
    const data = await fetchUsersApi();
    setUsers(data.data);
  };

  const fetchTasks = async () => {
    const data = await fetchTasksApi();
    setTasks(data.data);
  };

  const createTask = async () => {
    if (!title || !description || !assignedTo) {
      alert("Fill all fields");
      return;
    }

    await createTaskApi({
      title,
      description,
      created_by: user.id,
      assigned_to: assignedTo,
    });

    setTitle("");
    setDescription("");
    setAssignedTo("");

    fetchTasks();
  };

  const completeTask = async (taskId: string) => {
    await completeTaskApi(taskId);

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
    return <Auth handleLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <div className="max-w-3xl mx-auto">
        <UserProfile user={user} handleLogout={handleLogout} />

        <CreateTask
          users={users}
          title={title}
          description={description}
          assignedTo={assignedTo}
          setTitle={setTitle}
          setDescription={setDescription}
          setAssignedTo={setAssignedTo}
          createTask={createTask}
        />

        <TaskList tasks={tasks} completeTask={completeTask} />
      </div>
    </div>
  );
}
