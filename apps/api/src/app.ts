import express from 'express';

/**
 * Framework bootstrap only. No routes, policies, modules or features are
 * registered at scaffold stage.
 */
export function createApp() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));
  return app;
}
