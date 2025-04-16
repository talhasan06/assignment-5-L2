import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { getSession, signIn, getProviders } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import Layout from '@/components/layout/Layout';

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

interface LoginProps {
  providers: Record<string, Provider>;
}

const Login = ({ providers }: LoginProps) => {
  const router = useRouter();
  const { callbackUrl } = router.query;
  
  const handleSignIn = (providerId: string) => {
    signIn(providerId, { callbackUrl: callbackUrl as string || '/dashboard' });
  };
  
  return (
    <Layout
      title="Login | Dashboard"
      description="Login to access the dashboard and manage your portfolio content."
    >
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Dashboard Login</h1>
            <p className="text-gray-600 mt-2">Sign in to manage your portfolio content</p>
          </div>
          
          <div className="space-y-4">
            {Object.values(providers).map((provider) => {
              // Render the appropriate icon based on provider ID
              let ProviderIcon;
              switch (provider.id) {
                case 'github':
                  ProviderIcon = FaGithub;
                  break;
                case 'google':
                  ProviderIcon = FaGoogle;
                  break;
                default:
                  ProviderIcon = null;
                  break;
              }
              
              return (
                <button
                  key={provider.id}
                  onClick={() => handleSignIn(provider.id)}
                  className="flex items-center justify-center w-full px-4 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  {ProviderIcon && <ProviderIcon className="mr-2" />}
                  Sign in with {provider.name}
                </button>
              );
            })}
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-600 text-sm">
            <p>This is a protected area. You must be logged in to access the dashboard.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  
  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }
  
  const providers = await getProviders();
  
  return {
    props: { providers: providers ?? {} },
  };
};

export default Login;