import { takeLatest, call, put, all } from 'redux-saga/effects';
import history from '~/services/history';
import api from '~/services/singInService';
import { singInRequest } from './actions';

export function* singIn({ payload }) {
    const { email, password } = payload;

    const response = yield call(api.login, 'sessions', {
        email,
        password,
    });

    const { token, user } = response.data;

    if (!user) {
        return console.log('nenhum usuario emncontrado');
    }

    yield put(singInRequest(token, user));

    history.push('/main');
}

export default all([takeLatest('@auth/SING_IN_REQUEST', singIn)]);
