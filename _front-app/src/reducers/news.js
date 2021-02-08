import { GET_NEWS, NEWS_ERR, GET_NEWS_EL, SEND_NEWS } from "../actions/types";

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
};

export default function( state = initialState, actions) {
    const {type, payload} = actions;

    switch (type) {
        case GET_NEWS:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case GET_NEWS_EL:
            return {
                ...state,
                post: payload,
                loading: false
            }
        case SEND_NEWS:
            return {
                ...state,
                post: payload,
                loading: false
            }
        case NEWS_ERR: 
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }
}
