import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { findAllProjectsSuccess, findAllProjectsFailure } from './actions';

export function* findAllProjects({ payload }) {
    try {
        const { id } = payload.data;

        const response = yield call(api.get, `/users/${id}/project`);

        yield put(findAllProjectsSuccess(response.data));
    } catch (err) {
        toast.error('There was a problem load your projects. Please verify your data');

        yield put(findAllProjectsFailure());
    }
}

export default all([takeLatest('@user/FIND_ALL_PROJECT_REQUEST', findAllProjects)]);
