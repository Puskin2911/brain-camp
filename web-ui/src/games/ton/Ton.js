import React from "react";
import {useSelector} from "react-redux";
import TonLobby from "./TonLobby";
import TonRoom from "../../store/action/TonRoom";

export default function Ton() {

    const isInRoom = useSelector(state => {
        return state.games.Ton.isInRoom
    })


    if (isInRoom) {
        return <TonRoom/>
    } else {
        return <TonLobby/>
    }
}