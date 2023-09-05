import { RootState } from '@/redux/store';

const authLoading = (state: RootState) => state.auth.loading;
const authDetail = (state: RootState) => state.auth.isLogin;
