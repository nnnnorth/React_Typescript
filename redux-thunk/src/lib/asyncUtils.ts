import {Ipost} from "../api/posts"

export const reducerUtils = {
  initial: (initialData = null) => ({
    loading: false,
    data: initialData,
    error: null
  }),
  loading: (prevState = null) => ({
    loading: true,
    data: prevState,
    error: null
  }),
  success: (payload: Array<Ipost>) => ({
    loading: false,
    data: payload,
    error: null
  }),
  error: (error: Error) => ({
    loading: false,
    data: null,
    error: error
  })
}

export const createPromiseThunk = (type: any, promiseCreator: any) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  // const thunkCreator = param => async dispatch => {
  return (param?: any) => async (dispatch: any) => {
  dispatch({type});
    try {
      const payload = await promiseCreator(param);
      dispatch({
        type: SUCCESS,
        payload
      });
    } catch(e) {
      dispatch({
        type: ERROR,
        payload: e,
        error: true,
      })
    }
  }
  // return thunkCreator;
}

export const handleAsyncActions = (type: any, key: any) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (prev: any, next: any) => {
    switch (next.type) {
      case type:
        return {
          ...prev,
          [key]: reducerUtils.loading()
        };
      case SUCCESS:
        return {
          ...prev,
          [key]: reducerUtils.success(next.payload)
        };
      case ERROR:
        return {
          ...prev,
          [key]: reducerUtils.error(next.payload)
        };
      default:
        return prev;
    }
  };
}