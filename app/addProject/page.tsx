'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function AddProject() {
  const [projectTitle, setProjectTitle] = useState('');
  const [deadlineProject, setDeadlineProject] = useState('');
  const [contributors, setContributors] = useState<string[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [tempEmail, setTempEmail] = useState('');
  const colors = ["#AFC1E8", "#FFE1B8", "#CBCBCB", "#CFE6CF", "#F7C6D9"];
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

  const handleCreateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/create-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
        body: JSON.stringify({ projectTitle, deadlineProject }),
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
        setError(responseData.message || 'Project creation failed. Please try again.');
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
            <h4>Create New Project</h4>
          </div>
        </div>
      </div>

      <div className="flex mt-0 lg:justify-center lg:items-center h-full w-full">
          <form onSubmit={handleCreateProject} className="flex flex-col w-full p-5 max-w-sm mx-auto px-18 lg:px-0 mt-0">
              <div className='hidden lg:block text-start text-black font-bold text-3xl mb-10'>
                <h4>Create New Project</h4>
              </div>

              <div className="mb-5 space-y-4">
                <label className="text-sm font-medium text-black">Project Title</label>
                <input type="text" 
                        id="projectTitle" 
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        className="autofill:shadow-[inset_0_0_0px_1000px_white] outline-none focus:outline-none focus:bg-white focus:border focus:border-black border border-black rounded-3xl text-slate-800 text-sm focus:ring-brand focus:border-brand block w-full px-3 py-2.5 placeholder:text-body placeholder:text-slate-500" placeholder="Project Title" required />
              </div>
              <div className="mb-5">
                <label className="mb-4 text-sm font-medium text-black">Deadline</label>
                <input type="date" 
                        id="deadlineProject" 
                        value={deadlineProject}
                        onChange={(e) => setDeadlineProject(e.target.value)}
                        className="autofill:shadow-[inset_0_0_0px_1000px_white] outline-none focus:outline-none focus:bg-white focus:border focus:border-black border border-black rounded-3xl text-slate-800 text-sm focus:ring-brand focus:border-brand block w-full px-3 py-2.5 placeholder:text-body placeholder:text-slate-500" required />
              </div>
              <div className="mb-5">
                <div className="mb-5 text-sm font-medium text-black flex justify-between items-center">
                  Invite Contributors
                  {contributors.length > 0 && (
                    <span className="text-xs text-slate-500">{contributors.length} invited</span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-4 rtl:space-x-reverse">
                    {contributors.slice(0, 5).map((email, i) => (
                      <div 
                        key={i} 
                        title={email}
                        className="w-10 h-10 border-2 rounded-full bg-slate-200 text-black flex items-center justify-center text-[10px] overflow-hidden"
                        style={{ backgroundColor: colors[i % colors.length] }}>
                        {email.substring(0, 2).toUpperCase()}
                      </div>
                    ))}
                    
                    <button 
                      type="button"
                      onClick={() => setShowInput(!showInput)}
                      className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-black border-2 border-white rounded-full hover:bg-slate-800 transition-colors"
                    >
                      {showInput ? <span className="material-symbols-outlined text-sm">close</span> : `+${contributors.length > 5 ? contributors.length - 5 : ''}`}
                    </button>
                  </div>
                </div>

                {showInput && (
                  <div className="mt-3 flex gap-2">
                    <input 
                      type="email"
                      value={tempEmail}
                      onChange={(e) => setTempEmail(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (tempEmail.includes('@')) {
                            setContributors([...contributors, tempEmail]);
                            setTempEmail('');
                            setShowInput(false);
                          }
                        }
                      }}
                      placeholder="Enter email..."
                      className="flex-1 border border-black rounded-3xl px-3 py-1.5 text-sm text-slate-800 outline-none"
                      autoFocus
                    />
                  </div>
                )}
              </div>

              <button type="submit" 
                      className="mt-10 flex justify-center items-center text-white bg-black active:scale-95 transition-all duration-300 ease-out shadow-xs font-medium leading-5 rounded-base text-lg w-full rounded-3xl px-4 py-2.5 focus:outline-none">
                Create & Invite
              </button>
          </form>
      </div>
    </div>
    );
}
