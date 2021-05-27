import {Button, Col, Container, Form, Row} from "react-bootstrap";
import React, {useState} from "react";
import {useHistory} from "react-router";
import {useLocation} from "react-router-dom";
import localStorageHelper from "../utils/localStorageHelper";
import authService from "../service/AuthService";
import {useDispatch} from "react-redux";
import LoadingIndicator from "./common/LoadingIndicator";

export default function Login() {

    const history = useHistory();
    const location = useLocation();
    const {from} = location.state || {from: {pathname: "/"}};
    console.log("From", from)
    const [isLoading, setLoading] = React.useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch()

    if (from.pathname === "/") {
        const token = localStorageHelper.getCookie("access_token")
        if (token.length > 0) {
            authService.validateUser(token)
                .then(() => {
                    history.push("/ton");
                })
                .catch((error) => {
                    console.log(error.response);
                }).finally(() => {
                setLoading(false);
            });
        } else {
            setLoading(false)
        }
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
                localStorageHelper.setCookie("access_token", res.data.accessToken, res.data.expiredDays, false);
                history.replace(from);
            })
            .catch((error) => {
                setLoading(false);
            });
    }

    if (isLoading) return <LoadingIndicator/>

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