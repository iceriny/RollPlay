/**
 * 投一次骰子
 * @param {number} number 骰子面数
 */
function Dice(number) {
    return Math.floor(Math.random() * number) + 1;
}

function Play() {
    /**
     * @type {[name:string, score:number][]}
     */
    const list = [];
    const results = new Set();
    for (const [playerName, enabled] of PlayerMap) {
        if (!enabled) continue;
        const info = [playerName];

        let result = -1;
        let reRoll = true;
        let rollCount = 0;
        do {
            rollCount++;
            result = Dice(100);
            if (!results.has(result)) {
                results.add(result);
                reRoll = false;
            }
            if (rollCount === 100) {
                results.add(result);
                reRoll = false;
            }
        } while (reRoll);

        info.push(result);
        list.push(info);
    }
    if (list.length === 0) return;
    list.sort((a, b) => b[1] - a[1]);
    InsertResult(list);
}
function InsertResult(result) {
    const firstResultElement = ResultContainerElement.firstElementChild;
    if (firstResultElement && firstResultElement.className === "result-item") {
        setResultItemStyle(firstResultElement);
    }
    const r = createResultElement(result);
    r.classList.add("show-animation-class");
    ResultContainerElement.insertBefore(r, ResultContainerElement.firstElementChild);
    setTimeout(() => {
        r.classList.remove("show-animation-class");
    }, 3000);
}
