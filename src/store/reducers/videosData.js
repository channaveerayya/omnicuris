import * as ACTION_TYPES from "../actions/actionTypes";
const initState = {};

const moduleList = (state, action) => {
  return state
};
const moduleListSuccess = (state, action) => {
  const updatedState = Object.assign({}, state, {
    moduleList: action.moduleList
  })
  return updatedState
}
const reducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPES.MODULE_LIST_SUCCESS:
      return moduleListSuccess(state, action);
    case ACTION_TYPES.MODULE_LIST:
      return moduleList(state, action);
    default:
      return state;
  }
};

export default reducer;
