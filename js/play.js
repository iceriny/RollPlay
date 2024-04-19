/**
 * 投一次骰子
 * @param {number} number 骰子面数
 */
function Dice(number) {
    return Math.floor(Math.random() * number) + 1;
}

function Play() {
    /**
     * @type {[string, number][]}
     */
    const list = [];
    for (const p of PlayerMap) {
        if (!p[1]) continue;
        const info = [p[0]];
        info.push(Dice(100));
        list.push(info);
    }
    list.sort((a, b) => b[1] - a[1]);
    InsertResult(list);
}
function InsertResult(result) {
    const firstResultElement = ResultContainerElement.firstElementChild;
    if (firstResultElement && firstResultElement.className === "result-item") {
        setResultItemStyle(firstResultElement);
    }
    ResultContainerElement.insertBefore(createResultElement(result), ResultContainerElement.firstElementChild);
}

