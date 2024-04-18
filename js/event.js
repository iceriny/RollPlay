
/**
 * LOGO鼠标悬浮事件
 * @param {Event} event 事件
 */
function logo_hover(event) {
    ScreenEffectElement.classList.remove("slow-hide");
    ScreenEffectElement.classList.add("slow-show");
}
/**
 * LOGO鼠标移开事件
 * @param {Event} event 事件
 */
function logo_leave(event) {
    ScreenEffectElement.classList.remove("slow-show");
    ScreenEffectElement.classList.add("slow-hide");
    event.target.classList.add("logo-hover");
}

/**
 * LOGO点击事件
 * @param {Event} event 事件
 */
function logo_click(event) {
    ScreenEffectElement.classList.remove("slow-show");
    ScreenEffectElement.classList.add("slow-hide");

    event.target.classList.remove("logo-hover");
}

/**
 * 导入玩家
 * @param {Event} event 事件
 */
function import_player() {
    console.log("导入玩家列表");
}
