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

/**
 * 玩家列表
 * @type {String[]}
 */
const PlayerList = [];

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
    ResultContainerElement = document.getElementById("content-left");
    ExportConfirmedButtonElement = document.getElementById("user-input-button");
    UserInputContainerElement = UserInputElement.parentElement;
    rePositionUserInputElement();

    LoadPlayerList();
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
    pisces.src = "../img/pisces.png";

    const box = document.createElement("div");
    box.classList.add("expand-box");
    for (const r of result) {
        //TODO: 添加结果的项内容
        const item = document.createElement("div");
        item.classList.add("expand-box-item");
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
 * @param {string} name 玩家名称
 */
function createPlayerElement(name) {
    const playerElement = document.createElement("div");
    playerElement.classList.add("player-item");

    const playerIcon = document.createElement("img");
    playerIcon.classList.add("player-icon");
    playerIcon.src = "./img/role.png";

    const playerName = document.createElement("div");
    playerName.classList.add("player-name");
    playerName.innerText = name;

    playerElement.appendChild(playerIcon);
    playerElement.appendChild(playerName);

    return playerElement;
}

function CreateAllPlayerElement() {
    if (PlayerList.length === 0) return;
    PlayerContainer.innerHTML = "";
    for (const player of PlayerList) {
        PlayerContainer.appendChild(createPlayerElement(player));
    }
}

function SavePlayerList() {
    localStorage.setItem("PlayerList", JSON.stringify(PlayerList));
}

function LoadPlayerList() {
    /** @type {string} */
    const l = localStorage.getItem("PlayerList");
    if (l != null) {
        JSON.parse(l).forEach((p) => PlayerList.push(p));
        CreateAllPlayerElement();
    }
}
