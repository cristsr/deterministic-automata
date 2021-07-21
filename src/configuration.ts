export type Config = {
  csv: {
    path: string;
    delimiter: string;
  };
};

export const CONFIG: Config = {
  csv: {
    path: 'assets/keys-states.csv',
    delimiter: ';',
  },
};
