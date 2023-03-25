/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Link as LinkUI } from '@mui/material';

export default function LinkRoute({ value, pathname = '' }) {
   return (
      <LinkUI component={Link} variant='body2' to={pathname}>
         {value}
      </LinkUI>
   );
}
