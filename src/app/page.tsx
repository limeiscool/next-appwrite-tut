"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';




export default function Home() {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout successful! 👋')
      router.push('/login');
    } catch (error:any) {
      console.log("Logout error: ", error.message);
      toast.error(error.message);
    }
  }  
  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-blue-500 p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl">Next.js App</div>
          <div>
            <Link href="/profile" className="text-white hover:text-gray-200 mr-4">Profile</Link>
            <button onClick={logout} className="text-white hover:text-gray-200">Logout</button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to Next.js</h1>
        <p className="text-lg text-gray-600 mb-8">Build something amazing!</p>
        {/* Your main content here */}
      </main>
      <Toaster />
    </div>
  );
}

