import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import DashboardLayout from '../layout';
import BlogManagement from '@/components/dashboard/BlogManagement';


const BlogsPage = () => {
  return (
    <DashboardLayout title="Blog Posts | Dashboard">
      <BlogManagement />
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin?callbackUrl=/dashboard/blogs',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default BlogsPage;