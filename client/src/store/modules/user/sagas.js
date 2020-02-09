import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { getProjectIdSuccess, getProjectIdFailure } from './actions';

export function* getProjectIdRequest({ payload }) {
    try {
        const { id } = payload.data;

        const response = yield call(api.get, `/users/project/${id}`);

        yield put(getProjectIdSuccess(response.data));
    } catch (err) {
        toast.error('There was a problem load your projects. Please verify your data');

        yield put(getProjectIdFailure());
    }
}

export default all([takeLatest('@user/GET_PROJECT_ID_REQUEST', getProjectIdRequest)]);
