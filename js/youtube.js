export function ytIdFromUrl(url) {
    if (!url) return "";
    const match = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?&]+)/);
    return match ? match[1] : "";
}

export function ytThumb(urlOrId, quality = "hq") {
    const id = urlOrId.includes("http") ? ytIdFromUrl(urlOrId) : urlOrId;
    if (!id) return "";
    let q = "hqdefault";
    if (quality === "mq") q = "mqdefault";
    if (quality === "sd") q = "sddefault";
    return `https://i.ytimg.com/vi/${id}/${q}.jpg`;
}
