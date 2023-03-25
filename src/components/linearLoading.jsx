import * as React from 'react';
import Stack from '@mui/joy/Stack';
import LinearProgress from '@mui/joy/LinearProgress';

export default function LinearLoading({ progress }) {
   return (
      <>
         <LinearProgress determinate value={progress} thickness={10} />
      </>
   );
}
