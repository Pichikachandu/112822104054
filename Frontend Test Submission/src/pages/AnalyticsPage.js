import React from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';
import { getAllLinks } from '../utils/LinkData';

export default function AnalyticsPage() {
  const links = Object.values(getAllLinks());

  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>Link Analytics</Typography>
      {links.length === 0 ? (
        <Typography color="text.secondary">No links available.</Typography>
      ) : (
        links.map((link) => (
          <Paper key={link.code} sx={{ p: 2, mb: 2 }} elevation={1}>
            <Typography variant="h6">{window.location.origin}/{link.code}</Typography>
            <Typography>Original: {link.url}</Typography>
            <Typography>Created: {new Date(link.created).toLocaleString()}</Typography>
            {link.expires && (
              <Typography>Expires: {new Date(link.expires).toLocaleString()}</Typography>
            )}
            <Typography>Clicks: {link.clickCount || 0}</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle2">Click Details:</Typography>
            {link.clicks?.length ? (
              link.clicks.map((click, i) => (
                <Typography key={i} variant="body2">
                  {new Date(click.time).toLocaleString()} • {click.source} • {click.location}
                </Typography>
              ))
            ) : (
              <Typography variant="body2">No clicks.</Typography>
            )}
          </Paper>
        ))
      )}
    </Box>
  );
}
