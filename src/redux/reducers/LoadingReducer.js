import { SET_DISPLAY_LOADING, SET_HIDDENT_LOADING } from "../types/LoadingType"

const initialState = {
    visible: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_DISPLAY_LOADING: {
            return { ...state, visible: true }
        }
        case SET_HIDDENT_LOADING: {
            return { ...state, visible: false }
        }
        default:
            return state
    }
}
