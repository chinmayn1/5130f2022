
import axios from "axios";

const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL || "http://localhost:5000/api/v1"

export const CloudinaryUpload = (formData) => axios.post("https://api.cloudinary.com/v1_1/dhpazkhep/image/upload", formData)


export const getAssessment = () => axios.get(`${BACKEND_BASE_URL}/new-assessment/question/merge/1`)