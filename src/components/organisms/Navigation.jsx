import React, { useState, useEffect } from 'react';
import { Menu, X, User as UserIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import Container from '../atoms/Container';
import Button from '../atoms/Button';
import Logo from '../molecules/Logo';
import SubscriptionBadge from '../molecules/SubscriptionBadge';

/**
 * Navigation Component - Organism
 * Main site navigation with responsive mobile menu
 */

const Navigation = ({
  links = [],
  ctaText = 'Get Started',
  onCtaClick,
  user = null,
  className,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b',
        scrolled || mobileMenuOpen
          ? 'bg-white/80 backdrop-blur-xl border-slate-100 py-4'
          : 'bg-transparent border-transparent py-6',
        className
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          <Logo />

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-3">
                  <SubscriptionBadge tier={user.subscriptionTier} />
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <UserIcon size={16} className="text-slate-500" />
                    <span>{user.name || user.email}</span>
                  </div>
                </div>
                <Button onClick={onCtaClick} variant="secondary" size="sm">
                  {ctaText}
                </Button>
              </>
            ) : (
              <>
                <a href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                  Log in
                </a>
                <Button onClick={onCtaClick}>
                  {ctaText}
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 md:hidden flex flex-col gap-4 shadow-xl">
            {user && (
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <UserIcon size={16} className="text-slate-500" />
                  <span>{user.name || user.email}</span>
                </div>
                <SubscriptionBadge tier={user.subscriptionTier} />
              </div>
            )}
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-lg font-medium text-slate-600 py-2"
              >
                {link.label}
              </a>
            ))}
            <div className="h-px bg-slate-100 my-2" />
            <Button fullWidth onClick={onCtaClick}>
              {ctaText}
            </Button>
          </div>
        )}
      </Container>
    </nav>
  );
};

export default Navigation;
