let mobName = "Regenerative Blood";
let deathMap = new Map();
let healMap = new Map();
let showPadIfTrue = true; //true = only show pad, false = remove pad

initializePinForFight = (fight) => {
    fight.events.forEach(event => {
        if (event.type === "death" && event.target?.name === mobName) {
            deathMap.set(event.targetInstanceId, event.timestamp); 
        }
        if (event.type === "heal" && event.target?.name === mobName) {
            healMap.set(event.targetInstanceId, event.timestamp); 
        }
    });
};

pinMatchesFightEvent = (event, fight) => {
    if (
        event.type === "damage" &&
        event.target &&
        event.target.name === mobName && 
        (
            event.timestamp <= healMap.get(event.targetInstanceId) ||
            event.timestamp >= deathMap.get(event.targetInstanceId)
        )
    ) {
        return showPadIfTrue;
    }
    return !showPadIfTrue;
};
