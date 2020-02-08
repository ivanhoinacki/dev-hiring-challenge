import axios from 'axios';
import { url } from '~/config';

export default class SingUpService {
    static createUser(data) {
        return axios({
            method: 'post',
            url: `${url}/v1/users`,
            data: data,
        });
    }
}
