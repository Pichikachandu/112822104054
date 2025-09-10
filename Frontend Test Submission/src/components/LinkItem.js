import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { getLink, updateLink } from '../utils/LinkData';
import { Log } from '../utils/LogUtil';

export default function LinkItem({ link, onClick }) {
  async function handleOpen() {
    const data = getLink(link.code);
    if (!data) {
      alert('Link not found.');
      return;
    }
    if (data.expires && Date.now() > data.expires) {
      alert('Link has expired.');
      return;
    }
    const click = {
      time: Date.now(),
      source: document.referrer || 'direct',
      location: Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown'
    };
    updateLink(link.code, {
      clicks: [...(data.clicks || []), click],
      clickCount: (data.clickCount || 0) + 1
    });
    await Log('frontend', 'info', 'hook', `Clicked ${link.code}`);
    window.open(data.url, '_blank');
    if (onClick) onClick();
  }

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Typography variant="h6">{window.location.origin}/{link.code}</Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {link.url}
        </Typography>
        {link.expires && (
          <Typography variant="body2" color="text.secondary">
            Expires: {new Date(link.expires).toLocaleString()}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          Clicks: {link.clickCount || 0}
        </Typography>
        <Button variant="contained" size="small" sx={{ mt: 1 }} onClick={handleOpen}>
          Visit
        </Button>
      </CardContent>
    </Card>
  );
}
