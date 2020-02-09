export function getProjectIdRequest(data) {
    return {
        type: '@user/GET_PROJECT_ID_REQUEST',
        payload: { data },
    };
}

export function getProjectIdSuccess(data) {
    return {
        type: '@user/GET_PROJECT_SUCCESS',
        payload: { data },
    };
}

export function getProjectIdFailure() {
    return {
        type: '@user/GET_PROJECT_FAILURE',
    };
}
