export default function UserProfile({
  user,
  handleLogout,
}: any) {
  return (
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
  );
}