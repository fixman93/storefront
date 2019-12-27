export const ajaxConstants = {
    BEGIN_AJAX_CALL: 'BEGIN_AJAX_CALL',
    AJAX_CALL_ERROR: 'AJAX_CALL_ERROR',
  
  }
  
  export function beginAjaxCall() {
    return {
      type: ajaxConstants.BEGIN_AJAX_CALL
    };
  }
  
  export function ajaxCallError() {
    return {
      type: ajaxConstants.AJAX_CALL_ERROR
    };
  }