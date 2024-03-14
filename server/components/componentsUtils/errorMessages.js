/**
 * @param {String} error - The API error code
 * @returns The user understandable error message
 */
export const getDisplayErrorMessage = (error) => {
  const errorCode = error.message ? error.message.toString() : error
  switch (errorCode) {
    case 'NO_CONFIG_PARAMETER':
      return "The configuration parameter doesn't exist"
    case 'NO_ALLOW_DELETE_CONFIG':
      return 'Cannot delete protected configuration setting'
    case 'INVALID_REGISTRATION_CODE':
      return 'The registration code is incorrect.'
    case 'WRONG_NAME_PASSWORD':
      return 'Wrong user name or password'
    case 'WRONG_AUTH_CODE':
      return 'The authentication code entered is incorrect or has expired. Please try again with a new code.'
    case 'NO_USER_FOUND':
      return "The user doesn't exists"
    case 'INTERNAL SERVER ERROR' || '500 INTERNAL SERVER ERROR':
      return 'The 500 Internal server error status code indicates that the processing of the request on the server failed unexpectedly. If you are able to replicate this error consistently, please report it to us through xxx'
    case 'UNAUTHORIZED_USER':
      return 'The user is unauthorised.'
    case 'NO_DELETE_OWN_ACCOUNT':
      return 'You cannot delete your own account'
    default: {
      return error.toString()
    }
  }
}
