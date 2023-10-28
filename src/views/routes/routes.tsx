import { ReactNode, lazy } from "react";
import { Route, RouteProps } from "react-router-dom";
import { BASE_URL } from "./routesContants";

const HomePage = lazy(() => import("../pages/home/HomePage"));
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const VerticalLayout = lazy(() => import("../layouts/VerticalLayout"));
const DefaultLayout = lazy(() => import("../layouts/DefaultLayout"));

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
  {
    path: "login",
    element: getDefaultLayout(<LoginPage />),
    loader: undefined,
  },
];

export const getRoutes = (role?: string) => {
  const r = new Array<CustomRouteProps>();
  r.push(...routes);

  return r.map((p, i) => <Route key={i} {...p} />);
};
