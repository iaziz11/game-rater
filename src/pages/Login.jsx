// // src/components/Login.js
// import { useState, useContext, useEffect } from "react";
// import { TextField, Button, Box, Typography, Paper } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../contexts/AuthContext";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const navigate = useNavigate();
//   const { login, isUserLoggedIn } = useContext(AuthContext);

//   useEffect(() => {
//     if (isUserLoggedIn) {
//       navigate("/search");
//     }
//   }, [isUserLoggedIn, navigate]);

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   async function handleSubmit(e) {
//     e.preventDefault();
//     console.log("Login attempt:", formData);
//     login(formData.email, formData.password);
//   }

//   return (
//     <Box
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       minHeight="80vh"
//     >
//       <Paper elevation={3} sx={{ p: 4, width: 300 }}>
//         <Typography variant="h5" textAlign="center" mb={2}>
//           Log in to GameShelf
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             label="Email"
//             name="email"
//             type="email"
//             variant="outlined"
//             margin="normal"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             fullWidth
//             label="Password"
//             name="password"
//             type="password"
//             variant="outlined"
//             margin="normal"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
//             Login
//           </Button>
//         </form>
//       </Paper>
//     </Box>
//   );
// };

// export default Login;

import { useState, useContext, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();
  const { login, isUserLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isUserLoggedIn) navigate("/search");
  }, [isUserLoggedIn, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");

    const email = (formData.email || "").trim();
    const password = formData.password || "";

    if (!email || !password) {
      setFormError("Please enter your email and password.");
      return;
    }

    try {
      setSubmitting(true);
      await login(email, password);
    } catch (err) {
      setFormError(err?.message || "Could not log in. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Box sx={{ display: "grid", placeItems: "center", minHeight: "80vh" }}>
      <Paper
        variant="outlined"
        sx={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 3,
          p: { xs: 2.5, sm: 3 },
          boxShadow: "0 16px 40px rgba(0,0,0,0.06)",
          bgcolor: "background.paper",
        }}
      >
        <Stack spacing={2.25}>
          <Stack spacing={0.75} alignItems="center">
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2,
                display: "grid",
                placeItems: "center",
                bgcolor: "grey.100",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <SportsEsportsRoundedIcon />
            </Box>

            <Typography
              variant="h5"
              textAlign="center"
              sx={{ fontWeight: 1000, letterSpacing: "-0.02em" }}
            >
              Log in to GameShelf
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              Track what you’ve played, rate games, and organize lists.
            </Typography>
          </Stack>

          {formError && (
            <Alert severity="error" sx={{ borderRadius: 2 }}>
              {formError}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={1.5}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />

              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={submitting}
                sx={{ mt: 0.5, borderRadius: 2, fontWeight: 900, py: 1.1 }}
                startIcon={
                  submitting ? <CircularProgress size={18} /> : undefined
                }
              >
                {submitting ? "Logging in…" : "Login"}
              </Button>
            </Stack>
          </Box>

          <Divider />

          <Typography variant="body2" color="text.secondary" textAlign="center">
            Don’t have an account?{" "}
            <Box
              component={RouterLink}
              to="/register"
              sx={{
                fontWeight: 900,
                color: "text.primary",
                textDecoration: "none",
              }}
            >
              Create one
            </Box>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;
