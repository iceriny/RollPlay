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
    for (const p of PlayerList) {
        const info = [p];
        info.push(Dice(100));
        list.push(info);
    }
    list.sort((a, b) => b[1] - a[1]);
    const lastResultElement = ResultContainerElement.lastElementChild;
    if (lastResultElement && lastResultElement.className === "result-item") {
        const input = lastResultElement.querySelector("input")
        if (input) input.checked = true;
    }
    ResultContainerElement.appendChild(createResultElement(list));
}
