import { Task } from "@/types";

export default function TaskList({
  tasks,
}: {
  tasks: Task[];
}) {
  return (
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
  );
}