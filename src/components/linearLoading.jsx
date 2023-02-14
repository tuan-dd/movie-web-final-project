import * as React from 'react';
import Stack from '@mui/joy/Stack';
import LinearProgress from '@mui/joy/LinearProgress';

export default function LinearLoading({ progress }) {
   
   return (
      <Stack spacing={2} sx={{ flex: 1 }}>
         <LinearProgress determinate value={progress} thickness={10} />
      </Stack>
   );
}
