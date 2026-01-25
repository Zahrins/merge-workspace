'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function SignUp() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleConnect = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
        body: JSON.stringify({ name, username, email, password }),
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
        setError(responseData.message || 'Sign up failed. Please try again.');
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

      <div className="lg:w-1/4 lg:h-full overflow-hidden">
        <div
          className="bg-[#F7C873] h-full rounded-b-[50px] lg:rounded-none mb-5 lg:mb-0 p-15 text-start text-black font-bold text-3xl"
          style={isLarge ? { clipPath: signInClipPath } : undefined}>
          <div className="lg:hidden">
            <h2>Hay,</h2>
            <h4>Sign Up Now</h4>
          </div>
        </div>
      </div>

      <div className="flex mt-0 lg:justify-center lg:items-center h-full w-full">
          <form onSubmit={handleConnect} className="flex flex-col w-full p-5 max-w-sm mx-auto px-18 lg:px-0 mt-0">
              <div className='hidden lg:block text-start text-black font-bold text-3xl mb-10'>
                <h2>Hay,</h2>
                <h4>Sign Up Now</h4>
              </div>
              <div className="mb-5 flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-600">person</span>
                <input type="text" 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="autofill:shadow-[inset_0_0_0px_1000px_white] outline-none focus:outline-none focus:bg-white focus:border focus:border-black focus:rounded-2xl border-b border-b-black text-slate-800 text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 placeholder:text-body placeholder:text-slate-500" placeholder="Name" required />
              </div>
              <div className="mb-5 flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-600">account_circle</span>
                <input type="text" 
                        id="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        className="autofill:shadow-[inset_0_0_0px_1000px_white] outline-none focus:outline-none focus:bg-white focus:border focus:border-black focus:rounded-2xl border-b border-b-black text-slate-800 text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 placeholder:text-body placeholder:text-slate-500" placeholder="Username" required />
              </div>
              <div className="mb-5 flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-600">mail</span>
                <input type="email" 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="autofill:shadow-[inset_0_0_0px_1000px_white] outline-none focus:outline-none focus:bg-white focus:border focus:border-black focus:rounded-2xl border-b border-b-black text-slate-800 text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 placeholder:text-body placeholder:text-slate-500" placeholder="Email" required />
              </div>
              <div className="mb-5 flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-600">lock</span>
                <input type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="autofill:shadow-[inset_0_0_0px_1000px_white] outline-none focus:outline-none focus:bg-white focus:border focus:border-black focus:rounded-2xl border-b border-b-black text-slate-800 text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 placeholder:text-body placeholder:text-slate-500" placeholder="password" required />
              </div>
              <div className="flex items-start mb-5">
                <label className="flex items-center h-5 mt-1">
                  <input id="remember-alternative" 
                          type="checkbox" 
                          value="" 
                          className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft" required />
                  <p className="ms-2 text-[12px] font-medium text-heading select-none text-slate-800">I agree with the <a href="#" className="text-fg-brand hover:underline">terms and conditions</a>.</p>
                </label>
              </div>
              <button type="submit" 
                      className="mt-3 flex justify-center items-center text-white bg-black active:scale-95 transition-all duration-300 ease-out focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-lg w-full rounded-3xl px-4 py-2.5 focus:outline-none">
                Sign Up
              </button>
              <div className="flex items-center my-6 lg:my-3">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="mx-4 text-gray-600 text-sm font-medium">
                  Or With
                </span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>
              <button type="button" 
                      className="inline-flex items-center justify-center py-1.5 bg-black text-white rounded-lg shadow-md transition duration-150 ease-in-out">
                      <img src="https://img.icons8.com/color/48/google-logo.png"
                          alt="Google Logo" className="w-5 h-5 mr-3"/>
                      Continue with Google
              </button>
          </form>
        </div>
      </div>
    );
}
