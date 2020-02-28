export function findAllProjectRequest(data) {
    return {
        type: '@user/FIND_ALL_PROJECT_REQUEST',
        payload: { data },
    };
}

export function getByIdProjectRequest(data) {
    return {
        type: '@user/GET_BYID_PROJECT_REQUEST',
        payload: { data },
    };
}

export function getByIdProjectSuccess(data) {
    return {
        type: '@user/GET_BYID_PROJECT_SUCCESS',
        payload: { data },
    };
}

export function findAllProjectSuccess(data) {
    return {
        type: '@user/FIND_ALL_PROJECT_SUCCESS',
        payload: { data },
    };
}

export function deleteProjectRequest(data) {
    return {
        type: '@user/DELETE_PROJECT_REQUEST',
        payload: { data },
    };
}

export function deleteProjectSuccess(data) {
    return {
        type: '@user/DELETE_PROJECT_SUCCESS',
        payload: { data },
    };
}

export function getProjectFailure() {
    return {
        type: '@user/GET_PROJECT_FAILURE',
    };
}
