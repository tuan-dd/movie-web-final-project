/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Link as LinkRouter } from 'react-router-dom';
import { Box, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function Notification({ isAlertShow, setIsAlertShow }) {
   const text = isAlertShow.isLogin
      ? 'you must login to save your movie'
      : 'you must verifier to save your movie, go to Profile to verifier ';
   function handleClose() {
      setIsAlertShow((e) => ({ ...e, value: false }));
   }

   return (
      <>
         <Dialog
            open={isAlertShow.value}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
         >
            <Stack flexDirection='column' width={400}>
               <IconButton
                  sx={{ position: 'absolute', top: 0, right: 0, zIndex: 20 }}
                  onClick={handleClose}
               >
                  <CloseIcon fontSize='large' />
               </IconButton>
               <DialogTitle id='alert-dialog-title'>{text}</DialogTitle>
               <DialogActions>
                  <Button component={LinkRouter} to='/login'>
                     Login
                  </Button>
                  <Button component={LinkRouter} to='/signin'>
                     sign in
                  </Button>
               </DialogActions>
            </Stack>
         </Dialog>
      </>
   );
}
