export function findAllProjectsRequest(data) {
    return {
        type: '@user/FIND_ALL_PROJECT_REQUEST',
        payload: { data },
    };
}

export function findAllProjectsSuccess(projects) {
    return {
        type: '@user/UPDATE_PROFILE_SUCCESS',
        payload: { projects },
    };
}

export function findAllProjectsFailure() {
    return {
        type: '@user/UPDATE_PROFILE_FAILURE',
    };
}
