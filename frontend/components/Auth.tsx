interface Props {
  handleLogin: () => void;
}

export default function Auth({
  handleLogin,
}: Props) {
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