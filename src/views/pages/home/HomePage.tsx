import React, { useLayoutEffect } from "react";
import { authDetailFetch } from "../../../contexts/auth";
import { useDispatch } from "react-redux";

export default function HomePage() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(authDetailFetch());
  }, []);
  return <div>HomePage</div>;
}
