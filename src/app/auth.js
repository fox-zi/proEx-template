import axios from "axios"

const checkAuth = () => {
  /*  Getting token value stored in localstorage, if token is not present we will open login page
      for all internal dashboard routes  */
  const TOKEN = localStorage.getItem("token")
  const PUBLIC_ROUTES = ["documentation"]
  const HIDE_AFTER_LOGIN_ROUTES = ["login", "forgot-password", "register"]
  const isPublicPage = PUBLIC_ROUTES.some(r => window.location.href.includes(r))
  const isHideAfterLoginPage = HIDE_AFTER_LOGIN_ROUTES.some(r => window.location.href.includes(r))

  if (!TOKEN && !(isPublicPage || isHideAfterLoginPage)) {
    window.location.href = '/login'
    return
  }
  if (TOKEN && isHideAfterLoginPage) {
    window.location.href = '/app/welcome'
    return
  }

  axios.defaults.headers.common['Authorization'] = TOKEN

  axios.interceptors.request.use(function (config) {
    // UPDATE: Add this code to show global loading indicator
    document.body.classList.add('loading-indicator');
    return config
  }, function (error) {
    return Promise.reject(error);
  });

  axios.interceptors.response.use(function (response) {
    // UPDATE: Add this code to hide global loading indicator
    document.body.classList.remove('loading-indicator');
    return response;
  }, function (error) {
    if (error.response.status === 401) {
      localStorage.clear()
      window.location.href = '/login'
      return
    }
    document.body.classList.remove('loading-indicator');
    return Promise.reject(error);
  });
  return TOKEN

}

export default checkAuth
