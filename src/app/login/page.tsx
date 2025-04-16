"use client";

import { useEffect } from 'react';
import { signIn, getProviders } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import Layout from '@/components/layout/Layout';

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  useEffect(() => {
    const checkSession = async () => {
      const providers = await getProviders();
      if (!providers) {
        console.error('No providers configured');
      }
    };
    checkSession();
  }, []);

  const handleSignIn = (provider: string) => {
    signIn(provider, { callbackUrl });
  };

  return (
    <Layout title="Login">
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <div className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <button
                onClick={() => handleSignIn('github')}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <FaGithub className="h-5 w-5 text-gray-300 group-hover:text-gray-200" />
                </span>
                Sign in with GitHub
              </button>
            </div>
            <div className="rounded-md shadow-sm -space-y-px">
              <button
                onClick={() => handleSignIn('google')}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <FaGoogle className="h-5 w-5 text-gray-300 group-hover:text-gray-200" />
                </span>
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;