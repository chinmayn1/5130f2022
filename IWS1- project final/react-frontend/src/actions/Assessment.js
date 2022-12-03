import * as Api from "../api"

export const getAssessment = (user_id, assessment_id) => async (dispatch) => {

    try {
        const response = await Api.getAssessment(user_id, assessment_id);
        dispatch({ type: "FETCH", payload: response })
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.payload })
    }
}