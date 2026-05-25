import { User } from "@/types";

interface Props {
  users: User[];
  title: string;
  description: string;
  assignedTo: string;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  setAssignedTo: (value: string) => void;
  createTask: () => void;
}

export default function CreateTask({
  users,
  title,
  description,
  assignedTo,
  setTitle,
  setDescription,
  setAssignedTo,
  createTask,
}: Props) {
  return (
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
  );
}