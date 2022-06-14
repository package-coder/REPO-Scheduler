import React from 'react';

import {
  Button,
  Box,
  Drawer,
  CssBaseline,
  Toolbar, 
  List,
  ListItemText,
  ListItem,
} from '@mui/material';

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
                <Button 
                  variant="contained" 
                  onClick={() => setModal(true)} 
                  sx={{ width: '100%' }} 
                  startIcon={<AddOutlinedIcon />}>
                    New event
                </Button>
              } />
            </ListItem>
            <ListItem disablePadding >
              <ListItemText sx={{ m: '1rem' }}  primary={props.renderData}/>
            </ListItem>
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