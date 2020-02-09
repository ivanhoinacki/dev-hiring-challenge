import produce from 'immer';

const INITIAL_STATE = {
    profile: null,
    currentProject: null,
};

export default function user(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@auth/LOG_IN_SUCCESS': {
                draft.profile = action.payload.user;
                break;
            }
            case '@user/GET_PROJECT_SUCCESS': {
                draft.currentProject = action.payload.data;
                break;
            }
            case '@auth/LOG_OUT': {
                draft.profile = null;
                draft.currentProject = null;
                break;
            }
            default:
        }
    });
}
