import React from "react";
import { Route, Redirect } from "react-router-dom";


const AppRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => {
            if ({ ...rest }.isRestricted) {
                if (props.history.action !== "POP") {
                    return <Component {...props} />
                } else {
                    return <Redirect to={{ ...rest }.redirectTo ? { ...rest }.redirectTo : "/"} />
                }
            }
            else {
                return <Component {...props} />
            }
        }
        } />

    )
}
export default AppRoute