# Animetub

## Running

### Developement server
- You can do `npm run app && npm run server` to run both the webserver and dev server.
- Another option would be to download [Windows terminal](https://www.microsoft.com/en-us/p/windows-terminal/9n0dx20hk701) and run `npm run dev`

### Build
- To get a distribution build, run `npm run build`

### Routing
- This webapp uses [Vue router](https://router.vuejs.org/) in history mode so every single routes in production build must go through index.html
- You can use [this npm package](https://www.npmjs.com/package/connect-history-api-fallback) to achieve that.
