/**
 * Subscription Helper Utilities
 * Functions for managing subscription tiers, course limits, and enrollment logic
 */

import { PRICING_TIERS, SUBSCRIPTION_TIERS, getCourseLimit as getPricingCourseLimit } from '../config/pricing';

/**
 * Get the course limit for a specific subscription tier
 * @param {string} tier - Subscription tier (free, plus, pro)
 * @returns {number} Maximum number of courses allowed
 */
export const getCourseLimit = (tier) => {
  return getPricingCourseLimit(tier);
};

/**
 * Check if a user can enroll in more courses
 * @param {object} user - User object with subscription info
 * @param {string} user.subscriptionTier - Current subscription tier
 * @param {number} user.coursesUsedThisMonth - Number of courses used this month
 * @param {number} user.courseLimit - Course limit for user's tier
 * @returns {boolean} True if user can enroll in more courses
 */
export const canEnrollInCourse = (user) => {
  if (!user) {
    return false;
  }

  const { subscriptionTier, coursesUsedThisMonth = 0, courseLimit } = user;

  // Use provided courseLimit or calculate from tier
  const limit = courseLimit ?? getCourseLimit(subscriptionTier);

  return coursesUsedThisMonth < limit;
};

/**
 * Get the number of remaining course slots for a user
 * @param {object} user - User object with subscription info
 * @returns {number} Number of remaining courses user can enroll in
 */
export const getRemainingCourses = (user) => {
  if (!user) {
    return 0;
  }

  const { subscriptionTier, coursesUsedThisMonth = 0, courseLimit } = user;
  const limit = courseLimit ?? getCourseLimit(subscriptionTier);

  return Math.max(0, limit - coursesUsedThisMonth);
};

/**
 * Get subscription benefits for a specific tier
 * @param {string} tier - Subscription tier (free, plus, pro)
 * @returns {object} Object containing features and limitations
 */
export const getSubscriptionBenefits = (tier) => {
  const normalizedTier = tier?.toLowerCase();
  const tierConfig = PRICING_TIERS[normalizedTier] || PRICING_TIERS[SUBSCRIPTION_TIERS.FREE];

  return {
    features: tierConfig.features || [],
    limitations: tierConfig.limitations || [],
    courses: tierConfig.courses,
    name: tierConfig.displayName,
    price: tierConfig.price,
  };
};

/**
 * Determine if user should see upgrade prompt
 * @param {object} user - User object with subscription info
 * @param {number} threshold - Percentage threshold to show prompt (0-1), default 0.8
 * @returns {boolean} True if user should see upgrade CTA
 */
export const shouldShowUpgradePrompt = (user, threshold = 0.8) => {
  if (!user) {
    return false;
  }

  const { subscriptionTier, coursesUsedThisMonth = 0, courseLimit } = user;

  // Always show upgrade prompt for free tier users at or above threshold
  if (subscriptionTier === SUBSCRIPTION_TIERS.FREE) {
    const limit = courseLimit ?? getCourseLimit(subscriptionTier);
    const usageRatio = coursesUsedThisMonth / limit;
    return usageRatio >= threshold;
  }

  // Show upgrade prompt for Plus tier users at capacity
  if (subscriptionTier === SUBSCRIPTION_TIERS.PLUS) {
    return !canEnrollInCourse(user);
  }

  // Pro users don't see upgrade prompts
  return false;
};

/**
 * Get the next tier upgrade for a user
 * @param {string} currentTier - Current subscription tier
 * @returns {object|null} Next tier configuration or null if already at max
 */
export const getNextTier = (currentTier) => {
  const normalizedTier = currentTier?.toLowerCase();

  switch (normalizedTier) {
    case SUBSCRIPTION_TIERS.FREE:
      return PRICING_TIERS[SUBSCRIPTION_TIERS.PLUS];
    case SUBSCRIPTION_TIERS.PLUS:
      return PRICING_TIERS[SUBSCRIPTION_TIERS.PRO];
    case SUBSCRIPTION_TIERS.PRO:
      return null; // Already at highest tier
    default:
      return PRICING_TIERS[SUBSCRIPTION_TIERS.PLUS]; // Default to Plus
  }
};

/**
 * Calculate subscription usage percentage
 * @param {object} user - User object with subscription info
 * @returns {number} Usage percentage (0-100)
 */
export const getSubscriptionUsage = (user) => {
  if (!user) {
    return 0;
  }

  const { subscriptionTier, coursesUsedThisMonth = 0, courseLimit } = user;
  const limit = courseLimit ?? getCourseLimit(subscriptionTier);

  if (limit === 0) {
    return 0;
  }

  return Math.min(100, Math.round((coursesUsedThisMonth / limit) * 100));
};

/**
 * Check if user has reached their course limit
 * @param {object} user - User object with subscription info
 * @returns {boolean} True if user has reached limit
 */
export const hasReachedLimit = (user) => {
  return !canEnrollInCourse(user);
};

/**
 * Get enrollment status message
 * @param {object} user - User object with subscription info
 * @returns {object} Status object with message and canEnroll flag
 */
export const getEnrollmentStatus = (user) => {
  if (!user) {
    return {
      canEnroll: false,
      message: 'Please log in to enroll in courses',
      type: 'error',
    };
  }

  const remaining = getRemainingCourses(user);
  const canEnroll = remaining > 0;

  if (canEnroll) {
    return {
      canEnroll: true,
      message: `You have ${remaining} course slot${remaining !== 1 ? 's' : ''} remaining`,
      type: 'success',
      remaining,
    };
  }

  const nextTier = getNextTier(user.subscriptionTier);

  return {
    canEnroll: false,
    message: `You've reached your course limit. ${nextTier ? `Upgrade to ${nextTier.displayName} for more courses.` : ''}`,
    type: 'warning',
    remaining: 0,
    suggestedTier: nextTier,
  };
};

/**
 * Validate enrollment attempt
 * @param {object} user - User object with subscription info
 * @param {string} courseId - Course ID to enroll in
 * @returns {object} Validation result with success flag and message
 */
export const validateEnrollment = (user, courseId) => {
  if (!user) {
    return {
      success: false,
      error: 'User not authenticated',
    };
  }

  if (!courseId) {
    return {
      success: false,
      error: 'Course ID is required',
    };
  }

  // Check if already enrolled
  if (user.enrolledCourses?.includes(courseId)) {
    return {
      success: false,
      error: 'Already enrolled in this course',
    };
  }

  // Check if can enroll
  if (!canEnrollInCourse(user)) {
    return {
      success: false,
      error: 'Course limit reached. Please upgrade your subscription.',
      requiresUpgrade: true,
      suggestedTier: getNextTier(user.subscriptionTier),
    };
  }

  return {
    success: true,
  };
};

export default {
  getCourseLimit,
  canEnrollInCourse,
  getRemainingCourses,
  getSubscriptionBenefits,
  shouldShowUpgradePrompt,
  getNextTier,
  getSubscriptionUsage,
  hasReachedLimit,
  getEnrollmentStatus,
  validateEnrollment,
};
