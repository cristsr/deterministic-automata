import { StateBuilder } from './state-builder';
import { Config } from './configuration';
import { Automata } from './automata';
import { State } from './state';

export class App {
  private stateBuilder = new StateBuilder();
  private automata = new Automata();

  async configure(config: Config) {
    this.stateBuilder.setConfig(config);
    const initialState: State = await this.stateBuilder.build();
    this.automata.setInitialState(initialState);
  }

  run(input: string) {
    this.automata.setInput([...input]);
    return this.automata.run();
  }
}
