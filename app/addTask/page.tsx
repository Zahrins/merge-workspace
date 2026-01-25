'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function AddProject() {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [deadline, setDeadline] = useState('');
  const [isLarge, setIsLarge] = useState(false);
  useEffect(() => {
    const checkScreen = () => setIsLarge(window.innerWidth >= 1024);
    checkScreen(); 
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const signInClipPath = isLarge
    ? 'ellipse(100% 100% at 0% 50%)'
    : undefined;

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/create-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
        body: JSON.stringify({ taskTitle, taskDesc, assignTo, deadline }),
      });
      const responseData = await response.json(); 
      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          router.push('/dashboard');
          setLoading(false);
        }, 3000);
      } else {
        setError(responseData.message || 'Task creation failed. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col lg:flex-row h-screen w-full bg-white'>

      {isSuccess && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-auto">
          <div className="flex justify-center items-center bg-white rounded-3xl border border-black text-black px-4 py-2">
            <span className="material-symbols-outlined text-green-600">check_circle</span>
            <a>Sign up successful!</a>
          </div>
        </div>
      )}
      {loading && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-auto">
          <div className="flex justify-center items-center bg-white rounded-3xl border border-black text-black px-4 py-2">
            <span className="material-symbols-outlined text-yellow-600">hourglass_bottom</span>
            <a>Signing in...</a>
          </div>
        </div>
      )}
      {error && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-auto">
          <div className="flex justify-center items-center bg-white rounded-3xl border border-black text-black px-4 py-2">
            <span className="material-symbols-outlined text-red-600">error</span>
            <a>{error}</a>
          </div>
        </div>
      )}

      <div className="lg:w-1/4 lg:h-full overflow-hidden mb-5">
        <div
          className="bg-[#F7C873] h-full rounded-b-[50px] lg:rounded-none mb-5 lg:mb-0 p-15 text-start text-black font-bold text-3xl"
          style={isLarge ? { clipPath: signInClipPath } : undefined}>
          <div className="lg:hidden">
            <h4>Create New Task</h4>
          </div>
        </div>
      </div>

      <div className="flex mt-0 lg:justify-center lg:items-center h-full w-full">
          <form onSubmit={handleCreateTask} className="flex flex-col w-full p-5 max-w-sm mx-auto px-18 lg:px-0 mt-0">
              <div className='hidden lg:block text-start text-black font-bold text-3xl mb-10'>
                <h4>Create New Task</h4>
              </div>

              <div className="mb-5 space-y-4">
                <label className="text-sm font-medium text-black">Task Title</label>
                <input type="text" 
                        id="projectTitle" 
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        className="autofill:shadow-[inset_0_0_0px_1000px_white] outline-none focus:outline-none focus:bg-white focus:border focus:border-black border border-black rounded-3xl text-slate-800 text-sm focus:ring-brand focus:border-brand block w-full px-3 py-2.5 placeholder:text-body placeholder:text-slate-500" required />
              </div>
              <div className="mb-5 space-y-4">
                <label className="text-sm font-medium text-black">Task Description</label>
                <input type="text" 
                        id="projectTitle" 
                        value={taskDesc}
                        onChange={(e) => setTaskDesc(e.target.value)}
                        className="autofill:shadow-[inset_0_0_0px_1000px_white] outline-none focus:outline-none focus:bg-white focus:border focus:border-black border border-black rounded-3xl text-slate-800 text-sm focus:ring-brand focus:border-brand block w-full px-3 py-2.5 placeholder:text-body placeholder:text-slate-500" required />
              </div>
              <div className="mb-5 space-y-4">
                <label className="text-sm font-medium text-black">Assign To</label>
                <input type="text" 
                        id="dropdownDefaultButton" data-dropdown-toggle="dropdown" 
                        value={assignTo}
                        onChange={(e) => setAssignTo(e.target.value)}
                        className="autofill:shadow-[inset_0_0_0px_1000px_white] outline-none focus:outline-none focus:bg-white focus:border focus:border-black border border-black rounded-3xl text-slate-800 text-sm focus:ring-brand focus:border-brand block w-full px-3 py-2.5 placeholder:text-body placeholder:text-slate-500" required />
                <div id="dropdown" className="z-10 hidden bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44">
                    <ul className="p-2 text-sm text-body font-medium" aria-labelledby="dropdownDefaultButton">
                    <li>
                        <a href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Dashboard</a>
                    </li>
                    </ul>
                </div>
              </div>
              <div className="mb-5">
                <label className="mb-4 text-sm font-medium text-black">Deadline</label>
                <input type="date" 
                        id="deadline" 
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="autofill:shadow-[inset_0_0_0px_1000px_white] outline-none focus:outline-none focus:bg-white focus:border focus:border-black border border-black rounded-3xl text-slate-800 text-sm focus:ring-brand focus:border-brand block w-full px-3 py-2.5 placeholder:text-body placeholder:text-slate-500" required />
              </div>

              <button type="submit" 
                      className="mt-10 flex justify-center items-center text-white bg-black active:scale-95 transition-all duration-300 ease-out focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-lg w-full rounded-3xl px-4 py-2.5 focus:outline-none">
                Save
              </button>
          </form>
      </div>
    </div>
    );
}
