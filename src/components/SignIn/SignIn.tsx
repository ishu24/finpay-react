import React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Illustration from "../../assets/signin-illustration.svg";

export default function SignIn() {
  return (
    <Box sx={{ width: 375, height: 812, bgcolor: "primary.main", p: 0 }}>
      <Box
        sx={{
          bgcolor: "background.default",
          borderRadius: "30px 30px 0 0",
          mt: 13.5,
          height: 704,
          p: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Welcome Back
        </Typography>
        <Typography
          variant="caption"
          display="block"
          sx={{ mt: 1, color: "text.primary" }}
        >
          Hello there, sign in to continue
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Box
            component="img"
            src={Illustration}
            alt="signin illustration"
            sx={{ width: 213, height: 165, borderRadius: 2 }}
          />
        </Box>

        <TextField
          fullWidth
          placeholder="Text input"
          sx={{ mt: 5, borderRadius: 2 }}
        />

        <TextField
          fullWidth
          placeholder="Password"
          type="password"
          sx={{ mt: 3, borderRadius: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <FingerprintIcon />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 4, borderRadius: 2 }}
          disabled
        >
          Sign in
        </Button>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Typography variant="body2">Don't have an account? </Typography>
          <Button variant="text">Sign Up</Button>
        </Box>

        <Typography variant="caption" sx={{ mt: 2, color: "text.secondary" }}>
          Forgot your password ?
        </Typography>
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 40,
          display: "flex",
          alignItems: "center",
          pl: 3,
        }}
      >
        <ArrowBackIosNewIcon sx={{ color: "common.white" }} />
        <Typography variant="h6" sx={{ color: "common.white", pl: 2 }}>
          Sign in
        </Typography>
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: 34,
          bgcolor: "background.default",
        }}
      />
    </Box>
  );
}
