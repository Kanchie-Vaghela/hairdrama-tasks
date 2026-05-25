const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export const fetchUsersApi = async () => {
  const res = await fetch(`${BASE_URL}/users`);
  return res.json();
};

export const fetchTasksApi = async () => {
  const res = await fetch(`${BASE_URL}/tasks`);
  return res.json();
};

export const createTaskApi = async (body: any) => {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return res.json();
};

export const saveUserApi = async (body: any) => {
  const res = await fetch(`${BASE_URL}/save-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return res.json();
};

export const completeTaskApi = async (
  taskId: string
) => {

  const res = await fetch(
    `${BASE_URL}/tasks/${taskId}/complete`,
    {
      method: "PATCH",
    }
  );

  return res.json();
};