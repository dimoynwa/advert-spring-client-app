export const ACCESS_TOKEN = 'jwtToken';
export const USER_AVATAR = 'userAvatar';
export const USER_DATA = 'userData';
export const API_BASE_URL = 'http://localhost:8080/advertisement-api-0.0.1-SNAPSHOT/api';
export const IMAGES_PATH = 'http://localhost:8080/advertisement-api-0.0.1-SNAPSHOT/images/';
export const POSTS_ON_ROW = 4;

export const ROLE_MAPPER = {
  'ROLE_ADMIN' : 'Admin',
  'ROLE_ADVERTISER' : 'Poster',
  'ROLE_USER' : 'User'
}

export function logOut() {
  localStorage.clear();
}

const request = (options, authToken = null) => {
    return requestWithContentType(options, 'application/json', authToken);
};

const requestWithHeaders = (options, headersProp, authToken = null) => {
  console.log('req with headers ', authToken);
  let headers = new Headers({});
  if(headersProp) {
    headers = new Headers(headersProp);
  }

  if(authToken) {
      headers.append('Authorization', 'Bearer ' + authToken)
  }

  const defaults = {headers: headers};
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options)
  .then(response =>
      response.json().then(json => {
          if(!response.ok) {
              return Promise.reject(json);
          }
          return json;
      })
  );
}

const requestWithContentType = (options, contentType, authToken = null) => {

  let headers = new Headers({});
  if(contentType) {
    headers = new Headers({
        'Content-Type': contentType,
    })
  }

  if(authToken) {
      headers.append('Authorization', 'Bearer ' + authToken)
  }

  const defaults = {headers: headers};
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options)
  .then(response =>
      response.json().then(json => {
          if(!response.ok) {
              return Promise.reject(json);
          }
          return json;
      })
  );
};

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function updateUserAvatar(avatar, authToken = null) {
  var formData = new FormData();
  formData.append("avatar", avatar);
  return requestWithContentType({
      url: API_BASE_URL + "/user/updateAvatar",
      method: 'PUT',
      body: formData,
  }, null, authToken);
}

export function signup(signupRequest, avatar) {

    var formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("signUpRequest", new Blob([JSON.stringify(signupRequest)], {
                    type: "application/json"}));

    return requestWithContentType({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: formData,
    }, null);
}

export function getCurrentUser(authToken = null) {
    console.log('getCurrentUser ', authToken);
    if(!authToken) {
        return Promise.reject("No access token set.");
    }

    return requestWithHeaders({url: API_BASE_URL + "/user/me",
                                method: 'GET'}, {
                                  'Cache-Control': 'no-cache, no-store, must-revalidate',
                                  'Pragma': 'no-cache',
                                  'Expires': 0,
                                  'Content-Type': 'application/json',
                                }, authToken)

    // return request({
    //     url: API_BASE_URL + "/user/me",
    //     method: 'GET'
    // });
}

export function getMyJobPosts(page, size, authToken = null) {
  page = page || 0;
  size = size || POSTS_ON_ROW;

  return request({
      url: API_BASE_URL + "/poster/posts/my?page=" + page + "&size=" + size,
      method: 'GET'
  }, authToken);
}

export function getAllJobPosts(page, size, authToken = null) {
  page = page || 0;
  size = size || POSTS_ON_ROW;

  return request({
      url: API_BASE_URL + "/poster/posts/?page=" + page + "&size=" + size,
      method: 'GET'
  },  authToken);
}

export function getUsers(page, size, authToken = null) {
  page = page || 0;
  size = size || 30;

   return request({
       url: API_BASE_URL + "/user/?page=" + page + "&size=" + size,
       method: 'GET'
   }, authToken);
}

export function getUserByUserName(username, authToken = null) {
  return request({
      url: API_BASE_URL + "/user/" + username,
      method: 'GET'
  }, authToken);
}

export function blockUser(id, authToken = null) {
  return request({
    url: API_BASE_URL + "/admin/user/block/" + id,
    method: 'PUT'
  }, authToken);
}

export function activateUser(id, authToken = null) {
  return request({
    url: API_BASE_URL + "/admin/user/activate/" + id,
    method: 'PUT'
  }, authToken);
}

export function forgotPassword(forgotPasswordRequest, authToken = null) {
  return request({
      url: API_BASE_URL + "/auth/forgotPassword",
      method: 'POST',
      body: JSON.stringify(forgotPasswordRequest)
  }, authToken);
}

export function resetPassword(resetPasswordRequest, authToken = null) {
  return request({
      url: API_BASE_URL + "/auth/resetPassword",
      method: 'POST',
      body: JSON.stringify(resetPasswordRequest)
  }, authToken);
}

export function getAvatar(authToken = null) {
  return requestWithContentType({
    url: API_BASE_URL + "/user/myAvatar",
    method: 'GET',
  }, null, authToken);
}

export function activateUserAuth(token, authToken = null) {
  return request({
      url: API_BASE_URL + "/auth/activate/" + token,
      method: 'PUT',
  });
}

export function updateGeneralInfo(userInfo, authToken = null) {
  return request({
    url: API_BASE_URL + "/user/updateMe/",
    method: 'PUT',
    body: JSON.stringify(userInfo)
  }, authToken);
}

export function changeUserPassword(passwordBody, authToken = null) {
  return request({
    url: API_BASE_URL + "/user/changeMyPassword/",
    method: 'PUT',
    body: JSON.stringify(passwordBody)
  }, authToken);
}

export function updateJobPost(body, avatar, authToken = null) {
  var formData = new FormData();
  formData.append("avatar", avatar);
  formData.append("jobPost", new Blob([JSON.stringify(body)], {
                  type: "application/json"}));
  return requestWithContentType({
    url: API_BASE_URL + "/poster/posts/" + body.id,
    method: 'PUT',
    body: formData
  }, null, authToken);
}

export function createJobPost(body, avatar, authToken = null) {
  var formData = new FormData();
  formData.append("avatar", avatar);
  formData.append("createPostRequest", new Blob([JSON.stringify(body)], {
                  type: "application/json"}));
  return requestWithContentType({
    url: API_BASE_URL + "/poster/posts/",
    method: 'POST',
    body: formData
  }, null, authToken);
}

export function deleteJobPost(postId, authToken = null) {
  return request({
    url: API_BASE_URL + "/poster/posts/" + postId,
    method: 'DELETE',
  }, authToken);
}

export function getJobPost(postId, authToken = null) {
  return request({
    url: API_BASE_URL + "/poster/posts/" + postId,
    method: 'GET',
  }, authToken);
}

export function checkUsername(username, authToken = null) {
   return request({
       url: API_BASE_URL + "/auth/check/username?username=" + username,
       method: 'GET'
   }, authToken);
}

export function checkEmail(email, authToken = null) {
   return request({
       url: API_BASE_URL + "/auth/check/email?email=" + email,
       method: 'GET'
   }, authToken);
}

export function getAllSkills(authToken = null) {
   return request({
       url: API_BASE_URL + "/skills",
       method: 'GET'
   }, authToken);
}
