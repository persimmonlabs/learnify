import React, { useState } from 'react';
import UpgradeModal from './UpgradeModal';
import Button from '../atoms/Button';
import Card from '../atoms/Card';
import Text from '../atoms/Text';
import Badge from '../atoms/Badge';

/**
 * UpgradeModal Usage Examples
 * This file demonstrates various scenarios for using the UpgradeModal component
 */

const UpgradeModalExamples = () => {
  const [freeTierModal, setFreeTierModal] = useState(false);
  const [plusTierModal, setPlusTierModal] = useState(false);
  const [proTierModal, setProTierModal] = useState(false);

  // Example user states
  const freeTierUser = {
    subscriptionTier: 'free',
    coursesUsedThisMonth: 3,
    courseLimit: 3,
  };

  const plusTierUser = {
    subscriptionTier: 'plus',
    coursesUsedThisMonth: 6,
    courseLimit: 6,
  };

  const proTierUser = {
    subscriptionTier: 'pro',
    coursesUsedThisMonth: 10,
    courseLimit: 13,
  };

  const handleUpgrade = (tier) => {
    console.log(`User clicked upgrade to: ${tier}`);
    // In a real app, this would trigger payment flow or redirect to pricing
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <Text variant="display-md" className="mb-2">
            UpgradeModal Component Examples
          </Text>
          <Text variant="body-lg" color="muted">
            Click the buttons below to see how the UpgradeModal appears for different subscription tiers.
          </Text>
        </div>

        {/* Free Tier Example */}
        <Card variant="elevated" padding="lg">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Text variant="h4" className="mb-1">
                  Free Tier User (3/3 courses used)
                </Text>
                <Text variant="body-sm" color="muted">
                  User has reached their free tier limit and should upgrade to Plus
                </Text>
              </div>
              <Badge variant="default">Free</Badge>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 space-y-2">
              <Text variant="body-sm" className="font-mono">
                <strong>Current Tier:</strong> free
              </Text>
              <Text variant="body-sm" className="font-mono">
                <strong>Courses Used:</strong> 3 / 3
              </Text>
              <Text variant="body-sm" className="font-mono">
                <strong>Recommended Upgrade:</strong> Plus ($5/mo, 6 courses)
              </Text>
            </div>

            <Button
              variant="primary"
              onClick={() => setFreeTierModal(true)}
            >
              Show Upgrade Modal (Free → Plus)
            </Button>
          </div>
        </Card>

        {/* Plus Tier Example */}
        <Card variant="elevated" padding="lg">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Text variant="h4" className="mb-1">
                  Plus Tier User (6/6 courses used)
                </Text>
                <Text variant="body-sm" color="muted">
                  User has reached their Plus tier limit and should upgrade to Pro
                </Text>
              </div>
              <Badge variant="blue">Plus</Badge>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 space-y-2">
              <Text variant="body-sm" className="font-mono">
                <strong>Current Tier:</strong> plus
              </Text>
              <Text variant="body-sm" className="font-mono">
                <strong>Courses Used:</strong> 6 / 6
              </Text>
              <Text variant="body-sm" className="font-mono">
                <strong>Recommended Upgrade:</strong> Pro ($15/mo, 13 courses)
              </Text>
            </div>

            <Button
              variant="blue"
              onClick={() => setPlusTierModal(true)}
            >
              Show Upgrade Modal (Plus → Pro)
            </Button>
          </div>
        </Card>

        {/* Pro Tier Example */}
        <Card variant="elevated" padding="lg">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Text variant="h4" className="mb-1">
                  Pro Tier User (10/13 courses used)
                </Text>
                <Text variant="body-sm" color="muted">
                  User is already on the highest tier (edge case scenario)
                </Text>
              </div>
              <Badge variant="orange">Pro</Badge>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 space-y-2">
              <Text variant="body-sm" className="font-mono">
                <strong>Current Tier:</strong> pro
              </Text>
              <Text variant="body-sm" className="font-mono">
                <strong>Courses Used:</strong> 10 / 13
              </Text>
              <Text variant="body-sm" className="font-mono">
                <strong>Recommended Upgrade:</strong> None (already at max)
              </Text>
            </div>

            <Button
              variant="orange"
              onClick={() => setProTierModal(true)}
            >
              Show Modal (Pro - Edge Case)
            </Button>
          </div>
        </Card>

        {/* Integration Example Code */}
        <Card variant="outlined" padding="lg">
          <Text variant="h4" className="mb-4">
            Integration Example
          </Text>

          <div className="bg-slate-900 rounded-xl p-6 overflow-x-auto">
            <pre className="text-sm text-slate-100">
              <code>{`import React, { useState } from 'react';
import UpgradeModal from './components/organisms/UpgradeModal';
import { validateEnrollment } from './utils/subscriptionHelpers';

function CourseEnrollmentFlow({ user, courseId }) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handleEnroll = async () => {
    // Validate enrollment
    const validation = validateEnrollment(user, courseId);

    if (!validation.success && validation.requiresUpgrade) {
      // Show upgrade modal if user hit limit
      setShowUpgradeModal(true);
      return;
    }

    if (validation.success) {
      // Proceed with enrollment
      await enrollUserInCourse(user.id, courseId);
    }
  };

  return (
    <>
      <button onClick={handleEnroll}>
        Enroll in Course
      </button>

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        currentTier={user.subscriptionTier}
        coursesUsed={user.coursesUsedThisMonth}
        courseLimit={user.courseLimit}
        onUpgrade={(tier) => console.log('Upgrade to:', tier)}
      />
    </>
  );
}`}</code>
            </pre>
          </div>
        </Card>
      </div>

      {/* Modal Instances */}
      <UpgradeModal
        isOpen={freeTierModal}
        onClose={() => setFreeTierModal(false)}
        currentTier={freeTierUser.subscriptionTier}
        coursesUsed={freeTierUser.coursesUsedThisMonth}
        courseLimit={freeTierUser.courseLimit}
        onUpgrade={handleUpgrade}
      />

      <UpgradeModal
        isOpen={plusTierModal}
        onClose={() => setPlusTierModal(false)}
        currentTier={plusTierUser.subscriptionTier}
        coursesUsed={plusTierUser.coursesUsedThisMonth}
        courseLimit={plusTierUser.courseLimit}
        onUpgrade={handleUpgrade}
      />

      <UpgradeModal
        isOpen={proTierModal}
        onClose={() => setProTierModal(false)}
        currentTier={proTierUser.subscriptionTier}
        coursesUsed={proTierUser.coursesUsedThisMonth}
        courseLimit={proTierUser.courseLimit}
        onUpgrade={handleUpgrade}
      />
    </div>
  );
};

export default UpgradeModalExamples;
