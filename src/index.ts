import { CONFIG } from './configuration';
import { StateBuilder } from './state-builder';
import { State } from './state';
import { Automata } from './automata';

async function main() {
  // Instantiate builder and get the initial state
  const stateBuilder = new StateBuilder(CONFIG);
  const initialState: State | undefined = await stateBuilder.build();

  if (!initialState) {
    throw new Error('Initial state not found');
  }

  // Instantiate an automata and start execution
  const automata = new Automata(initialState, [...CONFIG.test]);
  automata.run();
}

main().catch((error: Error) => {
  console.log();
  console.error(error);
});
