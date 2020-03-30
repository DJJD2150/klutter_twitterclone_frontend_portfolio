import {
  domain,
  jsonHeaders,
  handleJsonResponse,
  asyncInitialState,
  asyncCases,
  createActions,
  createReducer
} from "./helpers";

const LOGOUT = createActions("logout");

// create user
const CREATE_USER = createActions("createUser");
export const createUser = createUserData => dispatch => {
  dispatch(CREATE_USER.START());

  return fetch(domain + "/users/", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(createUserData)
  })
    .then(handleJsonResponse)
    .then(result => dispatch(CREATE_USER.SUCCESS(result)))
    .catch(err => Promise.reject(dispatch(CREATE_USER.FAIL(err))));
};

// get user data
const GET_USER = createActions("getUser");
export const getUser = () => (dispatch, getState) => {
  dispatch(GET_USER.START());

  const { username } = getState().auth.login.result;

  return fetch(domain + "/users/" + username, {
    method: "GET",
    headers: jsonHeaders
  })
    .then(handleJsonResponse)
    .then(result => dispatch(GET_USER.SUCCESS(result)))
    .catch(err => Promise.reject(dispatch(GET_USER.FAIL(err))));
};

const SET_PROFILE_BIO = createActions("setProfileBio");
export const setProfileBio = setProfileBioData => (dispatch, getState) => {
  dispatch(SET_PROFILE_BIO.START());

  const { username, token } = getState().auth.login.result;
  
  return fetch(domain + "/users/" + username, {
    method: "PATCH",
    headers: { Authorization: "Bearer " + token, ...jsonHeaders },
    body: JSON.stringify(setProfileBioData)
  })
    .then(handleJsonResponse)
    .then(result => dispatch(SET_PROFILE_BIO.SUCCESS(result)))
    .catch(err => Promise.reject(dispatch(SET_PROFILE_BIO.FAIL(err))));
};

// set profile picture
const SET_PROFILE_PIC = createActions("setProfilePic");
export const setProfilePic = setProfilePicData => (dispatch, getState) => {
  dispatch(SET_PROFILE_PIC.START());

  let data = new FormData(setProfilePicData);

  const { username, token } = getState().auth.login.result;

  return fetch(domain + `/users/${username}/picture`, {
    method: "PUT",
    headers: { Authorization: "Bearer " + token, Accept: "application/json" },
    body: data
  })
    .then(handleJsonResponse)
    .then(result => dispatch(SET_PROFILE_PIC.SUCCESS(result)))
    .catch(err => Promise.reject(dispatch(SET_PROFILE_PIC.FAIL(err))));
};

// delete the user that's currently logged on
const DELETE_USER = createActions("deleteUser");
export const deleteUser = deleteUserData => (dispatch, getState) => {
  dispatch(DELETE_USER.START());

  const { username, token } = getState().auth.login.result;

  return fetch(domain + `/users/${username}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token, ...jsonHeaders }
  })
    .then(handleJsonResponse)
    .then(result => dispatch(DELETE_USER.SUCCESS(result)))
    .catch(err => Promise.reject(dispatch(SET_PROFILE_PIC.FAIL(err))))
    .then(result => dispatch(LOGOUT.SUCCESS(result)));
};

export const reducers = {
  createUser: createReducer(asyncInitialState, {
    ...asyncCases(CREATE_USER)
  }),
  getUser: createReducer(asyncInitialState, {
    ...asyncCases(GET_USER)
  }),
  setProfileBio: createReducer(asyncInitialState, {
    ...asyncCases(SET_PROFILE_BIO)
  }),
  setProfilePic: createReducer(asyncInitialState, {
    ...asyncCases(SET_PROFILE_PIC)
  }),
  deleteUser: createReducer(asyncInitialState, {
    ...asyncCases(DELETE_USER)
  })
};
