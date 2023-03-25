import { useEffect } from 'react';
import { useNavigation, useLocation } from 'react-router-dom';

export default function NavigationListener() {
   const { pathname } = useLocation();

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [pathname]);

   return null;
}
