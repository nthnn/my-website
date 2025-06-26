export function toggleBurger() {
    ((e: HTMLElement)=> {
        if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent || navigator.vendor || window.opera
        )) return;

        e.dispatchEvent(new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true
        }));
    })(document.getElementById("nav-burger") as HTMLElement);
}
