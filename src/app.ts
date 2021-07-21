import { StateBuilder } from './state-builder';
import { Config } from './configuration';
import { Automata } from './automata';

export class App {
  private stateBuilder = new StateBuilder();
  private automata = new Automata();

  async configure(config: Config) {
    this.stateBuilder.setConfig(config);
    this.automata.setInitialState(await this.stateBuilder.build());
  }

  run(input: string) {
    this.automata.setInput([...input]);
    return this.automata.run();
  }
}
