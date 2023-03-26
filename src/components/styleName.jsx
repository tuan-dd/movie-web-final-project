import React from 'react';
import { Typography, Box } from '@mui/material';
import { Link as LinkRouter } from 'react-router-dom';

function StyleName({ sx, disable = false, variant = 'h3' }) {
   const style = {
      display: 'inline-flex',
      color: '#ffd830',
      cursor: 'pointer',
      m: 2,
      // textShadow:
      //    '2px 0 0px #800040, 3px 2px 0px rgba(77,0,38,0.5), 3px 0 3px #FF002B, 5px 0 3px #800015, 6px 2px 3px rgba(77,0,13,0.5), 6px 0 9px #FF5500, 8px 0 9px #802A00, 9px 2px 9px rgba(77,25,0,0.5), 9px 0 18px #FFD500, 11px 0 18px #806A00, 12px 2px 18px rgba(77,66,0,0.5), 12px 0 30px #D4FF00, 14px 0 30px #6A8000, 15px 2px 30px rgba(64,77,0,0.5), 15px 0 45px #80FF00, 17px 0 45px #408000, 17px 2px 45px rgba(38,77,0,0.5)',
   };
   const text = (
      <Typography
         variant={variant}
         fontFamily='UseUrban'
         sx={{ ...style, ...sx }}
      >
         CINEMATREK
      </Typography>
   );
   if (disable) {
      return text;
   }
   return (
      <Typography
         component={LinkRouter}
         fontFamily='UseUrban'
         to='/'
         variant={variant}
         sx={{ ...style, ...sx }}
      >
         CINEMATREK
      </Typography>
   );
}

export default StyleName;
