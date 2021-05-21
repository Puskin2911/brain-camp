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

const tonService = {
    resolveEnemy
}

export default tonService;