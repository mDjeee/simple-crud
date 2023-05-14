# simple-crud
**Rename *.env.example* file to *.env***
To check application first of all run command `npm install` and:
 - To run application in development mode run `npm run start:dev`
 - If you want start production mode you need to run `npm run start:prod`
 - To run in multi mode use `npm run start:multi`
 - To test use `npm run test`, to see tests coverage use `npm run test:coverage`

 # Scoring: CRUD API

## Overall ***192/222***

## Basic Scope

- [x] **+10** The repository with the application contains a `Readme.md` file containing detailed instructions for installing, running and using the application
- [x] **+10** **GET** `api/users` implemented properly
- [x] **+10** **GET** `api/users/{userId}` implemented properly
- [x] **+10** **POST** `api/users` implemented properly
- [x] **+10** **PUT** `api/users/{userId}` implemented properly
- [x] **+10** **DELETE** `api/users/{userId}` implemented properly
- [x] **+6** Users are stored in the form described in the technical requirements
- [x] **+6** Value of `port` on which application is running is stored in `.env` file

## Advanced Scope
- [x] **+30** Task implemented on Typescript 
- [x] **+10** Processing of requests to non-existing endpoints implemented properly
- [x] **+10** Errors on the server side that occur during the processing of a request should be handled and processed properly
- [x] **+10** Development mode: `npm` script `start:dev` implemented properly
- [x] **+10** Production mode: `npm` script `start:prod` implemented properly

## Hacker Scope
- [ ] **+30** There are tests for API (not less than **3** scenarios) *Not implemented*
- [x] **+50** There is horizontal scaling for application with a **load balancer**

## Forfeits

- **-95% of total task score** any external tools except `nodemon`, `dotenv`, `cross-env`, `typescript`, `ts-node`, `eslint` and its plugins, `webpack` and its plugins, `prettier`, `uuid`, `@types/*` as well as libraries used for testing
- **-30% of total task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
- **-20** Missing PR or its description is incorrect
- **-20** No separate development branch
- **-20** Less than 3 commits in the development branch, not including commits that make changes only to `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)
