import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');

  const showSnackbar = (text, type = 'info') => {
    setMessage(text);
    setSeverity(type);
    setOpen(true);
  };

  const closeSnackbar = () => {
    setOpen(false);
  };

  const SnackbarComponent = (
    <Snackbar open={open} autoHideDuration={6000} onClose={closeSnackbar}>
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={closeSnackbar}
        severity={severity}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );

  return { showSnackbar, SnackbarComponent };
};