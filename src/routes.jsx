import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import NotFound from './views/NotFound';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
