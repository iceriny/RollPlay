/**
 * 屏幕效果元素
 * @type {HTMLElement}
 */
let ScreenEffectElement;
/**
 * 提示元素
 * @type {HTMLElement}
 */
let TipsElement;

/**
 * 结果容器元素
 * @type {HTMLElement}
 */
let ResultContainerElement;

/**
 * 输入框元素
 * @type {HTMLTextAreaElement}
 */
let UserInputElement;
/**
 * 输入框元素的容器元素
 * @type {HTMLElement}
 */
let UserInputContainerElement;
/**
 * 导入确定元素
 * @type {HTMLButtonElement}
 */
let ExportConfirmedButtonElement;

/**
 * 导入按钮元素
 * @type {HTMLElement}
 */
let ImportButtonElement;
/**
 * 存放玩家的容器元素
 * @type {HTMLElement}
 */
let PlayerContainer;

const ImgPath = isLocalhost() ? "../img/" : "./img/";
/**
 * 玩家列表
 * @type {Map<string, boolean>}
 */
const PlayerMap = new Map();

document.addEventListener("DOMContentLoaded", () => {
    ScreenEffectElement = document.getElementById("full-screen-effects");
    const logo = document.getElementById("title-logo");
    setTimeout(() => {
        ScreenEffectElement.classList.add("slow-hide");
        logo.classList.remove("title-logo-start");
    }, 1000);

    TipsElement = document.getElementById("tips");
    ImportButtonElement = document.getElementById("import-button");
    UserInputElement = document.getElementById("user-input-text");
    PlayerContainer = document.getElementById("player-container");
    ResultContainerElement = document.getElementById("result-container");
    ExportConfirmedButtonElement = document.getElementById("user-input-button");
    UserInputContainerElement = UserInputElement.parentElement;
    rePositionUserInputElement();

    let touchTimer = -1;
    const title = document.getElementById("title");
    title.addEventListener("touchstart", (e) => {
        e.preventDefault();
        if (touchTimer === -1) {
            touchTimer = Date.now();
        }
        setTimeout(() => {
            logo.click();
        }, 300);
    });

    LoadPlayerList();
});
window.addEventListener("mousedown", (event) => {
    if (
        isShowingInput &&
        event.target !== UserInputContainerElement &&
        event.target !== UserInputElement &&
        event.target !== ImportButtonElement &&
        event.target !== ExportConfirmedButtonElement
    ) {
        hide_input();
    }
});
window.addEventListener("resize", () => {
    rePositionUserInputElement();
});
/**
 * 窗口大小改变时，重新调整输入框位置
 */
function rePositionUserInputElement() {
    const UserInputContainerElementRect = UserInputContainerElement.getBoundingClientRect();
    UserInputContainerElement.style.top = window.innerHeight / 2 - UserInputContainerElementRect.height / 2 + "px";
    UserInputContainerElement.style.left = window.innerWidth / 2 - UserInputContainerElementRect.width / 2 + "px";
}

/**
 * 将时间戳格式化为时刻字符串
 * @param {number} timestamp 时间戳
 * @returns {string} 时刻格式化后的字符串
 */
function formatTimestamp(timestamp) {
    // 创建一个 Date 对象，并传入时间戳作为参数
    const date = new Date(timestamp);

    // 获取年、月、日、小时、分钟和秒
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 月份从 0 开始，需要加 1，并且补零到两位数
    const day = date.getDate().toString().padStart(2, "0"); // 补零到两位数
    const hours = date.getHours().toString().padStart(2, "0"); // 补零到两位数
    const minutes = date.getMinutes().toString().padStart(2, "0"); // 补零到两位数
    const seconds = date.getSeconds().toString().padStart(2, "0"); // 补零到两位数

    // 将年、月、日、小时、分钟和秒拼接成日期时间字符串
    const formattedDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

    return formattedDate;
}

/**
 * 生成一个可展开的盒子
 * @param {[string, number]} result 展开内容
 * @param {boolean} isOpen 是否展开
 */
function createResultElement(result, isOpen = true) {
    function toggle(o) {
        if (o) {
            resultItem.style.backgroundColor = "#eeebe8";
            resultTitleElement.style.backgroundColor = "rgb(215, 215, 215)";
        } else {
            resultItem.style.backgroundColor = "#dfdfdf";
            resultTitleElement.style.backgroundColor = "rgb(223, 223, 223)";
        }
    }

    const Timestamp = Date.now();
    const id = `result-${Timestamp}`;
    const title = formatTimestamp(Timestamp);

    const checkBoxID = `${id}-check`;

    const resultItem = document.createElement("div");
    resultItem.classList.add("result-item");
    resultItem.id = id;
    resultItem.style.backgroundColor = "#dfdfdf";

    const resultTitleElement = document.createElement("div");
    resultTitleElement.classList.add("result-item-title");
    resultTitleElement.innerText = title;
    toggle(isOpen);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = !isOpen;
    checkbox.style.display = "none";
    checkbox.addEventListener("change", () => {
        const value = checkbox.checked;
        toggle(!value);
    });
    checkbox.classList.add("expand-button-check");
    checkbox.id = checkBoxID;

    const upOrDown = document.createElement("div");
    upOrDown.classList.add("up-or-down");

    const expandButton = document.createElement("label");
    expandButton.classList.add("expand-button");
    expandButton.setAttribute("for", checkBoxID);

    const pisces = document.createElement("img");
    pisces.classList.add("pisces");
    pisces.src = `${ImgPath}pisces.png`;

    const box = document.createElement("div");
    box.classList.add("expand-box");

    const resultCount = result.length;
    const winColor = interpolateColor("rgb(0, 255, 119)", "rgb(245, 245, 245)", Math.floor(resultCount / 2));
    const loseColor = interpolateColor("rgb(245, 245, 245)", "rgb(255, 25, 0)", Math.max(resultCount / 2));
    const colorList = winColor.concat(loseColor);
    for (let i = 0; i < resultCount; i++) {
        const r = result[i];
        const color = colorList[i];
        const item = document.createElement("div");
        item.classList.add("expand-box-item");
        item.style.filter = `drop-shadow(0 0 .5rem ${color})`;
        item.innerHTML = `${r[0]}: ${r[1]}`;
        box.appendChild(item);
    }

    expandButton.appendChild(pisces);
    upOrDown.appendChild(expandButton);

    resultItem.appendChild(resultTitleElement);
    resultItem.appendChild(checkbox);
    resultItem.appendChild(box);
    resultItem.appendChild(upOrDown);

    return resultItem;
}
/**
 * 设置某个结果项的展开样式
 * @param {HTMLDivElement} resultItem 结果项
 * @param {boolean} isOpen 是否打开
 */
function setResultItemStyle(resultItem, isOpen) {
    let resultTitleElement = resultItem.querySelector(".result-item-title");
    let expandButtonCheck = resultItem.querySelector("input");
    if (isOpen) {
        expandButtonCheck.checked = !isOpen;
        resultItem.style.backgroundColor = "#eeebe8";
        resultTitleElement.style.backgroundColor = "rgb(215, 215, 215)";
    } else {
        expandButtonCheck.checked = !isOpen;
        resultItem.style.backgroundColor = "#dfdfdf";
        resultTitleElement.style.backgroundColor = "rgb(223, 223, 223)";
    }
}
/**
 * 生成玩家元素
 * @param {[string, boolean]} player 玩家
 */
function createPlayerElement(player) {
    const playerElement = document.createElement("div");
    playerElement.classList.add("player-item");

    const playerIcon = document.createElement("img");
    playerIcon.classList.add("player-icon");
    playerIcon.src = "./img/role.png";

    const playerName = document.createElement("div");
    playerName.classList.add("player-name");
    playerName.innerText = player[0];

    playerElement.setAttribute("enable-player", player[1]);
    if (player[1] == false) playerElement.classList.add("disabled-player");
    playerElement.addEventListener("click", () => {
        const enablePlayer = playerElement.getAttribute("enable-player");
        if (enablePlayer == "true") {
            // 禁用玩家
            PlayerMap.set(player[0], false);
            playerElement.classList.add("disabled-player");
            playerElement.setAttribute("enable-player", "false");
        } else {
            // 启用玩家
            PlayerMap.set(player[0], true);
            playerElement.classList.remove("disabled-player");
            playerElement.setAttribute("enable-player", "true");
        }
        SavePlayerList();
    });

    playerElement.appendChild(playerIcon);
    playerElement.appendChild(playerName);

    return playerElement;
}

function CreateAllPlayerElement() {
    if (PlayerMap.size === 0) return;
    clear_playerElement()

    for (const player of PlayerMap) {
        const playerElement = createPlayerElement(player)
        PlayerContainer.insertBefore(playerElement, PlayerContainer.lastChild);
    }
}

function SavePlayerList() {
    localStorage.setItem("PlayerMap", JSON.stringify(Object.fromEntries(PlayerMap)));
}

function LoadPlayerList() {
    /** @type {string} */
    const lString = localStorage.getItem("PlayerMap");
    const obj = JSON.parse(lString);
    const l = obj ? Object.entries(JSON.parse(lString)) : [];
    if (l.length > 0) {
        l.forEach((p) => PlayerMap.set(p[0], p[1]));
        CreateAllPlayerElement();
    }
}

/**
 * 判断是否在localhost上运行
 * @returns {boolean} 是否在localhost上运行
 */
function isLocalhost() {
    // 获取当前页面的协议和主机名
    var protocol = window.location.protocol;
    var hostname = window.location.hostname;

    // 检查协议是否为 http 或 https，并且主机名是否为 localhost 或 127.0.0.1
    if ((protocol === "http:" || protocol === "https:") && (hostname === "localhost" || hostname === "127.0.0.1")) {
        return true; // 在本地服务器上运行
    } else {
        return false; // 不在本地服务器上运行
    }
}

/**
 * 获取渐变颜色
 * @param {string} color1 起始颜色
 * @param {string} color2 结束颜色
 * @param {*} steps 步数
 * @returns {string[]} 颜色数组
 */
function interpolateColor(color1, color2, steps) {
    // 输入验证
    if (!isValidColor(color1) || !isValidColor(color2)) {
        throw new Error("无效的颜色输入。请确保颜色格式为 rgb(x, y, z)。");
    }
    if (typeof steps !== "number" || steps <= 1) {
        console.warn("步数必须是一个大于1的数字。");
    } else {
        steps = Math.max(2, steps);
    }

    // 初始化变量
    const stepFactor = 1 / (steps - 1);
    const [r1, g1, b1] = parseRGB(color1);
    const [r2, g2, b2] = parseRGB(color2);
    const interpolatedColorArray = [];

    // 渐变计算
    for (let i = 0; i < steps; i++) {
        const r = clamp(Math.round(r1 + (r2 - r1) * i * stepFactor), 0, 255);
        const g = clamp(Math.round(g1 + (g2 - g1) * i * stepFactor), 0, 255);
        const b = clamp(Math.round(b1 + (b2 - b1) * i * stepFactor), 0, 255);

        interpolatedColorArray.push(`rgb(${r}, ${g}, ${b})`);
    }

    return interpolatedColorArray;
}

// 辅助函数：验证颜色格式
function isValidColor(color) {
    const regex = /^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$/;
    return regex.test(color);
}

// 辅助函数：解析RGB颜色
function parseRGB(color) {
    const matches = color.match(/\d+/g).map(Number);
    return [matches[0], matches[1], matches[2]];
}

// 辅助函数：裁剪RGB值
function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
}
