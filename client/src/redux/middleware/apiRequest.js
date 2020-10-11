import { API_REQUEST } from "../actions/apiRequest";
import Axios from "axios";

const PORT =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

const apiRequest = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === API_REQUEST) {
    const { method, url, onSucces, onError, body, config } = action.meta;
    Axios({
      method: method,
      url: url,
      data: body,
      config: config,
      baseURL: PORT
    })
      .then(({ data }) => {
        dispatch(onSucces(data));
      })
      .catch(({ response }) => {
        dispatch(onError(response));
      });
  }
};

export default apiRequest;
