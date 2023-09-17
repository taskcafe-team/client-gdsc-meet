import { RootState } from '@/redux/store';

const userLoading = (state: RootState) => state.user.loading;
const meetDetail = (state: RootState) => state.user.payload;
