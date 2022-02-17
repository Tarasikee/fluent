import * as userActions from '../actions/userActions';
import * as toastActions from '../actions/toastActions';

export const allActionCreators = {
    ...userActions,
    ...toastActions
};
