import { IUser } from '@src/interfaces/user.interface';
import { readFile, writeFile } from 'fs';
import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';

export function handleUserDeleteRequest (req: IncomingMessage, res: ServerResponse) {
  const { url } = req;
  const { pathname, query } = parse(url || '', true);
  const id = pathname?.split('/').pop() || '';
  if(!/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(id)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          success: false,
          error: 'Id is invalid, not uuid',
        })
      );
  }
  readFile('./src/db/users.json', 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          success: false,
          error: 'Error on reading database',
        })
      );
    } else {
      const users: IUser[] = JSON.parse(data);
      const userIndex = users.findIndex((user) => user.id === id);
      if(userIndex > 0) {
        users.splice(userIndex, 1);
        writeFile('./src/db/users.json', JSON.stringify(users), err => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(
              JSON.stringify({
                success: false,
                error: 'Error on updating database',
              })
            );
          } else {
            res.writeHead(204, { 'Content-Type': 'application/json' });
            res.end();
          }
        });
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            success: false,
            message: 'No such user',
          })
        );
      }
    }
  });
}