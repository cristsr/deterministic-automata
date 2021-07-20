import { Config } from './configuration';
import { readCsvFile } from './utils';
import { State } from './state';

export class StateBuilder {
  private data!: any[][];
  private states!: State[];

  constructor(private config: Config) {}

  async build(): Promise<State | undefined> {
    this.data = await this.prepareData();

    console.log(this.data);

    this.states = await this.makeStates();

    this.buildEdges();

    this.states.forEach((state) =>
      console.log({
        id: state.id,
        edges: state.edges.length,
        isInitial: state.isInitial,
        isFinal: state.isFinal,
      }),
    );

    return this.states.find((state) => state.isInitial);
  }

  /**
   * Read csv and parse numbers to boolean type
   * @private
   */
  private async prepareData() {
    const csvRows = await readCsvFile(this.config.csv).catch((error: Error) => {
      console.error(error.message);
      throw error;
    });

    return csvRows.map(([state, symbol, nextState, isInitial, isFinal]) => [
      state,
      symbol,
      nextState,
      isInitial === '1',
      isFinal === '1',
    ]);
  }

  /**
   * Make states from data configuration
   * @private
   */
  private makeStates(): State[] {
    return this.data.reduce((store: State[], row: any[]) => {
      const existState = store.find((v) => v.id === row[0]);

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
        (v) => v.id === nextId,
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
}
