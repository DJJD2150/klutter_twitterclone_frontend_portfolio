import { createBrowserHistory } from "history";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducers as authReducers } from "./auth";
import { reducers as userReducers } from "./users";
import { reducers as messagesReducers } from "./messages";
import { reducers as likesReducers } from "./likes";

export * from "./auth";
export * from "./users";
export * from "./messages";
export * from "./likes";

export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});

export const store = configureStore({
  reducer: {
    router: connectRouter(history),
    auth: combineReducers(authReducers),
    user: combineReducers(userReducers),
    messages: combineReducers(messagesReducers),
    likes: combineReducers(likesReducers)
  },
  preloadedState: {},
  devTools: process.env.NODE_ENV !== "production"
});

store.subscribe(() => {
  localStorage.setItem("login", JSON.stringify(store.getState().auth.login));
});
