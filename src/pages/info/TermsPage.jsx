/**
 * Terms of Service Page
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/atoms/Container';
import Text from '../../components/atoms/Text';
import Button from '../../components/atoms/Button';
import Card from '../../components/atoms/Card';
import { ArrowLeft } from 'lucide-react';

const TermsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <Container size="lg">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" size="md" leftIcon={<ArrowLeft size={20} />} onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>

        <Card variant="elevated">
          <Text variant="display-md" as="h1" className="mb-4">
            Terms of Service
          </Text>
          <Text variant="body-sm" color="muted" className="mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </Text>

          <div className="space-y-8">
            <section>
              <Text variant="h3" className="mb-4">
                Acceptance of Terms
              </Text>
              <Text variant="body-md" color="muted">
                By accessing and using Learnify, you accept and agree to be bound by these Terms of Service. If you do
                not agree to these terms, please do not use our services.
              </Text>
            </section>

            <section>
              <Text variant="h3" className="mb-4">
                Description of Service
              </Text>
              <Text variant="body-md" color="muted" className="mb-4">
                Learnify provides an AI-powered personalized learning platform that:
              </Text>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>Generates custom learning paths based on your interests</li>
                <li>Provides interactive lessons and exercises</li>
                <li>Offers AI-powered code review and feedback</li>
                <li>Enables social features for collaborative learning</li>
              </ul>
            </section>

            <section>
              <Text variant="h3" className="mb-4">
                User Accounts
              </Text>
              <Text variant="body-md" color="muted" className="mb-4">
                To use our services, you must:
              </Text>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>Be at least 13 years of age</li>
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>
            </section>

            <section>
              <Text variant="h3" className="mb-4">
                User Conduct
              </Text>
              <Text variant="body-md" color="muted" className="mb-4">
                You agree not to:
              </Text>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>Share your account with others</li>
                <li>Use the service for any illegal purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Submit malicious code or harmful content</li>
                <li>Harass or abuse other users</li>
                <li>Scrape or harvest data from our platform</li>
              </ul>
            </section>

            <section>
              <Text variant="h3" className="mb-4">
                Intellectual Property
              </Text>
              <Text variant="body-md" color="muted" className="mb-4">
                All content, features, and functionality of Learnify are owned by us and protected by copyright,
                trademark, and other intellectual property laws.
              </Text>
              <Text variant="body-md" color="muted">
                You retain ownership of code you write, but grant us a license to use it for providing feedback and
                improving our services.
              </Text>
            </section>

            <section>
              <Text variant="h3" className="mb-4">
                Disclaimer of Warranties
              </Text>
              <Text variant="body-md" color="muted">
                Learnify is provided "as is" without warranties of any kind. We do not guarantee that the service will
                be uninterrupted, secure, or error-free.
              </Text>
            </section>

            <section>
              <Text variant="h3" className="mb-4">
                Limitation of Liability
              </Text>
              <Text variant="body-md" color="muted">
                To the fullest extent permitted by law, Learnify shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages arising out of your use of the service.
              </Text>
            </section>

            <section>
              <Text variant="h3" className="mb-4">
                Changes to Terms
              </Text>
              <Text variant="body-md" color="muted">
                We reserve the right to modify these terms at any time. Continued use of the service after changes
                constitutes acceptance of the new terms.
              </Text>
            </section>

            <section>
              <Text variant="h3" className="mb-4">
                Contact Us
              </Text>
              <Text variant="body-md" color="muted">
                If you have questions about these Terms of Service, please contact us at legal@learnify.com
              </Text>
            </section>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default TermsPage;
