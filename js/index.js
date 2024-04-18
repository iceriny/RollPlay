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

document.addEventListener("DOMContentLoaded", () => {
    ScreenEffectElement = document.getElementById("full-screen-effects");
    const logo = document.getElementById("title-logo");
    setTimeout(() => {
        ScreenEffectElement.classList.add("slow-hide");
        logo.classList.remove("title-logo-start")
    }, 1000);

    TipsElement = document.getElementById("tips");
});