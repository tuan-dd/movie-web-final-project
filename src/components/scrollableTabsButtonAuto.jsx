import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useParams } from 'react-router-dom';

export default function ScrollableTabsButtonAuto({ data, handleNavigate }) {
   const ids = data.map((item) => item.id);
   const [value, setValue] = React.useState(false);
   const handleChange = (event, newValue) => {
      setValue(newValue);
      handleNavigate(ids[newValue]);
   };
   const params = useParams();
   React.useEffect(() => {
      if (params.genreId) {
         let indexOfGenre = ids.findIndex(
            (item) => item === parseInt(params.genreId, 10),
         );
         if (indexOfGenre > -1) {
            setValue(indexOfGenre);
         }
      } else {
         setValue(false);
      }
   }, [params.genreId, ids]);

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
