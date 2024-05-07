import { setUser } from "../slices/user";
import { setUserLoading } from "../slices/user";
import { setUserName } from "../slices/user";
import { setReload } from "../slices/state";

const setUserAction = (user, dispatch) => {
    dispatch(setUser(user));
}

const setUserLoadingAction = (loading, dispatch) => {
    dispatch(setUserLoading(loading));
}

const setUserNameAction = (userName, dispatch) => {
    dispatch(setUserName(userName));
}

const setStateAction = (state, dispatch) => {
    dispatch(setReload(state));
}

export {setUserAction, setUserLoadingAction, setUserNameAction, setStateAction};