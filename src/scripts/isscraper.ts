export function isScraper(): boolean {
    const userAgent: string = navigator.userAgent;
    const scraperKeywords: Array<string> = [
        "Googlebot",
        "AdsBot-Google",
        "Google-Extended",
        "bingbot",
        "AdIdxBot",
        "BingPreview",
        "DuckDuckBot",
        "Baiduspider",
        "YandexBot",
        "Applebot",
        "Facebot",
        "FacebookExternalHit",
        "Amazonbot",
        "AhrefsBot",
        "SemrushBot"
    ];

    return scraperKeywords.some(
        keyword =>
            userAgent.includes(keyword)
    );
}