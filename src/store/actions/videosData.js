import * as ACTION_TYPES from "./actionTypes";
import axios from "../../axios-interceptor";

export const getModuleList = (params) => {
  return dispatch => {
    axios
      .get(null, params)
      .then(res => {
        dispatch(moduleListSuccess(res.data.courseDetails));
      })
      .catch(error => {
        dispatch(moduleListFail(error));
      });
  };
};

export const getModuleDetails = (moduleId) => {
  return dispatch => {
    axios
      .get(null,moduleId)
      .then(res => {
        dispatch(moduleListSuccess(res.data.courseDetails));
      })
      .catch(error => {
        dispatch(moduleListFail(error));
      });
  };
};

export const moduleListSuccess = (moduleList) => {
  return {
    type: ACTION_TYPES.MODULE_LIST_SUCCESS,
    moduleList: moduleList
  };
};

export const moduleListFail = (error) => {
  return {
    type: ACTION_TYPES.MODULE_LIST_FAIL,
    error: error
  };
};