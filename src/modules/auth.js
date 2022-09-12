import produce from 'immer';
import {handleActions, createAction} from 'redux-actions';

//액션타입
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

//액션생성함수
export const changeField = createAction(
    CHANGE_FIELD,
    ({form, key, value})=>({
        form,
        key,
        value
    }),
);

export const initializeForm = createAction(
    INITIALIZE_FORM,
    (form => form)
);

const initialState = {
    login: {
        username: '',
        password: '',
    }
}

const auth = handleActions(
    {
        [CHANGE_FIELD]: (state, {payload: {form, key, value}}) => 
            produce(state, draft => {
                draft[form][key] = value;
            }),
        [INITIALIZE_FORM]: (state, {payload: form })=> ({
            ...state,
            [form]: initialState[form]
        }),
    },
    initialState,
)

export default auth;
