import { RootState } from "@/redux/store";

export const meetLoading =  (state:RootState) => state.meet.loading
export const meetDetail  =  (state:RootState) => state.meet.payload

