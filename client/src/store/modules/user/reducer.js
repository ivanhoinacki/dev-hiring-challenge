import produce from 'immer';

const INITIAL_STATE = {
    profile: null,
    projects: {},
};

export default function user(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@auth/LOG_IN_SUCCESS': {
                draft.profile = action.payload.user;
                break;
            }
            case '@user/FIND_ALL_PROJECT_REQUEST': {
                draft.projects = action.payload.projects;
                break;
            }
            case '@auth/LOG_OUT': {
                draft.profile = null;
                break;
            }
            default:
        }
    });
}
