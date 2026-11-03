// turn Firebase error codes into readable messages
export function friendlyError(error) {
  switch (error.code) {
    case 'auth/invalid-email':
      return 'That email address is not valid.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters.';
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Incorrect email or password.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'No internet connection. Please try again.';
    case 'permission-denied':
      return 'You do not have permission to do that.';
    case 'unavailable':
      return 'Service unavailable. Check your connection.';
    default:
      return 'Something went wrong. Please try again.';
  }
}