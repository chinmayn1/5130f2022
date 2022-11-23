import * as api from "../api";


export const CloudinaryUpload = (formData) => async (dispatch) => {

    try {
        const data = await api.CloudinaryUpload(formData);

        dispatch({ type: "UPLOAD", payload: data })
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response })
    }
}