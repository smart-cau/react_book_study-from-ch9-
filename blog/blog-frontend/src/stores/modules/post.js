import { createAction, handleActions } from "redux-actions";

import { Map, fromJS } from "immutable";
import { pender } from "redux-pender";

import * as api from "lib/api";

// action types
const GET_POST = "post/GET_POST";
const REMOVE_POST = "post/REMOVE_POST";

// action creators
export const getPost = createAction(GET_POST, api.getPost);
export const removePost = createAction(REMOVE_POST, api.removePost);

// initial state
const initialState = Map({
  post: Map({}) // Map 객체 안의 Map 객체 구조.
});

// reducer
export default handleActions(
  {
    ...pender({
      type: GET_POST,
      onSuccess: (state, action) => {
        const { data: post } = action.payload;
        return state.set("post", fromJS(post)); // fromJs() --> 일반 객체를 immutabler 객체로 전환.
      }
    })
  },
  initialState
);
