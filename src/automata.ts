import { State } from './state';

export class Automata {
  constructor(
    private readonly initialState: State,
    private readonly input: string[],
  ) {}

  run() {
    this.logState(this.initialState);

    console.log('Initial State: ' + this.initialState.id);
    console.log('Input ', this.input);

    this.validateInput(this.initialState);
  }

  private validateInput(state: State, i = 0) {
    if (!this.input[i] && state.isFinal) {
      return true;
    }

    if (!this.input[i] && !state.isFinal) {
      throw new Error('Invalid input');
    }

    const newState = state.transition(this.input[i]);

    console.log('Current state: ' + state.id);
    console.log('Current char: ' + this.input[i]);
    console.log('Next state: ' + newState.id);
    console.log();

    this.validateInput(newState, i + 1);
  }

  private logState(state: State, loggedStates: State[] = []): any {
    if (loggedStates.find((v) => v === state)) {
      return;
    }

    loggedStates.push(state);

    this.printMessage(state);

    for (const edge of state.edges) {
      this.logState(edge.state, loggedStates);
    }
  }

  private printMessage(state: State) {
    console.log();
    console.log('STATE ' + state.id);

    state.edges.forEach((v) =>
      console.log(`SYMBOL: ${v.symbol} NEXT STATE: ${v.state.id}`),
    );
  }
}
