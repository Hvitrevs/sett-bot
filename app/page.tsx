import Image from "next/image";
import SettChat from "./components/SettChat";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4 text-center"> 🦊 Sett Bot</h1>
      <p className="text-center text-lg max-w-md">
        Welcome To Your Foxy Gaming Bot Dashboard.
      </p>
      <SettChat />
    </main>
  );
}