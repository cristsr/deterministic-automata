import { Config } from './configuration';
import { readCsvFile } from './utils';
import { State } from './state';

export class StateBuilder {
  private data!: any[][];
  private states!: State[];
  private config!: Config;

  setConfig(config: Config): void {
    this.config = config;
  }

  /**
   * Build states from csv configuration and return initial state
   */
  async build(): Promise<State> {
    await this.prepareData();
    this.makeStates();
    this.buildEdges();
    return this.getInitialState();
  }

  /**
   * Read csv and parse numbers to boolean type
   * @private
   */
  private async prepareData(): Promise<void> {
    const csvRows = await readCsvFile(this.config.csv).catch((error: Error) => {
      console.error(error.message);
      throw error;
    });

    this.data = csvRows.map(
      ([state, symbol, nextState, isInitial, isFinal]) => [
        state,
        symbol,
        nextState,
        isInitial === '1',
        isFinal === '1',
      ],
    );

    console.log(this.data);
  }

  /**
   * Make states from data configuration
   * @private
   */
  private makeStates(): void {
    this.states = this.data.reduce((store: State[], row: any[]) => {
      const existState = store.find((v: State) => v.id === row[0]);

      if (existState) return store;

      store.push(new State(row[0], row[3], row[4]));

      return store;
    }, []);
  }

  /**
   * Generate edges by each state
   * * @private
   */
  private buildEdges(): void {
    this.data.forEach(([id, symbol, nextId]) => {
      const state: State | undefined = this.states.find(
        (v: State) => v.id === id,
      );

      if (!state) {
        return;
      }

      const nextState: State | undefined = this.states.find(
        (v: State) => v.id === nextId,
      );

      if (!nextState) {
        return;
      }

      state.addEdge({
        symbol,
        state: nextState,
      });
    });
  }

  /**
   * Return initial state
   * @private
   */
  private getInitialState(): State {
    const state = this.states.find((state: State) => state.isInitial);

    if (!state) {
      throw new Error('First state not found');
    }

    return state;
  }
}
