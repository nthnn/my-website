export function showLoadingBar() {
    let loading = document.getElementById(
        "loading"
    ) as HTMLElement;

    loading.classList.remove("d-none");
    loading.classList.add("d-block");
}

export function hideLoadingBar(callback: ()=> VoidFunction) {
    let loading = document.getElementById(
        "loading"
    ) as HTMLElement;

    setTimeout(() => {
        loading.classList.remove("d-block");
        loading.classList.add("d-none");

        callback();
    }, 3000);
}
