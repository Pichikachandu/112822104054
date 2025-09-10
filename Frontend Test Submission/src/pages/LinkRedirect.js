import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography, Paper } from '@mui/material';
import { getLink, updateLink } from '../utils/LinkData';
import { Log } from '../utils/LogUtil'; 

export default function LinkRedirect() {
  const { code } = useParams();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    async function redirect() {
      const link = getLink(code);
      if (!link) {
        await Log('frontend', 'warn', 'component', `Link not found: ${code}`);
        setStatus('notfound');
        return;
      }
      if (link.expires && Date.now() > link.expires) {
        await Log('frontend', 'info', 'component', `Link expired: ${code}`);
        setStatus('expired');
        return;
      }
      const click = {
        time: Date.now(),
        source: document.referrer || 'direct',
        location: Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown'
      };
      updateLink(code, {
        clicks: [...(link.clicks || []), click],
        clickCount: (link.clickCount || 0) + 1
      });
      await Log('frontend', 'info', 'component', `Redirected ${code} from ${click.source}`);
      window.location.href = link.url;
    }
    redirect();
  }, [code]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
      <Paper sx={{ p: 2, textAlign: 'center' }}>
        {status === 'loading' && (
          <>
            <CircularProgress size={20} />
            <Typography sx={{ mt: 1 }}>Redirecting...</Typography>
          </>
        )}
        {status === 'notfound' && (
          <Typography color="error">Link not found.</Typography>
        )}
        {status === 'expired' && (
          <Typography color="warning.main">Link expired.</Typography>
        )}
      </Paper>
    </Box>
  );
}
