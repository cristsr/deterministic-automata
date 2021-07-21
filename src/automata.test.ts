import { App } from './app';
import { CONFIG } from './configuration';

describe('Automata', () => {
  const app = new App();

  beforeAll(async () => {
    await app.configure(CONFIG);
  });

  it('Given KEYS result should be successfully', () => {
    expect(app.run('KEYS')).toBeTruthy();
  });

  it('Given KKEEYYSS result should be successfully', () => {
    expect(app.run('KKEEYYSS')).toBeTruthy();
  });

  it('Given KKAAAYYS result should be successfully', () => {
    try {
      app.run('KKAAAYYS');
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
