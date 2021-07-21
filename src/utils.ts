import { promises as fs } from 'fs';
import { join } from 'path';
import parseCsv from 'csv-parse/lib/sync';

export const readCsvFile = async ({
  path,
  delimiter,
}: any): Promise<string[][]> => {
  const fileContent = await fs.readFile(join(__dirname, path));
  return parseCsv(fileContent, { delimiter }).slice(1);
};
