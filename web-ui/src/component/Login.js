import {Button, Col, Container, Form, Row} from "react-bootstrap";
import React, {useState} from "react";
import {useHistory} from "react-router";
import {useLocation} from "react-router-dom";
import localStorageHelper from "../utils/localStorageHelper";
import authService from "../service/AuthService";
import LoadingIndicator from "./common/LoadingIndicator";

export default function Login() {

    const history = useHistory();
    const location = useLocation();
    const {from} = location.state || {from: {pathname: "/"}};
    const [isLoading, setLoading] = React.useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    if (from.pathname === '/' && isLoading) {
        const isLoggedIn = localStorageHelper.getCookie("loggedIn");
        if (!isLoggedIn) {
            setLoading(false);
        } else {
            authService.validateUser()
                .then(res => {
                    console.log("from login", res);
                    history.replace("game");
                })
                .catch((error) => {
                    console.log("from login", error.response);
                    setLoading(false);
                });
        }

        return <LoadingIndicator/>;
    }

    const handleLogin = (event) => {
        event.preventDefault();

        setLoading(true);

        const userInfo = {
            username: username,
            password: password
        };

        authService.login(userInfo)
            .then(res => {
                console.log(res);

                localStorageHelper.setCookie("loggedIn", true, 10, false);
                localStorageHelper.setCookie("access-token", res.data.accessToken, res.data.expiredDays, false);
                history.replace(from);
            })
            .catch((error) => {
                setLoading(false);
            });
    }

    return (
        <Container>
            <Row className={"justify-content-center"}>
                <Col sm={6}>
                    <Form>
                        <Form.Control type={"text"} placeholder={"username"} value={username}
                                      onChange={event => setUsername(event.target.value)}/>
                        <Form.Control type={"password"} placeholder={"password"} value={password}
                                      onChange={event => setPassword(event.target.value)}/>
                        <Button type={"button"} onClick={handleLogin}>Login</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}