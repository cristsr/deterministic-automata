import { State } from './state';

export class Automata {
  private initialState!: State;
  private input!: string[];

  setInitialState(state: State) {
    this.initialState = state;
  }

  setInput(input: string[]) {
    this.input = input;
  }

  /**
   * Print all states with edges and initialize automata execution
   */
  run(): boolean {
    this.logStates(this.initialState);

    console.log();
    console.log('Input ', this.input);
    console.log('Initial State: ' + this.initialState.id);
    console.log();

    return this.runTransitions(this.initialState);
  }

  /**
   * Given the initial state, start recursive execution
   * @param state
   * @param i
   * @private
   */
  private runTransitions(state: State, i = 0): boolean {
    if (!this.input[i] && state.isFinal) {
      console.log('The given input is valid');
      return true;
    }

    if (!this.input[i] && !state.isFinal) {
      throw new Error('Invalid input');
    }

    const newState: State = state.transition(this.input[i]);

    console.log('Current state: ' + state.id);
    console.log('Current char: ' + this.input[i]);
    console.log('Next state: ' + newState.id);
    console.log();

    return this.runTransitions(newState, i + 1);
  }

  /**
   * Recursive iteration through graph and print information
   * @param state
   * @param loggedStates
   * @private
   */
  private logStates(state: State, loggedStates: State[] = []): any {
    if (loggedStates.find((v) => v === state)) {
      return;
    }

    loggedStates.push(state);

    this.printMessage(state);

    for (const edge of state.edges) {
      this.logStates(edge.state, loggedStates);
    }
  }

  /**
   * Print state and edges information
   * @param state
   * @private
   */
  private printMessage(state: State) {
    console.log();
    console.log('STATE ' + state.id);

    state.edges.forEach((v) =>
      console.log(`SYMBOL: ${v.symbol} NEXT STATE: ${v.state.id}`),
    );
  }
}
