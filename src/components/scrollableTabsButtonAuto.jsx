import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';

export default function ScrollableTabsButtonAuto({ data, handleNavigate }) {
   // const name = data.map((item) => item.name);
   const id = data.map((item) => item.id);
   const [value, setValue] = React.useState(false);
   const handleChange = (event, newValue) => {
      setValue(newValue);
      handleNavigate(id[newValue]);
   };
   const params = useParams();
   React.useEffect(() => {
      if (params.genreId) {
         // console.log(params.genreId);
         let indexOfGenre = id.findIndex((item) => item == params.genreId);
         if (indexOfGenre > -1) {
            setValue(indexOfGenre);
         }
      }
   }, []);
   return (
      <Tabs
         value={value}
         onChange={handleChange}
         textColor='primary'
         indicatorColor='secondary'
         variant='scrollable'
         scrollButtons='auto'
         aria-label='scrollable auto tabs example'
      >
         {data?.map((item, index) => (
            <Tab
               value={index}
               label={item.name}
               key={item.id}
               sx={{ fontSize: '0.8em', color: 'white' }}
            />
         ))}
      </Tabs>
   );
}
