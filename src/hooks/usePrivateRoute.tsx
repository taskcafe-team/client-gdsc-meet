import { useAppSelector } from '@/hooks/redux.hook';
import { authDetail } from '@/redux/auth';
import { useRouter } from 'next/navigation';

const usePrivateRoute = () => {
  const auth = useAppSelector(authDetail);
  const router = useRouter();

  if (!auth) {
    router.push('/');
  }

  return auth;
};

export default usePrivateRoute;
