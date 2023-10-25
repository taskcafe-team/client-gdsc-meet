'use client';
import { useAppSelector } from '@/hooks/redux.hook';
import { authDetail } from '@/redux/auth';
import { useRouter } from 'next/navigation';

const usePrivateRoute = () => {
  const auth = useAppSelector(authDetail);
  const router = useRouter();
  console.log(auth);
  
  if (!auth) {
    router.push('/signIn');
  }

  return auth;
};

export default usePrivateRoute;
