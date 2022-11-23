import * as Api from "../api"

export const getAssessment = () => async (dispatch) => {

    try {
        const response = await Api.getAssessment();
        dispatch({ type: "FETCH", payload: response })
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.payload })
    }
}