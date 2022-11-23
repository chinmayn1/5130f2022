import { combineReducers } from 'redux';

import CloudinaryUpload from "./CloudinaryUpload"
import Assessment from './Assessment';

export default combineReducers({
    CloudinaryUpload,
    Assessment
})