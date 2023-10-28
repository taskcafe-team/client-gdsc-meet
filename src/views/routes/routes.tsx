import { ReactNode, lazy } from "react";
import { Route, RouteProps } from "react-router-dom";

import { BASE_URL } from "./routesContants";
import { VerticalLayout, DefaultLayout } from "../layouts";
import { JSX } from "react/jsx-runtime";

const HomePage = lazy(() => import("../pages/home/HomePage"));

const getVerticalLayout = (e: ReactNode) => (
  <VerticalLayout>{e}</VerticalLayout>
);

const getDefaultLayout = (e: ReactNode) => <DefaultLayout>{e}</DefaultLayout>;

type CustomRouteProps = RouteProps;
const routes: CustomRouteProps[] = [
  {
    path: BASE_URL,
    element: getDefaultLayout(<HomePage />),
    loader: undefined,
  },
];

export const getRoutes = (role?: string): JSX.Element[] => {
  const r = new Array<CustomRouteProps>();
  r.push(...routes);

  return r.map((p, i) => <Route key={i} {...p} />);
};
