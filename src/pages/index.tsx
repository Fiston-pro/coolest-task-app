import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { userStore } from '../store';
import router from 'next/router';

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };

  const handleSignupClick = () => {
    setIsSignupOpen(true);
  };

  const handleClose = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
  };

  const handleLogin = async (event: any) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    await userStore.getState().loginUser(email, password);
    router.push('/dashboard');
  };

  const handleSignup = async (event: any) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    await userStore.getState().createUser( email, password);
    router.push('/dashboard');
  };



  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Welcome to a To Do App</h1>
      <div className="flex space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleLoginClick}
        >
          Login
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleSignupClick}
        >
          Signup
        </button>
      </div>
      <Dialog open={isLoginOpen || isSignupOpen} onClose={handleClose}>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg">
          <Dialog.Title className="text-lg font-medium text-gray-800 mb-4">
            {isLoginOpen ? 'Login' : 'Signup'}
          </Dialog.Title>
          <Dialog.Description className="text-sm text-gray-500 mb-4">
            {isLoginOpen ? 'Enter your credentials to login' : 'Enter your details to signup'}
          </Dialog.Description>
          {isLoginOpen ? (
            <form className=' w-56 md:w-96' onSubmit={handleLogin}>
              <div className=" mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="border-gray-300 p-2 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="border-gray-300 p-2 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500  hover:bg-blue-600 text-whitepx-4 p-2 rounded"
                >
                Login
                </button>
                </form>
                ) : (
                <form className='w-56 md:w-96' onSubmit={handleSignup}>
                <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
                </label>
                <input
                               type="email"
                               id="email"
                               name="email"
                               className="border-gray-300 focus:ring-blue-500 p-2 focus:border-blue-500 block w-full rounded-md sm:text-sm"
                             />
                </div>
                <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
                </label>
                <input
                               type="password"
                               id="password"
                               name="password"
                               className="border-gray-300 focus:ring-blue-500 p-2 focus:border-blue-500 block w-full rounded-md sm:text-sm"
                             />
                </div>
                <button
                             type="submit"
                             className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                           >
                Signup
                </button>
                </form>
                )}
                </div>
                </Dialog>
                </div>
                );
                }
