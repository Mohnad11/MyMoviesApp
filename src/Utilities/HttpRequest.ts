
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {Alert} from "react-native";
import Consts from "./Consts";

export default async function HttpRequest(url: string,method:any, data?: any) {

    return axios.request({
        url: url,
        baseURL: Consts.API_URL,
        method:method,
        data:data,
        headers: {
            'Authorization': 'Bearer ' + Consts.API_KEY,
        },



    }).then((result: AxiosResponse) => {
        return Promise.resolve(result);

    }).catch((err: AxiosError) => {
        return Promise.reject(err.response);
    });
}
