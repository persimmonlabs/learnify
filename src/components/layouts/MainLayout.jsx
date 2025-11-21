/**
 * Main Layout Component
 * Wraps authenticated pages with navigation and structure
 */

import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Navigation from '../organisms/Navigation';
import { Home, BookOpen, Users, User, UserPlus, LogOut } from 'lucide-react';

const MainLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navLinks = [
    { label: 'Dashboard', href: '/dashboard', icon: Home },
    { label: 'Courses', href: '/courses', icon: BookOpen },
    { label: 'Social', href: '/social', icon: Users },
    { label: 'Discover', href: '/social/discover', icon: UserPlus },
    { label: 'Pricing', href: '/pricing', icon: null },
    { label: 'Profile', href: `/profile/${user?.id}`, icon: User },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation - Fixed with proper z-index */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200">
        <Navigation
          links={navLinks}
          ctaText="Logout"
          onCtaClick={handleLogout}
          user={user}
        />
      </div>

      {/* Main Content - Padded to account for fixed nav */}
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
