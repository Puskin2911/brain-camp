import {Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {mockTrainers} from "../mockData";

export default function HonorTable() {
    const [trainers, setTrainers] = useState([]);

    useEffect(() => {
        setTrainers(mockTrainers());
    }, [])

    return (
        <div>
            <h3 className={"text-center"}>Table of honor</h3>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Trainer</th>
                    <th>Elo</th>
                </tr>
                </thead>
                <tbody>
                {
                    trainers.map((trainer, index) => {
                        return (
                            <tr key={trainer.id}>
                                <td>{index + 1}</td>
                                <td>{trainer.username}</td>
                                <td>{trainer.elo}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
        </div>
    )
}