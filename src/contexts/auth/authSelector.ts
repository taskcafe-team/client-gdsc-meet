import { RootState } from 'contexts/store'

export const authLoading = (state: RootState) => state.auth.loading
export const authDetail = (state: RootState) => state.auth.isLogin
export const authError = (state: RootState) => state.auth.error
