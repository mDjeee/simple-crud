import { readFile } from 'fs';
import { IncomingMessage, ServerResponse } from 'http';

export function handleUsersGetRequest (req: IncomingMessage, res: ServerResponse) {
  return readFile('./src/db/users.json', 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          success: false,
          error: 'Error on reading database',
        })
      );
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify(
          JSON.parse(data)
        )
      );
    }
  });
}