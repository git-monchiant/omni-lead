import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FilterProvider } from './contexts/FilterContext';
import theme from './theme/theme';
import MainLayout from './components/Layout/MainLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import LeadsPage from './pages/leads/LeadsPage';
import FollowUpPage from './pages/followup/FollowUpPage';
import LoginPage from './pages/login/LoginPage';

function App() {
  // TODO: Add authentication logic
  const isAuthenticated = true; // Mock authentication state

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <FilterProvider>
          <Routes>
            {/* Login Route */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes with Main Layout */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <MainLayout>
                    <DashboardPage />
                  </MainLayout>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/leads"
              element={
                isAuthenticated ? (
                  <MainLayout>
                    <LeadsPage />
                  </MainLayout>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/followup"
              element={
                isAuthenticated ? (
                  <MainLayout>
                    <FollowUpPage />
                  </MainLayout>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* 404 Not Found */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </FilterProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
