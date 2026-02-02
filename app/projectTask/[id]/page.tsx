'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Task = {
  taskId: string;
  taskTitle: string;
  taskDesc: string;
  taskDeadline: string;
};

type ProjectData = {
  projectTitle: string;
  deadlineProject: string;
  tasks: Task[];
};

export default function ProjectTaskPage(
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const [project, setProject] = useState<ProjectData | null>(null);

  useEffect(() => {
    fetch(`/api/projectTaskData?projectId=${params.id}`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setProject(data));
  }, [params.id]);

  const [collaborators, setCollaborators] = useState<string[]>([]);

  useEffect(() => {
    fetch(`/api/projectCollaborators?projectId=${params.id}`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setCollaborators(data.collaborators));
  }, [params.id]);
  
  const colors = ["#F4F6FB", "#FFF5E9", "#FFFFFF", "#F3FAF5", "#FDF0F5"];
  const hoverColors = ["#AFC1E8", "#FFE1B8", "#CBCBCB", "#CFE6CF", "#F7C6D9"];
  const borderColors = ["#AFC1E8", "#FFE1B8", "#CBCBCB", "#CFE6CF", "#F7C6D9"];

  if (!project) {
    return <p className="p-10">Loading...</p>;
  }

  return (
    <div className="bg-white min-h-screen w-full p-10">

      <Link href={`/addTask?projectId=${params.id}`}>
        <button className="fixed bottom-10 right-10 bg-black text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 z-50">
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </Link>

      <div className="flex flex-row justify-between items-center">
        <Link href="/dashboard">
          <button className="text-white bg-black hover:bg-slate-700 rounded-full w-10 h-10 flex items-center justify-center">
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
        </Link>

        <div className="flex items-center space-x-2">
          <div className="flex -space-x-4 rtl:space-x-reverse">
            {collaborators.slice(0, 5).map((email, i) => (
              <div 
                key={i} 
                title={email}
                className="w-10 h-10 border-2 rounded-full bg-slate-200 text-black flex items-center justify-center text-[10px] overflow-hidden"
                style={{ backgroundColor: colors[i % colors.length] }}>
                  {email.substring(0, 2).toUpperCase()}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h4 className="text-black font-bold text-2xl">
          Project Title {project.projectTitle}
        </h4>
        <p className="text-gray-700 font-light">
          Deadline: {project.deadlineProject}
        </p>
      </div>

      {project.tasks.length === 0 ? (
        <div className='flex flex-col justify-center items-center lg:mt-20 mt-4 space-y-4'>
          <span className="material-symbols-outlined"
                  style={{ fontSize: '60px' }}>
              folder_open
          </span>
          <p className='text-slate-600 flex justify-center'>No task found. Create a new task to get started!</p>
        </div>
      ) : (
        <>
          <div className="mt-6 space-y-4">
          {project.tasks.map((task, index) => (
            <div
              key={task.taskId}
              className="flex justify-between items-center gap-4 p-4 rounded-2xl transition-all"
              style={{
                backgroundColor: colors[index % colors.length],
                borderBottom: `2px solid ${borderColors[index % borderColors.length]}`,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  hoverColors[index % hoverColors.length])
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  colors[index % colors.length])
              }
            >
            <div>
              <h5 className="text-black font-bold text-lg mb-3">
                  Task Title {task.taskTitle}
              </h5>

              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-400">
                    note_stack
                </span>
                <p className="text-slate-700">{task.taskDesc}</p>
              </div>

              <div className="flex items-center gap-2 mt-1">
                <span className="material-symbols-outlined text-orange-800">
                    alarm
                </span>
                <p className="text-slate-700">
                  Due: {task.taskDeadline}
                </p>
              </div>
            </div>

            <span className="material-symbols-outlined text-[#F7C873] text-3xl">
              check_circle
            </span>
            </div>
          ))}
          </div>
        </>
      )}

    </div>
  );
}
