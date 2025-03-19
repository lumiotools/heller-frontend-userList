import UserList from "./ui/userlist";

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 bg-[#eff6fb]">
      <div className="max-w-5xl mx-auto">
        <UserList />
      </div>
    </main>
  );
}
