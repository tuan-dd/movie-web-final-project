import { createTheme } from '@mui/material/styles';
const PRIMARY = {
   lighter: '#FFD07F',
   light: '#FDA65D',
   main: '#FF8243',
   dark: '#E26A2C',
   darker: '#cc571f',
   contrastText: '#FFF',
   red: '#e50914',
};
const SECONDARY = {
   lighter: '#D6E4FF',
   light: '#84A9FF',
   main: '#3366FF',
   dark: '#1939B7',
   darker: '#091A7A',
   contrastText: '#FFF',
};
const SUCCESS = {
   lighter: '#E9FCD4',
   light: '#AAF27F',
   main: '#54D62C',
   dark: '#229A16',
   darker: '#08660D',
   contrastText: '#FFF',
};
const themeOptions = {
   palette: {
      primary: PRIMARY,
      secondary: SECONDARY,
      success: SUCCESS,
   },
   shape: { borderRadius: 8 },
};
const theme = createTheme(themeOptions);

export default theme;
