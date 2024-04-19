/**
 * LOGO鼠标悬浮事件
 * @param {Event} event 事件
 */
function logo_hover(event) {
    ShowScreenEffect();
}
/**
 * LOGO鼠标移开事件
 * @param {Event} event 事件
 */
function logo_leave(event) {
    HideScreenEffect();
    event.target.classList.add("logo-hover");
}

/**
 * LOGO点击事件
 * @param {Event} event 事件
 */
function logo_click(event) {
    HideScreenEffect();

    event.target.classList.remove("logo-hover");

    Play();
}

function ShowScreenEffect() {
    ScreenEffectElement.classList.remove("slow-hide");
    ScreenEffectElement.classList.add("slow-show");
}
function HideScreenEffect() {
    ScreenEffectElement.classList.remove("slow-show");
    ScreenEffectElement.classList.add("slow-hide");
}

function import_click() {
    show_input();
}
let isShowingInput = false;
let addedHideInputEventListener = false;
function show_input() {
    ShowScreenEffect();
    UserInputContainerElement.classList.remove("hide");
    UserInputContainerElement.classList.add("show");
    UserInputContainerElement.style.pointerEvents = "auto";
    isShowingInput = true;

    if (PlayerMap.size > 0) {
        let text = "";
        PlayerMap.keys().forEach((player) => (text += `${player}, `));
        UserInputElement.value = text;
    }

    if (!addedHideInputEventListener) {
        window.addEventListener("click", (event) => {
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
        addedHideInputEventListener = true;
    }
}
function hide_input() {
    HideScreenEffect();
    UserInputContainerElement.classList.remove("show");
    UserInputContainerElement.classList.add("hide");
    UserInputContainerElement.style.pointerEvents = "none";
    isShowingInput = false;
}
/**
 * 导入玩家
 * @param {Event} event 事件
 */
function import_player() {
    const playerListText = UserInputElement.value;
    if (playerListText === "") {
        PlayerMap.clear();
        clear_playerElement()
    }
    let importPlayerList = playerListText.split(/,|，| |;|；/);
    importPlayerList = importPlayerList.filter((player) => {
        player.trim();
        return player !== "";
    });
    if (importPlayerList.length !== 0) {
        importPlayerList.forEach((player) => {
            const playerItem = PlayerMap.get(player);
            if (playerItem === undefined) {
                PlayerMap.set(player, true);
            }
        });
        PlayerMap.forEach((_v, k) => {
            if (!importPlayerList.includes(k)) {
                PlayerMap.delete(k);
            }
        })
    };

    hide_input();
    UserInputElement.value = "";
    CreateAllPlayerElement();
    SavePlayerList();
}


function clear_result() {
    const Rubbish = document.createElement("div");
    Rubbish.classList.add("show");

    ResultContainerElement.appendChild(Rubbish);
    Array.from(ResultContainerElement.children).forEach(element => {
        if (element.classList.contains("result-item")) {
            Rubbish.appendChild(element);
        }
    });
    setTimeout(() => {
        Rubbish.classList.remove("show");
        Rubbish.classList.add("slow-hide");
        Rubbish.style.animation = "dissipated 3s infinite alternate";
        setTimeout(() => {
            Rubbish.remove();
        }, 3000);
    }, 50);
}

function clear_playerElement() {
    const Rubbish = document.createElement("div");
    Rubbish.classList.add("show");

    PlayerContainer.appendChild(Rubbish);
    Array.from(PlayerContainer.children).forEach(element => {
        if (element.classList.contains("player-item")) {
            Rubbish.appendChild(element);
        }
    });
    setTimeout(() => {
        Rubbish.classList.remove("show");
        Rubbish.classList.add("slow-hide");
        Rubbish.style.animation = "dissipated 3s infinite alternate";
        setTimeout(() => {
            Rubbish.remove();
        }, 3000);
    }, 50);
}

/**
 * 拖动开始
 * @param {DragEvent} event 拖动事件
 */
function logo_dragStart(event) {
    //event.preventDefault();
    console.log("dragStart")

    event.target.style.position = "absolute";
    event.target.style.left = event.clientX + "px";
    event.target.style.top = event.clientY + "px";
}
/**
 * 拖动中
 * @param {DragEvent} event 拖动事件
 */
function logo_drag(event) {
    console.log("dragOn")

    event.target.style.left = event.clientX + "px";
    event.target.style.top = event.clientY + "px";
}
/**
 * 拖动结束
 * @param {DragEvent} event 拖动事件
 */
function logo_dragEnd(event) {
    console.log("dragEnd")
    event.target.setAttribute("style", "")
}