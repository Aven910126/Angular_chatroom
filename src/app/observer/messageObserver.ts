export default class MessageObserver {
    element: HTMLElement
    constructor(element: HTMLElement) {
        this.element = element
    }
    update(): void {
        this.element.scrollTo(0, this.element.scrollHeight)
    }
}