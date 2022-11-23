import Configuration from "../pages/Configuration";
import Question from "../pages/Question";


import NotFound from "../error/404";

//! The isRestricted propeerty for a route will restrict the user for direct access and the redirecTo path will be redirected. if None given for true the defualt will /
export default [
    {
        path: "/",
        component: Configuration,
        isExact: true,
        isRestricted: false
    },
    {
        path: "/questions",
        component: Question,
        isExact: true,
        isRestricted: false,
        redirectTo: "/"
    },
    {
        path: "*",
        component: NotFound,
        isExact: true,
        isRestricted: false
    }
]