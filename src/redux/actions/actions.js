import Axios from 'axios';
import { API } from '../../services/api';

export const DATA_LOADING = 'Loading';
export const GETSTORIES = 'GetStories';

/**
 *  actions
 */
export const loading = (data) => {
    return {
        type: DATA_LOADING,
        payload: data,
    };
};

export const getStory = (data) => {
    return {
        type: GETSTORIES,
        payload: data
    }
}

/**
 *  action creators
 */
export const loadingAction = (data) =>
    async (dispatch) => {
        await dispatch(loading(data));
    };

export const fetchStories = (tags, page) =>
    async (dispatch) => {
        await Axios.get(API.fetchPost(tags, page))
            .then((response) => {
                dispatch(getStory(response.data))
            })
            .catch((e) => {
            })
    }