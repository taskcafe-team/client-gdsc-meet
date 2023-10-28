import React from "react";

type PropsType = {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | null
    | undefined;
};

export const VerticalLayout = (props: PropsType) => {
  return <React.Fragment>{props.children}</React.Fragment>;
};
