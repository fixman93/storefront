import { ajaxConstants } from "../actions/ajaxStatusActions";

function actionTypeEndsInSuccess(type) {
  return type.indexOf("_SUCCESS") !== -1;
}

export function ajaxStatus(
  state = {
    loading: false
  },
  action
) {
  if (action.type === ajaxConstants.BEGIN_AJAX_CALL) {
    return {
      loading: true
    };
  } else if (
    action.type === ajaxConstants.AJAX_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)
  ) {
    return {
      loading: false
    };
  }

  return state;
}

export default ajaxStatus;
