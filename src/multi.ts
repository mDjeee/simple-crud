import cluster from 'cluster';
import http from 'http';
import { cpus } from 'os';
import { routes } from './router';

const cpusCount = cpus().length;
const PORT = 4000;
let workerId = 0;

if (cluster.isPrimary) {
  const server = http.createServer((req, res) => {
    workerId = workerId < 8 ? workerId+1 : 1;
    const worker = getWorker(workerId);
    if (worker) {
      const requestOptions = {
        host: 'localhost',
        port: 4000 + worker.id,
        path: req.url,
        method: req.method,
        headers: req.headers,
      };
      const proxyReq = http.request(requestOptions, (proxyRes: any) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res);
      });
      req.pipe(proxyReq);
    } else {
      res.writeHead(503);
      res.end('No available workers');
    }
  });
  server.listen(PORT, () => {
    console.log(`Load balancer listening on port ${PORT}`);
  });
  for (let i = 1; i <= cpusCount; i++) {
    cluster.fork();
  }
  cluster.on('message', (worker, message) => {
    console.log(`Received message from worker ${worker.id}: ${message}`);
  });

  const availableWorkers = cluster.workers ? new Set(Object.keys(cluster.workers)) : new Set();

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.id} died with code ${code} and signal ${signal}`);
    availableWorkers.delete(String(worker.id));
    const newWorker = cluster.fork();
    availableWorkers.add(String(newWorker.id));
  });

  function getWorker(id: number) {
    if (id && cluster.workers) {
      return cluster.workers[id];
    } else {
      return null;
    }
  }
} else {
  const workerId = Number(cluster?.worker?.id);

  const server = http.createServer(handleRequest);

  server.listen(4000 + workerId, () => {
    console.log(`Worker ${workerId} listening on port ${4000 + workerId}`);
  });
  if(process && process.send) {
    process.send(`Worker ${workerId} is ready`);
  }

  function handleRequest (req: any, res: any) {
    const { method, url } = req;
    const path = url;

    console.log(`Worker ${workerId} received ${req.method} method`);
  
    if(method && path) {
      const route = Object.keys(routes).find((key) => {
        const pattern = new RegExp(`^${key.replace(/:[^\s/]+/g, '[^/]+')}$`);
        return pattern.test(path);
      });
  
      if(route && routes[route][method]) {
        routes[route][method](req, res);
      } else {
        res.statusCode = 404;
        res.end('Not found');
      }
    }
  }
}

