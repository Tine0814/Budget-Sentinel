import React from "react";
import { Box, Container, Typography, Link, Paper } from "@mui/material";
import { AtomButton, AttomTextField } from "@/components";
import { Control, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import { LoginFormType } from "@/core/Schema";
import { useAuth } from "@/core/context";

type Props = {
  control: Control<LoginFormType>;
  handleSubmit: UseFormHandleSubmit<LoginFormType>;
  onSubmit: SubmitHandler<LoginFormType>;
  isLoading: boolean;
};

export default function LoginForm({
  control,
  handleSubmit,
  onSubmit,
  isLoading,
}: Props) {
  const { user, logoutUser } = useAuth();

  return (
    <Container
      component="main"
      maxWidth="md"
      className="h-screen flex items-center flex-col justify-center"
    >
      <p className="dark:text-white">Name: {user?.name}</p>
      <p className="dark:text-white">Email: {user?.email}</p>
      <button onClick={logoutUser} className="dark:text-white">
        Logout
      </button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={0}
          sx={{ padding: 4, width: "100%" }}
          className="dark:bg-gray-800 dark:text-white"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography component="h1" variant="h5" className="dark:text-white">
              Sign in
            </Typography>
          </Box>
          <Box>
            <AttomTextField
              name="email"
              control={control}
              label="Email Address"
            />
            <AttomTextField
              name="password"
              control={control}
              label="Password"
              type="password"
            />
            <AtomButton
              type="submit"
              fullWidth
              variant="contained"
              label={isLoading ? "Signing In..." : "Sign In"}
              onClick={handleSubmit(onSubmit)}
              isLoading={isLoading}
              disabled={isLoading}
            />
          </Box>
        </Paper>
      </Box>
      <Typography variant="body2" className="dark:text-white">
        Dental POS ©{" "}
        <Link color="inherit" href="">
          J's Company
        </Link>
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Container>
  );
}
