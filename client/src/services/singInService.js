import axios from 'axios';
import { url } from '~/config';

export default class SingInService {
    static login(data) {
        console.log(data);
        return axios({
            method: 'post',
            url: `${url}/v1/session`,
            data: data,
        });
    }
}
