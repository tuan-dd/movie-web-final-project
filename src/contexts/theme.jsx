/* eslint-disable import/no-extraneous-dependencies */
import { deepmerge } from '@mui/utils';
import {
   experimental_extendTheme as extendMuiTheme,
   createTheme,
} from '@mui/material/styles';
import { extendTheme as extendJoyTheme } from '@mui/joy/styles';

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
export const theme = createTheme(themeOptions);

const muiTheme = extendMuiTheme(theme);
const joyTheme = extendJoyTheme({
   // This is required to point to `var(--mui-*)` because we are using
   // `CssVarsProvider` from Material UI.
   cssVarPrefix: 'mui',
   colorSchemes: {
      light: {
         palette: {
            primary: {
               // ...blue,
               solidColor: 'var(--mui-palette-primary-contrastText)',
               solidBg: 'var(--mui-palette-primary-main)',
               solidHoverBg: 'var(--mui-palette-primary-dark)',
               plainColor: 'var(--mui-palette-primary-main)',
               plainHoverBg:
                  'rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-hoverOpacity))',
               plainActiveBg:
                  'rgba(var(--mui-palette-primary-mainChannel) / 0.3)',
               outlinedBorder:
                  'rgba(var(--mui-palette-primary-mainChannel) / 0.5)',
               outlinedColor: 'var(--mui-palette-primary-main)',
               outlinedHoverBg:
                  'rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-hoverOpacity))',
               outlinedHoverBorder: 'var(--mui-palette-primary-main)',
               outlinedActiveBg:
                  'rgba(var(--mui-palette-primary-mainChannel) / 0.3)',
            },
            neutral: {
               // ...grey,
            },
            // Do the same for the `danger`, `info`, `success`, and `warning` palettes,
            divider: 'var(--mui-palette-divider)',
            text: {
               tertiary: 'rgba(0 0 0 / 0.56)',
            },
         },
      },
      // Do the same for dark mode
      // dark: { ... }
   },
   fontFamily: {
      display: '"Roboto","Helvetica","Arial",sans-serif',
      body: '"Roboto","Helvetica","Arial",sans-serif',
   },
   shadow: {
      xs: `var(--mui-shadowRing), ${muiTheme.shadows[1]}`,
      sm: `var(--mui-shadowRing), ${muiTheme.shadows[2]}`,
      md: `var(--mui-shadowRing), ${muiTheme.shadows[4]}`,
      lg: `var(--mui-shadowRing), ${muiTheme.shadows[8]}`,
      xl: `var(--mui-shadowRing), ${muiTheme.shadows[12]}`,
   },
});

// Note: you can't put `joyTheme` inside Material UI's `extendMuiTheme(joyTheme)`
// because some of the values in the Joy UI theme refers to CSS variables and
// not raw colors.
export const allTheme = deepmerge(joyTheme, muiTheme);
