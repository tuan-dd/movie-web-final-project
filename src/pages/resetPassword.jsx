import React, { useState } from 'react';
import { FormProvider, FTextField } from '../components/form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Alert, Stack, Typography, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useAuth from '../hooks/useAuth';
import LinkRoute from '../components/link';
const LoginSchema = Yup.object().shape({
   changePassword: Yup.string().email('Must enter Email').required(),
});
const defaultValues = {
   changePassword: '',
};
const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 400,
   height: 300,
   backgroundColor: 'black',
   border: '2px solid #000',
   boxShadow: 24,
   p: 2,
   color: 'white',
   opacity: 0.8,
};
function ResetPassword({ setForgottenPassword }) {
   const [success, setSuccess] = useState(false);
   const { resetPass, errorMessage } = useAuth();
   const methods = useForm({
      resolver: yupResolver(LoginSchema),
      defaultValues,
   });
   const {
      handleSubmit,
      formState: { isSubmitting },
   } = methods;
   const onSubmit = async (data) => {
      const result = await resetPass(data.changePassword);
      if (result) console.log('run');
      {
         setSuccess((e) => !e);
         setTimeout(() => setForgottenPassword((e) => !e), 4000);
      }
   };
   return (
      <Box sx={style}>
         <Typography variant='h4' textAlign='center'>
            Rest Password
         </Typography>
         <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} mt={2}>
               {errorMessage && (
                  <Alert severity='error'>Account not valid</Alert>
               )}
               {success && (
                  <Alert severity='success'>
                     The link has been sent, please check your email, after 3
                     seconds come back to login
                  </Alert>
               )}
               <FTextField name='changePassword' label='Email' />
               <LoadingButton
                  size='large'
                  type='submit'
                  variant='contained'
                  loading={isSubmitting}
                  sx={{
                     display: 'flex',
                     m: '0 auto',
                  }}
               >
                  Submit
               </LoadingButton>
            </Stack>
         </FormProvider>
         <LinkRoute value={'Sign up for PhimHay.com'} pathname={'/signUp'} />
      </Box>
   );
}

export default ResetPassword;
