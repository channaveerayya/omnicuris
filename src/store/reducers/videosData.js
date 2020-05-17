import * as ACTION_TYPES from "../actions/actionTypes";
const initState = {
  moduleDetails: []
};

const moduleList = (state, action) => {
  return state
};
const moduleListSuccess = (state, action) => {
  const updatedState = Object.assign({}, state, {
    moduleList: action.moduleList,
    introData: action.moduleList,
    chapterDetail: {
      content: action.moduleList.introVideo,
      title: 'Intruduction'
    },
    name: action.moduleList.name
  })
  return updatedState
}

const moduleDetailsSuccess = (state, action) => {
  const filterData = state.moduleDetails.filter(mod => mod.id !== action.moduleDetails.id)
  const updatedState = Object.assign({}, state, {
    moduleDetails: [...filterData, action.moduleDetails]
  })
  return updatedState
}

const chapterDetails = (state, action) => {
  const updatedState = Object.assign({}, state, {
    chapterDetail: action.chapterDetail,
    chList: action.chList
  })
  return updatedState
}

const expertPanel = (state, action) => {
  const updatedState = Object.assign({}, state, {
    ExpertPanel: action.ExpertPanel
  })
  return updatedState
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPES.MODULE_LIST_SUCCESS:
      return moduleListSuccess(state, action);
    case ACTION_TYPES.MODULE_DETAIL_SUCCESS:
      return moduleDetailsSuccess(state, action);
    case ACTION_TYPES.MODULE_LIST:
      return moduleList(state, action);
    case ACTION_TYPES.CHAPTER_DETAILS:
      return chapterDetails(state, action);
    case ACTION_TYPES.EXPERTS_SUCCESS:
      return expertPanel(state, action);
    default:
      return state;
  }
};

export default reducer;
