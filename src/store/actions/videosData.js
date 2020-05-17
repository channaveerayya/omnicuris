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

export const getModuleDetails = (moduleId) => {
  return dispatch => {
    axios
      .get(null, moduleId)
      .then(res => {
        dispatch(moduleDetailsSuccess({ ...res.data, id: moduleId.params.moduleId }));
      })
      .catch(error => {
        dispatch(moduleDetailsFail(error));
      });
  };
};

export const setChapterDetails = (chapterDetail, chList) => {
  return {
    type: ACTION_TYPES.CHAPTER_DETAILS,
    chapterDetail: chapterDetail,
    chList: chList
  };
};

export const moduleDetailsSuccess = (moduleDetails) => {
  return {
    type: ACTION_TYPES.MODULE_DETAIL_SUCCESS,
    moduleDetails: moduleDetails
  };
};

export const moduleDetailsFail = (error) => {
  return {
    type: ACTION_TYPES.MODULE_DETAIL_FAIL,
    error: error
  };
};



export const getExpertPanel = (url) => {
  return dispatch => {
    axios
      .get(url)
      .then(res => {
        dispatch(expertPanelSuccess(res.data));
      })
      .catch(error => {
        dispatch(expertPanelFail(error));
      });
  };
};

export const expertPanelSuccess = (ExpertPanel) => {
  return {
    type: ACTION_TYPES.EXPERTS_SUCCESS,
    ExpertPanel: ExpertPanel
  };
};

export const expertPanelFail = (error) => {
  return {
    type: ACTION_TYPES.EXPERTS_FAIL,
    error: error
  };
};