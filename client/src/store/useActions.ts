import { ActionCreatorsMapObject, bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'

import { AppDispatch } from './store'

export const useActions = <A, M extends ActionCreatorsMapObject<A>>(action: M) => {
    const dispatch = useDispatch<AppDispatch>()
    return bindActionCreators(action, dispatch)
}
