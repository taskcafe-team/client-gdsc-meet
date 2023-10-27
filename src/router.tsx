import { lazy, useLayoutEffect } from "react";
import { Route, RouteProps, Routes } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "./contexts/hooks";

const HomePage = lazy(() => import("./views/pages/home/HomePage"));

type CustomRouteProps = RouteProps & { name: string };
const adminRoutes: CustomRouteProps[] = [
  {
    name: "homepage",
    path: "/",
    element: <HomePage />,
    loader: undefined,
  },
];

const userRoutes: CustomRouteProps[] = [
  {
    name: "homepage",
    path: "/",
    element: <HomePage />,
    loader: undefined,
  },
];

export const getRoutes = (role?: string): JSX.Element[] => {
  const r = new Array<CustomRouteProps>();
  switch (role) {
    case "admin":
      r.push(...adminRoutes);
      break;
    case "user":
      r.push(...userRoutes);
      break;
    default:
      r.push(...userRoutes);
  }

  return r.map((r, i) => <Route key={i} {...r} />);
};

export const Router = () => {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.auth.payload.isLogin);

  useLayoutEffect(() => {});

  return <Routes>{getRoutes()}</Routes>;
};
