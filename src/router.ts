import { IncomingMessage, ServerResponse } from 'http';
import { handleUserDeleteRequest } from './handlers/handleUserDeleteRequest';
import { handleUserGetRequest } from './handlers/handleUserGetRequest';
import { handleUserPutRequest } from './handlers/handleUserPutRequest';
import { handleUsersGetRequest } from './handlers/handleUsersGetRequest';
import { handleUsersPostRequest } from './handlers/handleUsersPostRequest';

export const routes = {
  '/api/users': {
    GET: handleUsersGetRequest,
    POST: handleUsersPostRequest
  },
  '/api/users/:id': {
    GET: handleUserGetRequest,
    PUT: handleUserPutRequest,
    DELETE: handleUserDeleteRequest
  },
}