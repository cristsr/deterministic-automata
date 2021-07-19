export class State {
    constructor(
        public id: string,
        public values: {
            symbol: string,
            state: string
        }[],
        public isFinal = false

    ) { }
}