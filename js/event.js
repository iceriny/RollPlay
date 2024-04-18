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

    if (PlayerList.length > 0) {
        let text = "";
        PlayerList.forEach((player) => (text += `${player}, `));
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
    if (playerListText === "") return;
    const playerList = playerListText.split(/,|，| |;|；/);
    playerList.forEach((player) => player.trim());
    PlayerList.length = 0;
    playerList.forEach((player) => {
        if (player === "") return;
        if (!PlayerList.includes(player)) PlayerList.push(player);
    });
    if (playerList.length === 0) return;
    hide_input();
    UserInputElement.value = "";
    CreateAllPlayerElement();
    SavePlayerList();
}
