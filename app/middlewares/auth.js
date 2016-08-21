module.exports = {
  /**
   * Redirects to login page if user is not authenticated
   */
  notAuthenticated (req, res, next) {
    if (req.session.user_id) return next()
    res.redirect('/auth/login')
  },

  /**
   * Redirects to homepage if user is authenticated and requests
   * authentication page like login
   */
  authenticated (req, res, next) {
    if (req.session.user_id) {
      req.session.error = 'Please login'
      return res.redirect('/')
    }

    next()
  }
}
