import { RootState } from "../store";

export const authLoading = (state: RootState) => state.auth.loading;
export const authDetail = (state: RootState) => state.auth.payload;