import React from "react";
import AuthWrapper from "./AuthWrapper";
import { Box, Grid, Stack, Typography } from "@mui/material";
import AuthLogin from "./forms/AuthForms";

export default function LoginPage() {
  return (
    <Box width={1} height={1}>
      <Grid container spacing={3} height={"100%"}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
            <Typography variant="h3">Login</Typography>
            <Typography
              variant="body1"
              sx={{ textDecoration: "none" }}
              color="primary"
            >
              Don&apos;t have an account?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin />
        </Grid>
      </Grid>
    </Box>
  );
}
