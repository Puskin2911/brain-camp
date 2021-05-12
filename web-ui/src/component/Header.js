import {Row} from "react-bootstrap";
import React from "react";

export default function Header() {
    return (
        <Row className="justify-content-around border-bottom border-top p-2">
            <a className={"text-normal"} href={"/"}>
                <h3 className="entry-title">BrainCamp</h3>
            </a>
        </Row>
    )
}