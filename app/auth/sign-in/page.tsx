'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import logo from '../../img/Group 33.png';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SignIn() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleConnect = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
        body: JSON.stringify({ identifier, password }),
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
        setError(responseData.message || 'Invalid email or password');
        setLoading(false);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsLarge(window.innerWidth >= 1024);
    checkScreen(); 
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const clipPathValue = isLarge 
    ? 'ellipse(100% 80% at 100% 50%)' 
    : 'ellipse(80% 100% at 50% 100%)';

  const signInClipPath = isLarge
    ? 'ellipse(100% 100% at 0% 50%)'
    : undefined;
    
  return (
    <>
    {isSuccess && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-auto">
          <div className="flex justify-center items-center bg-white rounded-3xl border border-black text-black px-4 py-2">
            <span className="material-symbols-outlined text-green-600">check_circle</span>
            <a>Sign in successful!</a>
          </div>
        </div>
    )}

    {error && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-auto">
          <div className="flex justify-center items-center bg-white rounded-3xl border border-black text-black px-4 py-2">
            <span className="material-symbols-outlined text-red-600">error</span>
            {error}
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

    <Swiper
      key="main-swiper" 
      direction="vertical"
      slidesPerView={1}
      spaceBetween={0}
      className="h-screen bg-[#F7C873]"
      breakpoints={{
        1024: {
          direction: 'horizontal',
        },
      }}>

      <SwiperSlide>
        <div className="relative h-screen bg-white flex flex-col items-center justify-center overflow-hidden">

          <div className="z-10 flex flex-col items-center gap-4">
            <Image
              src={logo}
              alt="Merge Logo"
              width={140}
              height={140}
              priority
            />
          </div>
          
          <div 
            className="absolute bottom-0 lg:w-1/4 lg:h-full lg:right-0 w-full h-48 bg-[#F7C873] flex flex-col items-center justify-center pt-10"
            style={{ clipPath: clipPathValue }}>
            <span className="hidden lg:flex items-center gap-2 text-sm text-gray-600 font-medium">
              Swipe to continue
              <span className="material-symbols-outlined text-base">
                arrow_forward_ios
              </span>  
            </span>

            <svg
              className="lg:hidden w-6 h-6 text-gray-800 animate-bounce"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v13m0-13 4 4m-4-4-4 4"/>
            </svg>
            
            <span className="lg:hidden text-sm text-gray-600 font-medium">
              Swipe up to continue
            </span>
          </div>

        </div>
      </SwiperSlide>

      <SwiperSlide className='bg-white'>
        <div className='flex flex-col lg:flex-row h-full w-full'>

          <div className="lg:w-1/4 lg:h-full overflow-hidden">
            <div
              className="bg-[#F7C873] h-full rounded-b-[50px] lg:rounded-none mb-10 lg:mb-0 p-15 text-start text-black font-bold text-3xl"
              style={isLarge ? { clipPath: signInClipPath } : undefined}>
              <div className="lg:hidden p-10">
                <h2>Hay,</h2>
                <h4 className='mb-3'>Sign In Now</h4>
              </div>
            </div>
          </div>

          <div className="flex mt-10 lg:mt-0 lg:justify-center lg:items-center h-full w-full p-5">
            <form onSubmit={handleConnect} className="flex flex-col w-full p-5 max-w-sm mx-auto px-18 lg:px-0 mt-0">
              <div className='hidden lg:block text-start text-black font-bold text-4xl mb-10'>
                <h2>Hay,</h2>
                <h4>Sign In Now</h4>
              </div>
              <div className="mb-5 flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-600">person</span>
                <input value={identifier} 
                        onChange={(e) => setIdentifier(e.target.value)} 
                        type="text" 
                        id="email-alternative" 
                        className="autofill:shadow-[inset_0_0_0px_1000px_white] outline-none focus:outline-none focus:bg-white focus:border focus:border-black focus:rounded-2xl border-b border-b-black text-slate-800 text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 placeholder:text-body placeholder:text-slate-500" placeholder="Username or Email" required />
              </div>
              <div className="mb-5 flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-600">lock</span>
                <input value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        type="password" 
                        id="password-alternative" 
                        className="autofill:shadow-[inset_0_0_0px_1000px_white] outline-none focus:outline-none focus:bg-white focus:border focus:border-black focus:rounded-2xl border-b border-b-black text-slate-800 text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 placeholder:text-body placeholder:text-slate-500" placeholder="password" required />
              </div>
              <button className="mt-3 flex justify-center items-center text-white bg-black active:scale-95 transition-all duration-300 ease-out focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-lg w-full rounded-3xl px-4 py-2.5 focus:outline-none">
                Sign In
              </button>
              <div className="flex items-center my-6">
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
              <p className='text-black mt-3 text-[12px] flex justify-center'>Don't have an account? <Link href="sign-up" className='font-bold underline cursor-pointer'>Sign Up</Link></p>
            </form>
          </div>

        </div>

      </SwiperSlide>
    </Swiper>
    </>
  );
}
