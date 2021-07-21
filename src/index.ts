import { App } from './app';
import { CONFIG } from './configuration';

async function main(): Promise<void> {
  const app = new App();
  await app.configure(CONFIG);

  app.run('KKEEYYSS');
  app.run('KKSEEYYSS');
  app.run('KKEEYYSSASS');
  app.run('KKEEEEYYSS');
}

main();
