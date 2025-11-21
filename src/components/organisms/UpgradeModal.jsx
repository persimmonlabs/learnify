import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, XCircle, Sparkles, TrendingUp } from 'lucide-react';
import Modal from '../atoms/Modal';
import Card from '../atoms/Card';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import GradientText from '../molecules/GradientText';
import Text from '../atoms/Text';
import { getNextTier, getSubscriptionBenefits } from '../../utils/subscriptionHelpers';
import { getTierDetails } from '../../config/pricing';
import { cn } from '../../utils/cn';

/**
 * UpgradeModal Component - Organism
 * Displays when users hit their course enrollment limit
 *
 * @param {object} props
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {function} props.onClose - Callback when modal closes
 * @param {string} props.currentTier - Current subscription tier ('free' | 'plus' | 'pro')
 * @param {number} props.coursesUsed - Number of courses used this month
 * @param {number} props.courseLimit - Maximum courses allowed for current tier
 * @param {function} props.onUpgrade - Optional callback when upgrade is clicked
 */
const UpgradeModal = ({
  isOpen = false,
  onClose,
  currentTier = 'free',
  coursesUsed = 0,
  courseLimit = 3,
  onUpgrade,
}) => {
  const navigate = useNavigate();

  // Get tier information
  const currentTierDetails = getTierDetails(currentTier);
  const nextTier = getNextTier(currentTier);
  const currentBenefits = getSubscriptionBenefits(currentTier);
  const nextBenefits = nextTier ? getSubscriptionBenefits(nextTier.id) : null;

  // Handle upgrade click
  const handleUpgrade = () => {
    if (onUpgrade && nextTier) {
      onUpgrade(nextTier.id);
    }
    navigate('/pricing');
    onClose();
  };

  // Handle view all plans
  const handleViewAllPlans = () => {
    navigate('/pricing');
    onClose();
  };

  // Determine badge variant based on tier
  const getTierBadgeVariant = (tier) => {
    const tierLower = tier?.toLowerCase();
    if (tierLower === 'pro') return 'orange';
    if (tierLower === 'plus') return 'blue';
    return 'default';
  };

  // Get tier color classes
  const getTierColorClass = (tier) => {
    const tierLower = tier?.toLowerCase();
    if (tierLower === 'pro') return 'text-prism-orange-600';
    if (tierLower === 'plus') return 'text-prism-blue-600';
    return 'text-slate-600';
  };

  // If already on Pro tier (edge case)
  if (currentTier === 'pro') {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="md"
        showCloseButton={true}
      >
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-prism-orange-100 mb-4">
            <Sparkles className="w-8 h-8 text-prism-orange-600" />
          </div>

          <Text variant="h3" className="mb-2">
            You're on the <GradientText>highest tier</GradientText>
          </Text>

          <Text variant="body-md" color="muted" className="mb-6">
            You're already enjoying all premium features available. You've used {coursesUsed} out of {courseLimit} courses this month.
          </Text>

          <Button variant="primary" onClick={onClose} fullWidth>
            Got it
          </Button>
        </div>
      </Modal>
    );
  }

  // If no next tier available (safety check)
  if (!nextTier) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      showCloseButton={true}
      closeOnOverlay={true}
    >
      <div className="space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-prism-blue-100 to-prism-orange-100 mb-2">
            <TrendingUp className="w-8 h-8 text-prism-blue-600" />
          </div>

          <Text variant="h2" as="h2" className="mb-2">
            You've reached your course limit
          </Text>

          <div className="flex items-center justify-center gap-2 text-slate-600">
            <Text variant="body-md" color="muted">
              You're on the
            </Text>
            <Badge
              variant={getTierBadgeVariant(currentTier)}
              size="md"
            >
              {currentTierDetails.displayName}
            </Badge>
            <Text variant="body-md" color="muted">
              ({coursesUsed}/{courseLimit} courses used)
            </Text>
          </div>
        </div>

        {/* Comparison Section */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Current Tier */}
          <Card
            variant="outlined"
            padding="lg"
            className="border-slate-200"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Text variant="h5" color="muted">
                  Current Plan
                </Text>
                <Badge variant={getTierBadgeVariant(currentTier)} size="sm">
                  {currentTierDetails.name}
                </Badge>
              </div>

              <div className="space-y-2">
                <Text variant="h3" className={getTierColorClass(currentTier)}>
                  {currentTierDetails.priceLabel}
                </Text>
                <Text variant="body-sm" color="muted">
                  {currentBenefits.courses} courses per month
                </Text>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <Text variant="label" color="muted">
                  Current Features
                </Text>
                <ul className="space-y-2">
                  {currentBenefits.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {currentBenefits.limitations.length > 0 && (
                <div className="space-y-2 pt-2">
                  <ul className="space-y-2">
                    {currentBenefits.limitations.slice(0, 2).map((limitation, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-slate-500">
                        <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>

          {/* Recommended Tier */}
          <Card
            variant="gradient"
            padding="lg"
            className="relative shadow-xl"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge variant="blue" size="sm" dot>
                Recommended
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Text variant="h5" className="text-slate-900">
                  Upgrade to
                </Text>
                <Badge variant={getTierBadgeVariant(nextTier.id)} size="md">
                  {nextTier.name}
                </Badge>
              </div>

              <div className="space-y-2">
                <Text variant="h3">
                  <GradientText
                    from={nextTier.color === 'blue' ? 'prism-blue-600' : 'prism-orange-500'}
                    to={nextTier.color === 'blue' ? 'prism-blue-700' : 'prism-orange-600'}
                  >
                    {nextTier.priceLabel}
                  </GradientText>
                </Text>
                <Text variant="body-sm" className="font-semibold text-slate-900">
                  {nextBenefits.courses} courses per month
                </Text>
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-prism-green-50 rounded-lg">
                  <TrendingUp className="w-3 h-3 text-prism-green-600" />
                  <Text variant="caption" className="text-prism-green-700 font-semibold">
                    +{nextBenefits.courses - currentBenefits.courses} more courses
                  </Text>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200">
                <Text variant="label" className="text-slate-900">
                  What You'll Get
                </Text>
                <ul className="space-y-2">
                  {nextBenefits.features.slice(0, 5).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className={cn(
                        "w-4 h-4 flex-shrink-0 mt-0.5",
                        nextTier.color === 'blue' ? 'text-prism-blue-600' : 'text-prism-orange-600'
                      )} />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Benefits Highlight */}
        <div className="bg-gradient-to-r from-prism-blue-50 to-prism-orange-50 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-prism-blue-600" />
            </div>
            <div className="flex-1">
              <Text variant="body-sm" className="font-semibold text-slate-900 mb-1">
                Unlock Your Full Learning Potential
              </Text>
              <Text variant="body-sm" color="muted">
                {nextTier.description} - Get {nextBenefits.courses - currentBenefits.courses}x more courses and access to premium features.
              </Text>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="space-y-3 pt-2">
          <Button
            variant={nextTier.color === 'blue' ? 'blue' : 'orange'}
            size="lg"
            fullWidth
            onClick={handleUpgrade}
            rightIcon={<ArrowRight size={20} />}
          >
            Upgrade to {nextTier.displayName}
          </Button>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="md"
              fullWidth
              onClick={onClose}
            >
              Not Now
            </Button>

            <Button
              variant="link"
              size="md"
              fullWidth
              onClick={handleViewAllPlans}
            >
              View All Plans
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UpgradeModal;
