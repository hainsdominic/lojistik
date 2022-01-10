import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createClient, Provider } from 'urql';

import CreateItemCard from './components/CreateItemCard';
import UpdateItemCard from './components/UpdateItemCard';
import ListItemsCard from './components/ListItemsCard';
import FindItemCard from './components/FindItemCard';
import DeleteItemCard from './components/DeleteItemCard';

// Urql GraphQL client setup
const client = createClient({
  url: 'http://localhost:8000/graphql',
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Provider value={client}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Create Item" {...a11yProps(0)} />
            <Tab label="Update Item" {...a11yProps(1)} />
            <Tab label="List Items" {...a11yProps(2)} />
            <Tab label="Find Item" {...a11yProps(3)} />
            <Tab label="Delete Item" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <CreateItemCard />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UpdateItemCard />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ListItemsCard />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <FindItemCard />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <DeleteItemCard />
        </TabPanel>
      </Box>
    </Provider>
  );
}
