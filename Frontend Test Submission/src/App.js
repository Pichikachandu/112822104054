import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import MainPage from './pages/MainPage';
import LinkRedirect from './pages/LinkRedirect';
import AnalyticsPage from './pages/AnalyticsPage';

export default function App() {
  return (
    <Router>
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/stats" element={<AnalyticsPage />} />
          <Route path="/:code" element={<LinkRedirect />} />
        </Routes>
      </Container>
    </Router>
  );
}
