'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const getInitials = (username: string) => {
    if (!username) return "??"; 
    return username.substring(0, 2).toUpperCase();
  }

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-white">
      <div className='flex p-10 justify-between items-center'>
        <div data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start"  className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm">
          {getInitials(username)}
        </div>
        <div id="userDropdown" className="z-10 hidden bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44">
            <div className="px-4 py-3 border-b border-default-medium text-sm text-heading">
              <div className="font-medium">{username}</div>
              <div className="truncate">{email}</div>
            </div>
        </div>
        <Link href="/addProject" className="text-white bg-black active:scale-95 transition-all duration-300 ease-out font-medium leading-5 rounded-base text-sm rounded-3xl px-4 py-2.5 focus:outline-none">
          Project <span className="material-symbols-outlined">add</span>
        </Link>
      </div>

      <div className='lg:flex'>
        <div className='p-10 mb-5 lg:w-2/5'>
          <h1 className="text-2xl font-bold text-black ">Hallo,</h1>
          <h1 className="text-4xl font-bold text-black">{username}</h1>

          <a className='text-black'>Heads up! A task deadline is approaching.</a>
          <div className='flex flex-col bg-[#F7C873] p-5 rounded-lg mt-3 border border-black'>
            <h5 className='text-black'>Implement Login Feature (Task Title)</h5>
            <a className='text-black'>On Web App (Project Title)</a>
            <a className='text-black'>Deadline: Jan 22, 2026 (Deadline)</a>
          </div>
        </div>

        <div className='lg:w-3/5 border border-black h-full w-full rounded-t-4xl lg:rounded-l-4xl rounded-tr-3xl p-10'>
          <h4 className='text-black'>Workspace Projects</h4>
        </div>
      </div>
    </div>
  );
}