import React from "react";
import {Redirect, Route} from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import authService from "../../service/AuthService";
import localStorageHelper from "../../utils/localStorageHelper";
import {useDispatch, useSelector} from "react-redux";
import AuthAction from "../../store/action/AuthAction";

const PrivateRoute = ({component: Component, ...rest}) => {
    const isAuthenticated = useSelector(state => {
        return state.auth.isAuthenticated
    })

    const dispatch = useDispatch()

    const [isLoading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const token = localStorageHelper.getCookie("access_token")
        console.log("Token", token)
        if (token.length > 0) {
            authService.validateUser(token)
                .then(res => {
                    console.log(res);
                    dispatch({
                        type: AuthAction.initAuthenticated,
                        payload: res.data
                    })
                })
                .catch((error) => {
                    console.log(error.response);
                }).finally(() => {
                setLoading(false);
            });
        } else {
            setLoading(false)
        }
    }, [dispatch]);

    if (isLoading) return <LoadingIndicator/>;

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ?
                    <Component {...rest} {...props}/>
                    :
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: {from: props.location}
                        }}
                    />
            }
        />
    );
};

export default PrivateRoute;