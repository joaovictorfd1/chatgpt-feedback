import { Box, Typography } from "@mui/material";
import React from "react";

export const Header = () => {
  return (
    <Box sx={{ display: 'flex', margin: '16px 16px' }}>
      <Typography
        component="h2"
        variant="h5"
        color="inherit"
        align="center"
        noWrap
        sx={{ flex: 1 }}
      >
        ChatGPT-Feedback
      </Typography>
    </Box>
  )
}