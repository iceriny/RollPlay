let overTimer = null;
document.addEventListener("mouseover", (event) => {
    const target = event.target;
    if (target === document) return;
    if (overTimer) {
        clearTimeout(overTimer);
    }
    const contentElement = findAncestor(target, (element) => {
        try {
            return element.getAttribute("data-tips") !== null;
        } catch (error) {
            return false;
        }
    });
    if (!contentElement) return;
    overTimer = setTimeout(() => {
        if (!contentElement.getAttribute("data-tips-show")) {
            contentElement.addEventListener("mouseleave", () => {
                clearTimeout(overTimer);
                overTimer = null;
                hideTips();
            });
            addedTipsEventListener = true;
        }
        showTips(contentElement);
    }, 1000);
});

document.addEventListener("DOMContentLoaded", () => {
    const notFirst = localStorage.getItem("notFirst") === "true";
    if (notFirst) return;
    setTimeout(() => {
        showHelp();
    }, 2000)
    localStorage.setItem("notFirst", "true");
});

function showHelp() {
    const contentElements = document.querySelectorAll("[data-tips]");
    const helpScreen = document.createElement("div");
    helpScreen.id = "help-screen";
    helpScreen.classList.add("hide");
    helpScreen.addEventListener("click", () => {
        hideHelp(helpScreen);
    });
    document.body.appendChild(helpScreen);

    for (const ele of Array.from(contentElements)) {
        console.log(ele);
        const helpspan = document.createElement("span");
        helpspan.className = "tips-text";
        helpspan.textContent = ele.getAttribute("data-tips");

        const helpItem = document.createElement("div");
        helpItem.className = "tips";
        helpItem.appendChild(helpspan);
        helpScreen.appendChild(helpItem);

        const eleRect = ele.getBoundingClientRect();
        const tipsRect = helpItem.getBoundingClientRect();
        helpItem.style.left = eleRect.x + eleRect.width / 2 - tipsRect.width / 2 + "px";
        helpItem.style.top = eleRect.y - tipsRect.height - 10 + "px";
        if (parseInt(helpItem.style.top) < 100)
            helpItem.style.top = eleRect.y + eleRect.height + tipsRect.height -30 + "px";

        if (ele.id === "player-container")helpItem.style.top = eleRect.y + eleRect.height / 3 + "px";
    }
    helpScreen.classList.remove("hide");
    helpScreen.classList.add("slow-show");

}
function hideHelp(helpScreen) {
    helpScreen.classList.remove("show");
    helpScreen.classList.remove("slow-show");

    helpScreen.classList.add("hide");
    setTimeout(() => {
        helpScreen.remove();
    }, 300);
}

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
    TipsElement.style.left = targetRect.x + targetRect.width / 2 - tipsRect.width / 2 + "px";
    TipsElement.style.top = targetRect.y - tipsRect.height - 10 + "px";
    if (parseInt(TipsElement.style.top) < 100)
        TipsElement.style.top = targetRect.y + targetRect.height + tipsRect.height + 10 + "px";

    TipsElement.classList.remove("hide");
    TipsElement.classList.add("show");
    target.setAttribute("data-tips-show", "true");
}
/**
 * 隐藏Tips
 */
function hideTips(target) {
    TipsElement.classList.remove("show");
    TipsElement.classList.add("hide");
    target.setAttribute("data-tips-show", "false");
}

/**
 * 按条件找父级元素
 * @param {HTMLElement} node 要找的元素
 * @param {(element?:HTMLElement)=> boolean} prerequisite 条件
 * @param {number} maxDepth 最大深度
 * @returns 找到的父级元素
 */
function findAncestor(node, prerequisite, maxDepth = 10) {
    let depth = 0;
    // 循环遍历父节点
    while (node !== null && !prerequisite(node)) {
        // 更新当前节点为父节点
        node = node.parentNode;
        if (depth++ > maxDepth) {
            return null;
        }
    }
    // 返回找到的目标元素或者 null（如果没有找到）
    return node;
}
