'use client';

import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const getInitials = (username: string) => {
    if (!username) return "??"; 
    return username.substring(0, 2).toUpperCase();
  }

  useEffect(() => {
    fetch('/api/userData', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setUsername(data.username);
        setEmail(data.email);
      });
  }, []);

  const [projects, setProjects] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/projectData', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setProjects(data.projects);
      });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-white">
      <div className='lg:w-2/5'>
        <div className='flex p-6 justify-between w-full items-center'>
            <div data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start"  className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm">
              {getInitials(username)}
            </div>
            <div id="userDropdown" className="z-10 hidden bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44">
                <div className="px-4 py-3 border-b border-default-medium text-sm text-heading">
                  <div className="font-medium">{username}</div>
                  <div className="truncate">{email}</div>
                </div>
            </div>
            <Link href="/addProject" className="lg:hidden flex items-center gap-2 lg:self-end text-white bg-black hover:scale-110 transition-transform active:scale-95 font-medium rounded-3xl px-4 py-2.5 w-fit">
              Project <span className="material-symbols-outlined">add</span>
            </Link>
        </div>

        <div className='p-6 mb-4 w-full'>
          <div className='lg:mb-10'>
            <h1 className="text-2xl font-bold text-black ">Hallo,</h1>
            <h1 className="text-4xl font-bold text-black">Zahrin{username}</h1>
          </div>

          <a className='text-black'>Heads up! A task deadline is approaching.</a>
          <div className='flex flex-col bg-[#F7C873] p-5 rounded-lg mt-3 border border-black'>
            <h5 className='text-black text-[16px]'>Implement Login Feature (Task Title)</h5>
            <p className='text-gray-500 text-[14px] font-light'>On Web App (Project Title)</p>
            <p className='text-gray-500 text-[14px] font-light'>Deadline: Jan 22, 2026 (Deadline)</p>
          </div>
        </div>
      </div>
      

      <div className='flex flex-col lg:w-3/5 border border-black h-full w-full rounded-t-[50px] lg:rounded-l-[60px] lg:rounded-tr-none p-10'>
        <Link href="/addProject" className="hidden lg:flex items-center gap-2 lg:self-end text-white bg-black hover:scale-110 transition-transform active:scale-95 font-medium rounded-3xl px-4 py-2.5 w-fit">
          Project 
          <span className="material-symbols-outlined">add</span>
        </Link>

        <h4 className='text-black font-semibold mb-5 text-xl mt-10'>Workspace Projects</h4>
        {projects.length === 0 ? (
          <div className='flex flex-col justify-center items-center lg:mt-20 mt-4 space-y-4'>
            <span className="material-symbols-outlined"
                  style={{ fontSize: '60px' }}>
              folder_open
            </span>
            <p className='text-slate-600 flex justify-center'>No projects found. Create a new project to get started!</p>
          </div>
        ) : (
          <>
            <p className='text-slate-600'>You have {projects.length} projects.</p>
            {projects.map(project => (
              <Link href={`/projectTask/${project.id}`} key={project.id} className="lg:mt-4 block">
                <div className='border-b border-b-black p-2 hover:bg-slate-50 rounded-t-2xl mb-3 cursor-pointer'>
                  <h5 className='text-black font-medium text-[16px] mb-2'>Project Title{project.projectTitle}</h5>
                  <div className='flex flex-row items-center'>
                    <span className="material-symbols-outlined text-slate-600 mr-3">groups</span>
                    <p className='text-slate-700 text-[14px] font-light'>{project.collaborators.length} collaborators</p>
                  </div>
                  <div className='flex flex-row items-center mb-3'>
                    <span className="material-symbols-outlined text-orange-800 mr-3 text-[10px]">alarm</span>
                    <p className='text-slate-700 text-[14px] font-light'>Deadline: Jan 22, 2026{project.deadline}</p>
                  </div>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
}