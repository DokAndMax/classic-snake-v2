const dynamicContent = document.getElementById('dynamic-content');
const menuCache = new Map();

async function loadMenu(menuName, context = {}) {
    const menuPath = `./Menus/${menuName}`;

    if(menuCache.has(menuPath)) {
        dynamicContent.innerHTML = "";
        dynamicContent.append(...menuCache.get(menuPath));
    } else {
        const htmlResponse = await fetch(`${menuPath}.html`);
        dynamicContent.innerHTML = "";
        dynamicContent.innerHTML = await htmlResponse.text();

        menuCache.set(menuPath, [ ...dynamicContent.childNodes ])
    }

    const module = await import(`${menuPath}.js`);
    if (module.init) {
        module.init(context);
    }
}

export default loadMenu;
