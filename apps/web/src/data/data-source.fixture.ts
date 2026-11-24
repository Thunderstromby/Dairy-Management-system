import { createFixtureDataSource } from './fixture-adapter';
import type { DataSource } from './types';

const dataSource: DataSource = createFixtureDataSource();

export function getDataSource(): DataSource {
  return dataSource;
}
