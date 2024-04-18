let overTimer = null;
document.addEventListener("mouseover", (event) => {
    const target = event.target;
    if (target === document) return;
    if (overTimer) {
        clearTimeout(overTimer);
    }
    overTimer = setTimeout(() => {
        target.addEventListener("mouseleave", () => {
            overTimer = null;
            hideTips();
        });
        showTips(target);
    }, 1000);
});
/**
 * 显示tips
 * @param {HTMLElement} target 要显示tips的元素
 */
function showTips(target) {
    const tipsContent = target.getAttribute("data-tips");
    if (!tipsContent) return;
    TipsElement.firstChild.textContent = tipsContent;

    const targetRect = target.getBoundingClientRect();
    const tipsRect = TipsElement.getBoundingClientRect();
    TipsElement.style.left = targetRect.x + (targetRect.width / 2) - (tipsRect.width / 2) + "px";
    TipsElement.style.top = targetRect.y - tipsRect.height - 10 + "px";
    if (parseInt(TipsElement.style.top) < 100) TipsElement.style.top = targetRect.y + targetRect.height + tipsRect.height + 10 + "px";

    TipsElement.classList.remove("hide");
    TipsElement.classList.add("show");
}
/**
 * 隐藏Tips
 */
function hideTips() {
    TipsElement.classList.remove("show");
    TipsElement.classList.add("hide");
}