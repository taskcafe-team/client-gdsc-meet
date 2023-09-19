import { RootState } from '@/redux/store';

export const userLoading = (state: RootState) => state.user.loading;
export const userDetail = (state: RootState) => state.user.payload;
