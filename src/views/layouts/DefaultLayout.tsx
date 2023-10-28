import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
import { Box } from "@mui/material";
import Noitification from "../components/NotificationBar";

const LayoutWapper = styled(Box)(
  () => `
    display: flex;
    flex-direction: column;
    width: 100vw;
    min-height: 100vh !important;
  `,
);

export function DefaultLayout(props: { children?: ReactNode }) {
  return (
    <LayoutWapper>
      <Noitification />
      <Header />
      <Box>{props.children}</Box>
      <Footer />
    </LayoutWapper>
  );
}
