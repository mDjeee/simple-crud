import { IUser } from '@src/interfaces/user.interface';
import { readFile, writeFile } from 'fs';
import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';

function isAnUser(obj: any): obj is IUser {
  return 'username' in obj && 'age' in obj && 'hobbies' in obj;
}

export function handleUsersPostRequest (req: IncomingMessage, res: ServerResponse) {
  let userData = '';

  req.on('data', chunk => {
    userData += chunk.toString();
  });
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
      const users: IUser[] = JSON.parse(data);
      const newUser: IUser = JSON.parse(userData);
      if (!isAnUser(newUser)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            success: false,
            error: 'User data does not contain required fields',
          })
        );
      }
      else if (
        users.find(user => user.username === newUser.username)
      ) {
        res.writeHead(409, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            success: false,
            error: 'User already exists',
          })
        );
      } else {
        newUser.id = uuidv4();
        users.push(newUser);
        writeFile('./src/db/users.json', JSON.stringify(users), err => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(
              JSON.stringify({
                success: false,
                error: 'Error on writing to database',
              })
            );
          } else {
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
          }
        });
      }
    }
  });
}