let currentPosition = 0;

export function animateTitle(fullTitle: string): number {
    fullTitle += " | ";
    return setInterval(()=> {
        let displayedTitle = fullTitle.substring(currentPosition) +
            fullTitle.substring(0, currentPosition);

        document.title = displayedTitle;
        currentPosition++;

        if(currentPosition >= fullTitle.length)
            currentPosition = 0;
    }, 200);
}
