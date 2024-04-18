let overTimer = null;
document.addEventListener("mouseover", (event) => {
    const target = event.target;
    if (target === document) return;
    if (overTimer) {
        clearTimeout(overTimer);
        overTimer = setTimeout((t) => {
            // TODO: 显示tips
            showTips(target)
        }, 1000)
    }
})
document.addEventListener("mouseleave", (event) => {
    const target = event.target;
    if (target === document) return;
    overTimer = null;
    TipsElement.classList.remove("show-tips");
})
/**
 * 显示tips
 * @param {HTMLElement} target 要显示tips的元素
 */
function showTips(target) {
    const tipsContent = target.getAttribute("data-tips");
    if (!tipsContent) return;
    TipsElement.innerHTML = tipsContent;

    const targetRect = target.getBoundingClientRect();
    TipsElement.style.left = targetRect.left + targetRect.width + "px";
    TipsElement.style.top = targetRect.top + "px";


    TipsElement.classList.add("show-tips");
}
/**
 * LOGO鼠标悬浮事件
 * @param {Event} event 事件
 */
function logo_hover(event) {
    ScreenEffectElement.classList.remove("slow-hide")
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