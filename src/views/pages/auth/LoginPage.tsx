import React from "react";
import AuthWrapper from "./AuthWrapper";
import { Box, Grid, Stack, Typography } from "@mui/material";
import LoginForm from "./forms/LoginForm";

export default function LoginPage() {
  return (
    <AuthWrapper>
      <Box width={1} height={1}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
            >
              <Typography variant="h4" style={{ fontWeight: "bold" }}>
                Login
              </Typography>
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
            <LoginForm />
          </Grid>
        </Grid>
      </Box>
    </AuthWrapper>
  );
}
