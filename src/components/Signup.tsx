'use client';
import Link from 'next/link';
import useAuth from '@/context/useAuth';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import appwriteService from '@/appwrite/appwrite';

const Signup = () => {
  const { setAuthStatus } = useAuth();
  const router = useRouter();

  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const createUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = await appwriteService.createUserAccount(formData);
      if (userData) {
        setAuthStatus(true);
        router.push('/profile');
      }
    } catch (error: any) {
      console.log('createUserError', error.message);
      setError(error.message);
    }
  };

  return (
    <>
      <div className='flex items-center justify-center'>
        <div className='mx-auto w-full max-w-lg bg-gray-200/50 rounded-xl p-10'>
          <div className='flex mb-2 justify-center'>
            <span className='inline-block w-full max-w-[60px]'>
              <img
                src='/favicon.ico'
                alt='Logo'
              />
            </span>
          </div>
          <h2 className='text-center text-2xl font-bold leading-tight text-black'>
            Sign up to create account
          </h2>
          <p className='mt-2 text-center text-base text-gray-600'>
            Already hav an account?
            <Link
              href='/login'
              className='font-medium text-primary transition-all duration-200 hover:underline'
            >
              Sign In
            </Link>
          </p>
          {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
          <form
            onSubmit={createUser}
            className='mt-8'
          >
            <div className='space-y-5'>
              <div>
                <label
                  htmlFor='name'
                  className='text-base font-medium text-gray-900'
                >
                  Full Name
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:right-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                    placeholder='Full Name'
                    id='name'
                    value={formData.name}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        name: e.target.value
                      }));
                    }}
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='text-base font-medium text-gray-900'
                >
                  Email address
                </label>
                <div className='mt-2'>
                  <input
                    type='email'
                    className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:right-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                    placeholder='Email'
                    id='email'
                    value={formData.name}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        emails: e.target.value
                      }));
                    }}
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='text-base font-medium text-gray-900'
                >
                  Email address
                </label>
                <div className='mt-2'>
                  <input
                    type='password'
                    className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:right-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                    placeholder='Password'
                    id='password'
                    value={formData.name}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        password: e.target.value
                      }));
                    }}
                    required
                  />
                </div>
              </div>
              <div>
                <button
                  type='submit'
                  className='inline-flex w-full items-center justify-center rounded-md bg-primary px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-primary/80'
                >
                  Create Account
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
