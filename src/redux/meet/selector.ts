import { RootState } from "@/redux/store";

const meetLoading =  (state:RootState) => state.meet.loading
const meetDetail  =  (state:RootState) => state.meet.payload

