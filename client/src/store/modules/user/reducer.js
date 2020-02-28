import produce from 'immer';

const INITIAL_STATE = {
    profile: null,
    currentProject: null,
    allProjects: null,
};

export default function user(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@auth/LOG_IN_SUCCESS': {
                draft.profile = action.payload.user;
                break;
            }
            case '@user/GET_BYID_PROJECT_SUCCESS': {
                draft.currentProject = action.payload.data;
                break;
            }
            case '@user/FIND_ALL_PROJECT_SUCCESS': {
                draft.allProjects = action.payload.data;
                if (!state.currentProject) {
                    draft.currentProject = action.payload.data[0];
                }
                break;
            }
            case '@user/DELETE_PROJECT_SUCCESS': {
                draft.allProjects = action.payload.data;
                draft.currentProject = action.payload.data[0];
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
