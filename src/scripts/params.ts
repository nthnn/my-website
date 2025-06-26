export function getParameters() {
    return new URLSearchParams(window.location.search);
}

export function addParameter(name: string, value: string) {
    const url = new URL(window.location.toString());
    url.searchParams.set(name, value);

    window.history.pushState({}, "", url);
}

export function removeParameter(name: string) {
    const url = new URL(window.location.toString());
    url.searchParams.delete(name);

    window.history.replaceState({}, "", url);
}
