import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@mui/material";

import AuthCard from "./AuthCard";
import AuthBackground from "assets/images/AuthBackground";

// import Logo from "components/Logo";
// import AuthFooter from "components/cards/AuthFooter";
// import AuthBackground from "assets/images/auth/AuthBackground";

export default function AuthWrapper({ children }: { children: ReactNode }) {
  return (
    <Box width={1} height={1}>
      <AuthBackground />
      <Grid container direction="column" justifyContent="flex-end">
        <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
          {/* <Logo /> */}
        </Grid>
        <Grid item xs={12}>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              minHeight: {
                xs: "500px",
                md: "800px",
              },
            }}
          >
            <Grid item>
              <AuthCard>{children}</AuthCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}></Grid>
      </Grid>
    </Box>
  );
}

AuthWrapper.propTypes = {
  children: PropTypes.node,
};
