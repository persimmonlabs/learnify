/**
 * Privacy Policy Page
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/atoms/Container';
import Text from '../../components/atoms/Text';
import Button from '../../components/atoms/Button';
import Card from '../../components/atoms/Card';
import { ArrowLeft } from 'lucide-react';

const PrivacyPage = () => {
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
            Privacy Policy
          </Text>
          <Text variant="body-sm" color="muted" className="mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </Text>

          <div className="space-y-8">
            <section>
              <Text variant="h3" className="mb-4">
                Information We Collect
              </Text>
              <Text variant="body-md" color="muted" className="mb-4">
                We collect information you provide directly to us when you create an account, complete onboarding, or
                use our services:
              </Text>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>Account information (name, email, username)</li>
                <li>Learning preferences and goals</li>
                <li>Course progress and completion data</li>
                <li>Code submissions and exercise attempts</li>
                <li>Profile customization (archetype, domain, avatar)</li>
              </ul>
            </section>

            <section>
              <Text variant="h3" className="mb-4">
                How We Use Your Information
              </Text>
              <Text variant="body-md" color="muted" className="mb-4">
                We use the information we collect to:
              </Text>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>Provide personalized learning experiences</li>
                <li>Generate custom curriculum based on your interests</li>
                <li>Track your progress and achievements</li>
                <li>Provide AI-powered feedback on your work</li>
                <li>Improve our platform and services</li>
                <li>Send you relevant updates and notifications</li>
              </ul>
            </section>

            <section>
              <Text variant="h3" className="mb-4">
                Data Privacy & Social Features
              </Text>
              <Text variant="body-md" color="muted" className="mb-4">
                We respect your privacy:
              </Text>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>
                  <strong>Public by default:</strong> Course completions, achievements, and archetype
                </li>
                <li>
                  <strong>Friends-only:</strong> In-progress courses, module completions, architecture scores
                </li>
                <li>
                  <strong>Private:</strong> Code submissions, failed attempts, hint usage
                </li>
                <li>You can adjust privacy settings at any time in your profile</li>
              </ul>
            </section>

            <section>
              <Text variant="h3" className="mb-4">
                Data Security
              </Text>
              <Text variant="body-md" color="muted">
                We implement industry-standard security measures to protect your personal information. However, no
                method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
              </Text>
            </section>

            <section>
              <Text variant="h3" className="mb-4">
                Your Rights
              </Text>
              <Text variant="body-md" color="muted" className="mb-4">
                You have the right to:
              </Text>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your learning data</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <Text variant="h3" className="mb-4">
                Contact Us
              </Text>
              <Text variant="body-md" color="muted">
                If you have questions about this Privacy Policy, please contact us at privacy@learnify.com
              </Text>
            </section>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default PrivacyPage;
