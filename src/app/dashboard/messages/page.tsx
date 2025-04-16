import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import DashboardLayout from '../layout';
import MessageManagement from '@/components/dashboard/MessageManagement';

const MessagesPage = () => {
  return (
    <DashboardLayout title="Messages | Dashboard">
      <MessageManagement />
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin?callbackUrl=/dashboard/messages',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default MessagesPage;