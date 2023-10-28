import React, { useLayoutEffect } from "react";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "src/contexts";

interface ToastProps {
  content: string;
  type?: "info" | "success" | "warning" | "error";
}

const toastConfig: ToastOptions = {
  position: "bottom-left",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const showToast = ({ content, type = "success" }: ToastProps) => {
  const toastType = toast[type] || toast.success;
  toastType(content, toastConfig);
};

export default function NotificationBar() {
  const noitifiactionState = useAppSelector((s) => s.noitificatioin.payload);
  useLayoutEffect(() => {
    if (!noitifiactionState.timestamp) return;
    showToast({ content: noitifiactionState.message });
  }, [noitifiactionState]);

  return (
    <React.Fragment>
      <ToastContainer />
    </React.Fragment>
  );
}
