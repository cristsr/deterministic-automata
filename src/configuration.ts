export type Config = {
  [key: string]: any;
};

export const CONFIG: Config = {
  csv: {
    path: 'assets/keys-states.csv',
    delimiter: ';',
  },
  test: [...'KKEEYYS'],
};
