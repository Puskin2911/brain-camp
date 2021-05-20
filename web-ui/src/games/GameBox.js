import {Card} from "react-bootstrap";
import React from "react";

function GameBox(props) {
    const gameInfo = props.gameInfo;
    return (
        <Card border="success" className={"my-4 flip-card"}>
            <Card.Header className="text-success card">{gameInfo.name}</Card.Header>
            <Card.Body>
                <div className="flip-card-front p-0 m-0">
                    <img src={gameInfo.avatar} alt="avatar" width="100%"/>
                </div>
                <div className="flip-card-back">
                    <ul className={"border-bottom"}>
                        <li>Skill: {gameInfo.skills}</li>
                    </ul>
                    <div className="text-center mt-5">
                        <h2><a href={"/" + gameInfo.textId}>Train now</a></h2>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default GameBox;