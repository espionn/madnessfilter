let mobName = "Regenerative Blood";
let deathMap = new Map();
let showPadIfTrue = true; //true = only show pad, false = remove pad

initializePinForFight = (fight) => {
    fight.events.forEach(event => {
        if (event.type === "death" && event.target && event.target.name === mobName) {
            deathMap.set(event.targetInstanceId, event.timestamp); 
        }
    });
};

pinMatchesFightEvent = (event, fight) => {
    if (
        event.type === "damage" &&
        event.target &&
        event.target.name === mobName && 
        (
            event.timestamp <= deathMap.get(event.targetInstanceId) - 8000 ||
            event.timestamp >= deathMap.get(event.targetInstanceId)
        )
    ) {
        return showPadIfTrue;
    }
    return !showPadIfTrue;
};
