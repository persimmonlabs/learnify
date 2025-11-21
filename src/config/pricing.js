/**
 * Pricing and Subscription Tier Configuration
 * Defines pricing tiers, limits, and benefits for the platform
 */

export const SUBSCRIPTION_TIERS = {
  FREE: 'free',
  PLUS: 'plus',
  PRO: 'pro',
};

export const PRICING_TIERS = {
  [SUBSCRIPTION_TIERS.FREE]: {
    id: SUBSCRIPTION_TIERS.FREE,
    name: 'Free',
    displayName: 'Free Tier',
    price: 0,
    priceLabel: 'Free forever',
    courses: 3,
    description: 'Perfect for trying out Learnify',
    features: [
      'Access to 3 courses per month',
      'Basic learning exercises',
      'Community forum access',
      'Progress tracking',
      'Mobile app access',
    ],
    limitations: [
      'Limited to 3 active courses',
      'No advanced diagnostics',
      'No priority support',
    ],
    color: 'gray',
    popular: false,
  },
  [SUBSCRIPTION_TIERS.PLUS]: {
    id: SUBSCRIPTION_TIERS.PLUS,
    name: 'Plus',
    displayName: 'Plus Plan',
    price: 5,
    priceLabel: '$5/month',
    courses: 6,
    description: 'For dedicated learners',
    features: [
      'Access to 6 courses per month',
      'All Free features',
      'Advanced code exercises',
      'Diagnosis challenges',
      'Priority email support',
      'Downloadable resources',
      'Ad-free experience',
    ],
    limitations: [
      'Limited to 6 active courses',
    ],
    color: 'blue',
    popular: true,
  },
  [SUBSCRIPTION_TIERS.PRO]: {
    id: SUBSCRIPTION_TIERS.PRO,
    name: 'Pro',
    displayName: 'Pro Plan',
    price: 15,
    priceLabel: '$15/month',
    courses: 13,
    description: 'For power users and teams',
    features: [
      'Access to 13 courses per month',
      'All Plus features',
      'Unlimited code exercises',
      'Advanced diagnosis challenges',
      'Priority chat support',
      'Exclusive courses',
      'Learning analytics',
      'Team collaboration tools',
      'Custom learning paths',
      'Certification programs',
    ],
    limitations: [],
    color: 'purple',
    popular: false,
  },
};

/**
 * Get course limit for a subscription tier
 * @param {string} tier - Subscription tier (free, plus, pro)
 * @returns {number} Maximum number of courses allowed
 */
export const getCourseLimit = (tier) => {
  const normalizedTier = tier?.toLowerCase();
  return PRICING_TIERS[normalizedTier]?.courses || PRICING_TIERS[SUBSCRIPTION_TIERS.FREE].courses;
};

/**
 * Get pricing tier details
 * @param {string} tier - Subscription tier (free, plus, pro)
 * @returns {object} Tier configuration object
 */
export const getTierDetails = (tier) => {
  const normalizedTier = tier?.toLowerCase();
  return PRICING_TIERS[normalizedTier] || PRICING_TIERS[SUBSCRIPTION_TIERS.FREE];
};

/**
 * Get all pricing tiers as an array
 * @returns {array} Array of tier configurations
 */
export const getAllTiers = () => {
  return Object.values(PRICING_TIERS);
};

/**
 * Check if a tier is valid
 * @param {string} tier - Subscription tier to validate
 * @returns {boolean} True if tier is valid
 */
export const isValidTier = (tier) => {
  const normalizedTier = tier?.toLowerCase();
  return Object.values(SUBSCRIPTION_TIERS).includes(normalizedTier);
};

export default PRICING_TIERS;
