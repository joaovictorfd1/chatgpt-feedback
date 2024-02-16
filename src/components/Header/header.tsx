import { Box, Typography } from "@mui/material";
import React from "react";

export const Header = () => {
  return (
    <Box component={'header'} sx={{ display: 'flex', justifyContent: 'center', flexDirection:'column', margin: '16px 16px' }}>
      <Box component={'div'}>
        <Typography
          component="h1"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          DocGPT Feedback
        </Typography>
      </Box>
      <Box component={'div'} margin={'10px 0px'}>
        <Typography component={'h2'}
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}>
            Welcome!
        </Typography>
      </Box>
    </Box>
  )
}