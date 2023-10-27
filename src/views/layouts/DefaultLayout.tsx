import React, { ReactNode } from "react";

export default function DefaultLayout(props: { children?: ReactNode }) {
  return <React.Fragment>Header{props.children}Foolter</React.Fragment>;
}
