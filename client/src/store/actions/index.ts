import * as userActions from '../actions/userActions';
import * as toastActions from '../actions/toastActions';
import * as loginActions from '../actions/loginActions';

export const allActionCreators = {
    ...userActions,
    ...loginActions,
    ...toastActions
};
