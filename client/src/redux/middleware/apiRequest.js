import { API_REQUEST } from "../actions/apiRequest";
import Axios from "axios";

const apiRequest = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === API_REQUEST) {
    const { method, url, onSucces, onError, body, config } = action.meta;
    Axios({
      method: method,
      url: url,
      data: body,
      config: config,
    })
      .then(({ data }) => {
        dispatch(onSucces(data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(onError(err));
      });
  }
};

export default apiRequest;
