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
    if (list.length === 0) return;
    list.sort((a, b) => b[1] - a[1]);
    InsertResult(list);
}
function InsertResult(result) {
    const firstResultElement = ResultContainerElement.firstElementChild;
    if (firstResultElement && firstResultElement.className === "result-item") {
        setResultItemStyle(firstResultElement);
    }
    const r = createResultElement(result)
    r.classList.add("show-animation-class");
    ResultContainerElement.insertBefore(r, ResultContainerElement.firstElementChild);
    setTimeout(() => {
        r.classList.remove("show-animation-class");
    }, 3000);
}

