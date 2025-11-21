/**
 * Friendship Helper Utilities
 * Helper functions for managing friend relationships and requests
 */

/**
 * Check if two users are friends (accepted friendship)
 * @param {string} userId - Current user's ID
 * @param {string} friendId - Other user's ID
 * @param {Array} friendships - Array of all friendship records
 * @returns {boolean} - True if users are friends
 */
export const areFriends = (userId, friendId, friendships) => {
  if (!userId || !friendId || !friendships) return false;

  return friendships.some(
    (f) =>
      f.status === 'accepted' &&
      ((f.userId === userId && f.friendId === friendId) ||
        (f.userId === friendId && f.friendId === userId))
  );
};

/**
 * Check if there's a pending friend request between two users
 * @param {string} userId - Current user's ID
 * @param {string} friendId - Other user's ID
 * @param {Array} friendships - Array of all friendship records
 * @returns {boolean} - True if there's a pending request
 */
export const isPendingRequest = (userId, friendId, friendships) => {
  if (!userId || !friendId || !friendships) return false;

  return friendships.some(
    (f) =>
      f.status === 'pending' &&
      ((f.userId === userId && f.friendId === friendId) ||
        (f.userId === friendId && f.friendId === userId))
  );
};

/**
 * Get the friendship status between two users
 * @param {string} userId - Current user's ID
 * @param {string} friendId - Other user's ID
 * @param {Array} friendships - Array of all friendship records
 * @returns {string} - Status: 'none' | 'pending_sent' | 'pending_received' | 'friends'
 */
export const getFriendshipStatus = (userId, friendId, friendships) => {
  if (!userId || !friendId || !friendships) return 'none';

  // Check if already friends
  if (areFriends(userId, friendId, friendships)) {
    return 'friends';
  }

  // Check for pending request sent by current user
  const sentRequest = friendships.find(
    (f) => f.status === 'pending' && f.userId === userId && f.friendId === friendId
  );
  if (sentRequest) return 'pending_sent';

  // Check for pending request received by current user
  const receivedRequest = friendships.find(
    (f) => f.status === 'pending' && f.userId === friendId && f.friendId === userId
  );
  if (receivedRequest) return 'pending_received';

  return 'none';
};

/**
 * Filter friendships by status and get friend details
 * @param {Array} friendships - Array of all friendship records
 * @param {string} userId - Current user's ID
 * @param {string} status - Status to filter: 'accepted' | 'pending'
 * @returns {Array} - Array of friendship records
 */
export const filterFriendsByStatus = (friendships, userId, status) => {
  if (!friendships || !userId) return [];

  return friendships.filter((f) => {
    // For accepted friendships, check if user is either side
    if (status === 'accepted') {
      return f.status === 'accepted' && (f.userId === userId || f.friendId === userId);
    }

    // For pending requests received by the user
    if (status === 'pending_received') {
      return f.status === 'pending' && f.friendId === userId;
    }

    // For pending requests sent by the user
    if (status === 'pending_sent') {
      return f.status === 'pending' && f.userId === userId;
    }

    return f.status === status && (f.userId === userId || f.friendId === userId);
  });
};

/**
 * Get the other user's ID from a friendship record
 * @param {Object} friendship - Friendship record
 * @param {string} currentUserId - Current user's ID
 * @returns {string} - The friend's user ID
 */
export const getFriendUserId = (friendship, currentUserId) => {
  if (!friendship || !currentUserId) return null;

  return friendship.userId === currentUserId ? friendship.friendId : friendship.userId;
};

/**
 * Get mutual friends count between two users
 * @param {string} user1Id - First user's ID
 * @param {string} user2Id - Second user's ID
 * @param {Array} friendships - Array of all friendship records
 * @returns {number} - Count of mutual friends
 */
export const getMutualFriendsCount = (user1Id, user2Id, friendships) => {
  if (!user1Id || !user2Id || !friendships) return 0;

  // Get friends of user1
  const user1Friends = filterFriendsByStatus(friendships, user1Id, 'accepted').map((f) =>
    getFriendUserId(f, user1Id)
  );

  // Get friends of user2
  const user2Friends = filterFriendsByStatus(friendships, user2Id, 'accepted').map((f) =>
    getFriendUserId(f, user2Id)
  );

  // Count mutual friends
  const mutualFriends = user1Friends.filter((friendId) => user2Friends.includes(friendId));

  return mutualFriends.length;
};

/**
 * Format time since request was sent
 * @param {string} timestamp - ISO timestamp
 * @returns {string} - Formatted time string (e.g., "2 days ago")
 */
export const getTimeSince = (timestamp) => {
  if (!timestamp) return '';

  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now - past;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffMinutes > 0) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
  return 'Just now';
};

export default {
  areFriends,
  isPendingRequest,
  getFriendshipStatus,
  filterFriendsByStatus,
  getFriendUserId,
  getMutualFriendsCount,
  getTimeSince,
};
