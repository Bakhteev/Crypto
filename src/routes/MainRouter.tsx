import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage';

export const MainRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />
  },
  {
    path: '*',
    element: <Navigate to={'/'} />
  }
]);