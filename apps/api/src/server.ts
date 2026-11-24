import { createApp } from './app.js';

const port = Number(process.env.API_PORT ?? 4000);
const server = createApp().listen(port);

export { server };
