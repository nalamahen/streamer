import streams from "../apis/streams";
import history from "../hitstory";
import {
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM,
  EDIT_STREAM,
  SIGN_IN,
  SIGN_OUT,
} from "./types";

export const signIn = (userdId: string) => {
  return {
    type: SIGN_IN,
    payload: userdId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const createStream = (formValues: any) => {
  return async (dispatch: any, getState: any) => {
    const { userId } = getState().auth;
    const response = await streams.post("/streams", { ...formValues, userId });

    dispatch({
      type: CREATE_STREAM,
      payload: response.data,
    });
    history.push("/");
  };
};

export const fetchStreams = () => async (dispatch: any) => {
  const response = await streams.get("/streams");

  dispatch({
    type: FETCH_STREAMS,
    payload: response.data,
  });
};

export const fetchStream = (id: string) => async (dispatch: any) => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({
    type: FETCH_STREAM,
    payload: response.data,
  });
};

export const editStream = (id: string, formValues: any) => async (
  dispatch: any
) => {
  const response = await streams.patch(`/streams/${id}`, formValues);

  dispatch({
    type: EDIT_STREAM,
    payload: response.data,
  });
  history.push("/");
};

export const deleteStream = (id: string) => async (dispatch: any) => {
  await streams.delete(`/streams/${id}`);

  dispatch({
    type: DELETE_STREAM,
    payload: id,
  });
};
