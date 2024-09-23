import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Container, Button } from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';

function AppBarComponent({onClickMenuButton, pages}) {

  return (
    <>
      <AppBar position="static" color="primary">
        <Container maxWidth="xl" sx={{ml:0}}>
          <Toolbar disableGutters>
            <EventNoteIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                letterSpacing: '.1rem'
              }}
            >RUM Lab</Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => onClickMenuButton(page)}
                  sx={{ my: 2, color: 'inherit', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default AppBarComponent;