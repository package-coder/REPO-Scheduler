import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EventModal from './EventModal';

interface Props extends React.PropsWithChildren{
  renderData: React.ReactElement
}

const drawerWidth = 250;

 const ClippedDrawer: React.FC<Props> = (props) => {
  const [modal, setModal] = React.useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: drawerWidth, 
            boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box 
          sx={{ 
            overflow: 'auto' 
          }}>
          <List>
            <ListItem disablePadding >
              <ListItemText sx={{ m: '1rem' }} primary={
                <Button variant="contained" onClick={() => setModal(true)} sx={{ width: '100%' }} startIcon={<AddOutlinedIcon />}>
                  New event
                </Button>
              } />
            </ListItem>
            <ListItem disablePadding >
              <ListItemText sx={{ m: '1rem' }}  primary={props.renderData}/>
            </ListItem>
          
            {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SearchIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))} */}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        {props.children}
      </Box>
      <EventModal visible={modal} onCancel={() => setModal(false)} />
    </Box>
  );
}


export default ClippedDrawer;