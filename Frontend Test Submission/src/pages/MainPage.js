import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import InputForm from '../components/InputForm';
import LinkItem from '../components/LinkItem';
import { getAllLinks } from '../utils/LinkData';
import { Log } from '../utils/LogUtil';

export default function MainPage() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    setLinks(Object.values(getAllLinks()));
  }, []);

  async function handleCreated(newLinks) {
    await Log('frontend', 'info', 'page', `Added ${newLinks.length} links`);
    setLinks(Object.values(getAllLinks()));
  }

  function refresh() {
    setLinks(Object.values(getAllLinks()));
  }

  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>Shorten Links</Typography>
      <InputForm onCreated={handleCreated} />
      <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>Your Links</Typography>
      {links.length === 0 ? (
        <Typography color="text.secondary">No links yet. Create one!</Typography>
      ) : (
        <Grid container spacing={2}>
          {links.map((link) => (
            <Grid item xs={12} key={link.code}>
              <LinkItem link={link} onClick={refresh} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
