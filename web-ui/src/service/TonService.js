const resolveEnemy = (players, me, isAfterGuy) => {
    let resolvedPlayer = null;
    players.forEach(player => {
        if (isAfterGuy) {
            if (me.slot === 1 && player.slot === 2) {
                resolvedPlayer = player;
            }
            if (me.slot === 2 && player.slot === 3) {
                resolvedPlayer = player;
            }
            if (me.slot === 3 && player.slot === 4) {
                resolvedPlayer = player;
            }
            if (me.slot === 4 && player.slot === 1) {
                resolvedPlayer = player;
            }
        } else {
            if (me.slot === 1 && player.slot === 4) {
                resolvedPlayer = player;
            }
            if (me.slot === 2 && player.slot === 1) {
                resolvedPlayer = player;
            }
            if (me.slot === 3 && player.slot === 2) {
                resolvedPlayer = player;
            }
            if (me.slot === 4 && player.slot === 3) {
                resolvedPlayer = player;
            }
        }
    })

    return resolvedPlayer;
}

const resolveTeamMate = (players, me) => {
    let resolvedPlayer = null;
    players.forEach(player => {
        if (player.team === me.team && player.username !== me.username) {
            resolvedPlayer = player
        }
    })
    return resolvedPlayer
}

const updatePlayerReady = (players, readyMessage) => {
    const newPlayers = [...players];

    newPlayers.forEach(player => {
        if (player.username === readyMessage.username) {
            player.ready = readyMessage.ready
        }
    })

    return newPlayers;
}

const updateMeReady = (me, readyMessage) => {
    const newMe = {...me}
    newMe.ready = readyMessage.ready

    return newMe
}

const tonService = {
    resolveEnemy,
    resolveTeamMate,
    updatePlayerReady,
    updateMeReady
}

export default tonService;