import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store";
import {bindActionCreators} from "redux";
import {allActionCreators} from "../store/actions";

export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAction = () => {
    const dispatch = useTypedDispatch();
    return bindActionCreators(allActionCreators, dispatch);
};
