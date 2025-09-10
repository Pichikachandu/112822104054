import React, { useState } from 'react';
import { Grid, TextField, Button, Paper, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { createUniqueCode } from '../utils/LinkCode';
import { addLink, getAllLinks } from '../utils/LinkData';
import { Log } from '../utils/LogUtil';

const newInput = () => ({ url: '', mins: '', code: '' });

export default function InputForm({ onCreated }) {
  const [inputs, setInputs] = useState([newInput()]);

  function updateInput(index, field, value) {
    const updated = [...inputs];
    updated[index] = { ...updated[index], [field]: value };
    setInputs(updated);
  }

  function addInput() {
    if (inputs.length < 5) setInputs([...inputs, newInput()]);
  }

  function removeInput(index) {
    const updated = inputs.filter((_, i) => i !== index);
    setInputs(updated.length ? updated : [newInput()]);
  }

  function isValidUrl(url) {
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  }

  async function submit(e) {
    e.preventDefault();
    const created = [];
    const store = getAllLinks();
    for (let i = 0; i < inputs.length; i++) {
      const { url, mins, code } = inputs[i];
      if (!isValidUrl(url)) {
        alert(`Row ${i + 1}: Invalid URL.`);
        return;
      }
      const validity = parseInt(mins) || 30;
      if (isNaN(validity) || validity <= 0) {
        alert(`Row ${i + 1}: Validity must be positive.`);
        return;
      }
      let shortCode = code.trim();
      if (shortCode) {
        if (!/^[A-Za-z0-9]{3,10}$/.test(shortCode)) {
          alert(`Row ${i + 1}: Code must be 3-10 alphanumeric chars.`);
          return;
        }
        if (store[shortCode]) {
          alert(`Row ${i + 1}: Code already used.`);
          return;
        }
      } else {
        shortCode = createUniqueCode(store);
      }
      addLink(url, shortCode, validity);
      created.push({ url, shortCode, validity });
      await Log('frontend', 'info', 'hook', `Created link: ${shortCode}`);
    }
    setInputs([newInput()]);
    onCreated(created);
    alert(`${created.length} link(s) created.`);
  }

  return (
    <form onSubmit={submit}>
      <Paper sx={{ p: 2 }}>
        {inputs.map((input, i) => (
          <Grid container spacing={1} key={i} sx={{ mb: 1 }}>
            <Grid item xs={12} sm={5}>
              <TextField
                label="URL"
                value={input.url}
                onChange={(e) => updateInput(i, 'url', e.target.value)}
                fullWidth
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Validity (min)"
                type="number"
                value={input.mins}
                onChange={(e) => updateInput(i, 'mins', e.target.value)}
                fullWidth
                placeholder="30"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Custom Code"
                value={input.code}
                onChange={(e) => updateInput(i, 'code', e.target.value)}
                fullWidth
                placeholder="Optional"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={1}>
              <IconButton disabled={inputs.length === 1} onClick={() => removeInput(i)}>
                <Remove />
              </IconButton>
              {i === inputs.length - 1 && inputs.length < 5 && (
                <IconButton onClick={addInput}>
                  <Add />
                </IconButton>
              )}
            </Grid>
          </Grid>
        ))}
        <Button type="submit" variant="contained" size="small" sx={{ mt: 1 }}>
          Create
        </Button>
      </Paper>
    </form>
  );
}
