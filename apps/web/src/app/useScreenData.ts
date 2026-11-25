import { getDataSource } from '@smartfarm/data-source';
import { useEffect, useState } from 'react';
import type { PrototypeScreenData, ScreenDataRequest } from '../data/types';

export function useScreenData({ id, title, template, description }: ScreenDataRequest) {
  const [data, setData] = useState<PrototypeScreenData>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    let active = true;
    setData(undefined);
    setError(undefined);

    getDataSource()
      .getScreenData({ id, title, template, description })
      .then((result) => {
        if (active) {
          setData(result);
        }
      })
      .catch((reason: unknown) => {
        if (active) {
          setError(reason instanceof Error ? reason.message : 'Screen data could not be loaded.');
        }
      });

    return () => {
      active = false;
    };
  }, [id, title, template, description]);

  return { data, error };
}
