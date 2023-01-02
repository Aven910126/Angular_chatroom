import MessageObserver from "./messageObserver"

export default class MessageSubject {
    observerList: Array<MessageObserver> = []
    private static _instance: MessageSubject = new MessageSubject()
    static getInstance(): MessageSubject {
        return this._instance
    }
    constructor() {

    }
    notify(): void {
        this.observerList.forEach((observer) => {
            observer.update()
        })
    }
    addObserver(observer: MessageObserver) {
        this.observerList.push(observer)
    }
}