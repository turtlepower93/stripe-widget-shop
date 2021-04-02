import { useState } from "react";
import { Box, Button, Container, Typography } from "@material-ui/core";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
// import "./AuthPage.css";

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <main id="AuthPage">
      <Container maxWidth="lg">
        <Typography align="center" variant="h1">
          Wicked Widgets
        </Typography>
        <Container maxWidth="sm">
          {showLogin ? (
            <LoginForm setUser={setUser} />
          ) : (
            <SignUpForm setUser={setUser} />
          )}
          <Box display="flex" justifyContent="center">
          <Button
            color="secondary"
            onClick={() => setShowLogin(!showLogin)}
            id="signUp"
          >
            {showLogin ? "SIGN UP?" : "LOG IN?"}
          </Button>
          </Box>
        </Container>
      </Container>
    </main>
  );
}