async function loadSkins(configPath, profile = "Classic") {
    const response = await fetch(configPath);
    const skinsConfig = await response.json();

    if (!skinsConfig[profile]) {
        throw new Error(`Skin profile "${profile}" not found in configuration.`);
    }

    const skins = {};
    Object.keys(skinsConfig[profile]).forEach(key => {
        skins[key] = `./Skins/${skinsConfig[profile][key]}`;
    });

    return skins;
}

export default loadSkins;
