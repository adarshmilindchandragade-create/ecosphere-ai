import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { TerraAIAssistant } from './components/ui/TerraAIAssistant';
const LandingPage = React.lazy(() => import('./pages/LandingPage/LandingPage').then(module => ({ default: module.LandingPage })));
const LoginPage = React.lazy(() => import('./pages/Auth/LoginPage').then(module => ({ default: module.LoginPage })));
const SignUpPage = React.lazy(() => import('./pages/Auth/SignUpPage').then(module => ({ default: module.SignUpPage })));
const DemoDashboard = React.lazy(() => import('./pages/Demo/DemoDashboard').then(module => ({ default: module.DemoDashboard })));

// Layout for the landing page with Navbar and Footer
function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 80px)' }}>
        {children}
      </main>
      <Footer />
      <TerraAIAssistant />
    </>
  );
}

// Layout for Auth pages (No Navbar/Footer)
function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <TerraAIAssistant />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
          <Routes>
            <Route path="/" element={<MainLayout><LandingPage /></MainLayout>} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            
            <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
            <Route path="/signup" element={<AuthLayout><SignUpPage /></AuthLayout>} />
            
            <Route path="/demo" element={<DemoDashboard />} />
            
            {/* The rest of the legacy dashboard routes can map to demo for now */}
            <Route path="/dashboard" element={<DemoDashboard />} />
            <Route path="/analytics" element={<DemoDashboard />} />
            <Route path="/simulator" element={<DemoDashboard />} />
            <Route path="/coach" element={<DemoDashboard />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}
