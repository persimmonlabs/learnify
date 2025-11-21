/**
 * Mock Friendship Data
 *
 * Friend connections between users showing social network relationships.
 * Includes accepted friendships and pending friend requests.
 *
 * Status Types:
 * - 'accepted': Both users are friends
 * - 'pending': Friend request sent but not yet accepted
 * - 'declined': Friend request was declined (not shown in UI typically)
 */

export const MOCK_FRIENDSHIPS = [
  // Alice Johnson's friendships (user-1)
  {
    id: 'friendship-1',
    userId: 'user-1',
    friendId: 'user-2',
    status: 'accepted',
    createdAt: '2025-02-10T09:00:00Z',
    acceptedAt: '2025-02-10T14:30:00Z'
  },
  {
    id: 'friendship-2',
    userId: 'user-1',
    friendId: 'user-4',
    status: 'accepted',
    createdAt: '2025-03-15T11:20:00Z',
    acceptedAt: '2025-03-16T08:45:00Z'
  },
  {
    id: 'friendship-3',
    userId: 'user-1',
    friendId: 'user-8',
    status: 'accepted',
    createdAt: '2025-04-22T16:00:00Z',
    acceptedAt: '2025-04-22T18:15:00Z'
  },
  {
    id: 'friendship-4',
    userId: 'user-1',
    friendId: 'user-5',
    status: 'pending',
    createdAt: '2025-11-18T10:00:00Z',
    acceptedAt: null
  },

  // Marcus Chen's friendships (user-2)
  {
    id: 'friendship-5',
    userId: 'user-2',
    friendId: 'user-5',
    status: 'accepted',
    createdAt: '2025-01-20T13:00:00Z',
    acceptedAt: '2025-01-21T09:30:00Z'
  },
  {
    id: 'friendship-6',
    userId: 'user-2',
    friendId: 'user-8',
    status: 'accepted',
    createdAt: '2025-05-10T15:45:00Z',
    acceptedAt: '2025-05-11T10:00:00Z'
  },
  {
    id: 'friendship-7',
    userId: 'user-2',
    friendId: 'user-3',
    status: 'accepted',
    createdAt: '2025-10-05T12:30:00Z',
    acceptedAt: '2025-10-05T14:00:00Z'
  },

  // Sarah Martinez's friendships (user-3)
  {
    id: 'friendship-8',
    userId: 'user-3',
    friendId: 'user-7',
    status: 'accepted',
    createdAt: '2025-09-25T10:15:00Z',
    acceptedAt: '2025-09-25T11:00:00Z'
  },
  {
    id: 'friendship-9',
    userId: 'user-3',
    friendId: 'user-4',
    status: 'pending',
    createdAt: '2025-11-19T14:20:00Z',
    acceptedAt: null
  },

  // David Kim's friendships (user-4)
  {
    id: 'friendship-10',
    userId: 'user-4',
    friendId: 'user-5',
    status: 'accepted',
    createdAt: '2025-07-08T09:30:00Z',
    acceptedAt: '2025-07-08T16:45:00Z'
  },

  // Priya Patel's friendships (user-5)
  {
    id: 'friendship-11',
    userId: 'user-5',
    friendId: 'user-7',
    status: 'accepted',
    createdAt: '2025-08-12T11:00:00Z',
    acceptedAt: '2025-08-13T08:20:00Z'
  },

  // Elena Rodriguez's friendships (user-7)
  {
    id: 'friendship-12',
    userId: 'user-7',
    friendId: 'user-8',
    status: 'pending',
    createdAt: '2025-11-20T15:30:00Z',
    acceptedAt: null
  },

  // James Wilson's friendships (user-8)
  {
    id: 'friendship-13',
    userId: 'user-8',
    friendId: 'user-4',
    status: 'accepted',
    createdAt: '2025-06-14T13:45:00Z',
    acceptedAt: '2025-06-15T09:00:00Z'
  },

  // Tom Anderson (user-6) has no friendships yet (new user with private settings)
];

// In-memory state for mock friendship operations
let mockFriendshipsState = [...MOCK_FRIENDSHIPS];

/**
 * Reset mock friendships to initial state (for testing)
 */
export const resetMockFriendships = () => {
  mockFriendshipsState = [...MOCK_FRIENDSHIPS];
  return mockFriendshipsState;
};

/**
 * Get all current friendships
 */
export const getMockFriendships = () => {
  return [...mockFriendshipsState];
};

/**
 * Send a friend request (create new pending friendship)
 * @param {string} fromUserId - User sending the request
 * @param {string} toUserId - User receiving the request
 * @returns {Object} - New friendship record or error
 */
export const sendFriendRequest = (fromUserId, toUserId) => {
  // Validate inputs
  if (!fromUserId || !toUserId) {
    return { success: false, error: 'Invalid user IDs' };
  }

  if (fromUserId === toUserId) {
    return { success: false, error: 'Cannot send friend request to yourself' };
  }

  // Check if friendship already exists
  const existingFriendship = mockFriendshipsState.find(
    (f) =>
      (f.userId === fromUserId && f.friendId === toUserId) ||
      (f.userId === toUserId && f.friendId === fromUserId)
  );

  if (existingFriendship) {
    if (existingFriendship.status === 'accepted') {
      return { success: false, error: 'Already friends' };
    }
    if (existingFriendship.status === 'pending') {
      return { success: false, error: 'Friend request already pending' };
    }
  }

  // Create new friendship
  const newFriendship = {
    id: `friendship-${Date.now()}`,
    userId: fromUserId,
    friendId: toUserId,
    status: 'pending',
    createdAt: new Date().toISOString(),
    acceptedAt: null,
  };

  mockFriendshipsState.push(newFriendship);

  return {
    success: true,
    data: newFriendship,
    message: 'Friend request sent',
  };
};

/**
 * Accept a friend request (update status to 'accepted')
 * @param {string} friendshipId - ID of the friendship record
 * @returns {Object} - Updated friendship record or error
 */
export const acceptFriendRequest = (friendshipId) => {
  const friendship = mockFriendshipsState.find((f) => f.id === friendshipId);

  if (!friendship) {
    return { success: false, error: 'Friend request not found' };
  }

  if (friendship.status !== 'pending') {
    return { success: false, error: 'Request is not pending' };
  }

  // Update friendship status
  friendship.status = 'accepted';
  friendship.acceptedAt = new Date().toISOString();

  return {
    success: true,
    data: friendship,
    message: 'Friend request accepted',
  };
};

/**
 * Decline a friend request (remove from friendships)
 * @param {string} friendshipId - ID of the friendship record
 * @returns {Object} - Success response or error
 */
export const declineFriendRequest = (friendshipId) => {
  const index = mockFriendshipsState.findIndex((f) => f.id === friendshipId);

  if (index === -1) {
    return { success: false, error: 'Friend request not found' };
  }

  const friendship = mockFriendshipsState[index];

  if (friendship.status !== 'pending') {
    return { success: false, error: 'Request is not pending' };
  }

  // Remove friendship from array
  mockFriendshipsState.splice(index, 1);

  return {
    success: true,
    message: 'Friend request declined',
  };
};

/**
 * Remove a friend (unfriend - remove accepted friendship)
 * @param {string} friendshipId - ID of the friendship record
 * @returns {Object} - Success response or error
 */
export const removeFriend = (friendshipId) => {
  const index = mockFriendshipsState.findIndex((f) => f.id === friendshipId);

  if (index === -1) {
    return { success: false, error: 'Friendship not found' };
  }

  const friendship = mockFriendshipsState[index];

  if (friendship.status !== 'accepted') {
    return { success: false, error: 'Not currently friends' };
  }

  // Remove friendship from array
  mockFriendshipsState.splice(index, 1);

  return {
    success: true,
    message: 'Friend removed',
  };
};

/**
 * Get user's friends (accepted friendships only)
 * @param {string} userId - User's ID
 * @returns {Array} - Array of friendship records
 */
export const getUserFriends = (userId) => {
  return mockFriendshipsState.filter(
    (f) => f.status === 'accepted' && (f.userId === userId || f.friendId === userId)
  );
};

/**
 * Get pending friend requests received by user
 * @param {string} userId - User's ID
 * @returns {Array} - Array of pending friendship requests
 */
export const getPendingRequests = (userId) => {
  return mockFriendshipsState.filter(
    (f) => f.status === 'pending' && f.friendId === userId
  );
};

/**
 * Get pending friend requests sent by user
 * @param {string} userId - User's ID
 * @returns {Array} - Array of pending friendship requests
 */
export const getSentRequests = (userId) => {
  return mockFriendshipsState.filter(
    (f) => f.status === 'pending' && f.userId === userId
  );
};

export default MOCK_FRIENDSHIPS;
