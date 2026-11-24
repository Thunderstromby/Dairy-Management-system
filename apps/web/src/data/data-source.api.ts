import { createApiDataSource } from './api-adapter';
import type { DataSource } from './types';

const dataSource: DataSource = createApiDataSource();

export function getDataSource(): DataSource {
  return dataSource;
}
