import React from 'react';
import Container from '../atoms/Container';
import Logo from '../molecules/Logo';
import Text from '../atoms/Text';
import Divider from '../atoms/Divider';

/**
 * Footer Component - Organism
 * Site footer with links and information
 */

const Footer = ({
  description = "The first learning platform that adapts to you, not the other way around.",
  linkGroups = [],
  copyright = "© 2025 Learnify Inc. All rights reserved.",
}) => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <Container>
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-20">
          {/* Brand Section */}
          <div className="max-w-xs">
            <Logo variant="dark" className="mb-6" />
            <Text variant="body-sm" color="muted" className="leading-relaxed">
              {description}
            </Text>
          </div>

          {/* Link Groups */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {linkGroups.map((group) => (
              <div key={group.title}>
                <Text variant="h6" className="mb-4">
                  {group.title}
                </Text>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-slate-500 hover:text-prism-blue-600 transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Divider spacing="lg" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Text variant="body-sm" color="light">
            {copyright}
          </Text>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
