'use client';

import Link from 'next/link';
import { use, useEffect, useState } from 'react';

export default function ProjectTaskPage() {
    const [projectTitle, setProjectTitle] = useState('');
    const [deadlineProject, setDeadlineProject] = useState('');
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDesc, setTaskDesc] = useState('');
    const [deadlineTask, setDeadlineTask] = useState('');

    useEffect(() => {
        fetch('/api/projectTaskData', {
        credentials: 'include',
        })
        .then(res => res.json())
        .then(data => {
            setProjectTitle(data.projectTitle);
            setDeadlineProject(data.deadlineProject);
            setTaskTitle(data.taskTitle);
            setTaskDesc(data.taskDesc);
            setDeadlineTask(data.deadlineTask);
        });
    }, []);

    const colors = ["#F4F6FB", "#FFF5E9", "#FFFFFF", "#F3FAF5", "#FDF0F5"];
    const hoverColors = ["#AFC1E8", "#FFE1B8", "#CBCBCB", "#CFE6CF", "#F7C6D9"];
    const borderColors = ["#AFC1E8", "#FFE1B8", "#CBCBCB", "#CFE6CF", "#F7C6D9"];
    
    return (
        <div className='bg-white h-screen w-full p-10'>
            <Link href="/addTask">
                <button 
                    className='fixed bottom-10 right-10 bg-black text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 z-50'>
                    <span className="material-symbols-outlined text-3xl">add</span>
                </button>
            </Link>

            <div className='flex flex-row justify-between'>
                <Link href="/dashboard">
                    <button className='text-white bg-black hover:bg-slate-700 font-medium text-sm rounded-full w-10 h-10 flex items-center justify-center'>
                        <span className="material-symbols-outlined p-2">arrow_back_ios</span>
                    </button>
                </Link>
                <div className="flex -space-x-4 rtl:space-x-reverse">
                    <img className="w-10 h-10 border-2 border-buffer rounded-full" alt="" />
                    <img className="w-10 h-10 border-2 border-buffer rounded-full" alt="" />
                    <img className="w-10 h-10 border-2 border-buffer rounded-full" alt="" />
                    <a className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-dark-strong border-2 border-buffer rounded-full" href="#">+99</a>
                </div>
            </div>
            <div className='mt-10'>
                <h4 className='text-black font-bold text-2xl'>Project Title {projectTitle}</h4>
                <p className='text-gray-700 font-light'>Deadline: {deadlineProject}</p>
                <p className='mt-2 text-slate-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat iste laudantium deleniti voluptas vitae debitis, at quas. Porro, iusto sunt.</p>
            </div>
            <div className='mt-5'>
                <div className='flex justify-between items-center mb-5 gap-4 p-4 rounded-2xl'
                    style={{ backgroundColor: colors[0 % colors.length] 
                    , borderBottom: `2px solid ${borderColors[0 % borderColors.length]}`
                    }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor =
                            hoverColors[0 % hoverColors.length])
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                            colors[0 % colors.length])
                        }>
                    <div>
                        <h5 className='text-black font-bold text-lg mb-3'>Task Title {taskTitle}</h5>
                        <div className='flex flex-row space-x-2 items-center'>
                            <span className="material-symbols-outlined text-orange-400">note_stack</span>
                            <p className='text-slate-700'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.{taskDesc}</p>
                        </div>
                        <div className='flex flex-row space-x-2 items-center'>
                            <span className="material-symbols-outlined text-orange-800">alarm</span>
                            <p className='text-slate-700'>Due: {deadlineTask}</p>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <span className="material-symbols-outlined text-[#F7C873]">check_circle</span>
                    </div>
                </div>
            </div>
        </div>
    );
}