export function toggleBurger() {
    ((e: HTMLElement)=> {
        e.dispatchEvent(new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true
        }));
    })(document.getElementById("nav-burger") as HTMLElement);
}
