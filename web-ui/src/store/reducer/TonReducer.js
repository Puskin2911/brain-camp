import TonAction from "../action/TonAction";

const initState = {
    isInRoom: false
};

export default function tonReducer(state = initState, action) {
    switch (action.type) {
        case TonAction.initRoom:
            return {
                ...state,
                isInRoom: true,
                players: action.payload.room.players,
                caves: action.payload.room.caves,
                me: action.payload.me
            }
        case TonAction.updatePlayers:
            return {
                ...state,
                players: action.payload
            }
        case TonAction.updateMe:
            return {
                ...state,
                me: action.payload
            }
        default:
            return state
    }
}