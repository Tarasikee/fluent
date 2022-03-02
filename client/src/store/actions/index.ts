import * as userActions from '../actions/userActions';
import * as toastActions from '../actions/toastActions';
import * as loginActions from '../actions/loginActions';
import * as basketActions from '../actions/basketActions';

export const allActionCreators = {
    ...userActions,
    ...loginActions,
    ...toastActions,
    ...basketActions
};
