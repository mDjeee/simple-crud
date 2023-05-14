import http, { IncomingMessage, Server, ServerResponse } from 'http';
import { routes } from './router';
import * as dotenv from 'dotenv';

dotenv.config();

export function handleRequest (req: IncomingMessage, res: ServerResponse) {
  const { method, url } = req;
  const { pathname } = new URL(url || '', `http://${req.headers.host}`);

  if(method && pathname) {
    const route = Object.keys(routes).find((key) => {
      const pattern = new RegExp(`^${key.replace(/:[^\s/]+/g, '[^/]+')}$`);
      return pattern.test(pathname);
    });

    if(route && routes[route][method]) {
      routes[route][method](req, res);
    } else {
      res.statusCode = 404;
      res.end('Not found');
    }
  }
}

const server: Server = http.createServer(handleRequest);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});