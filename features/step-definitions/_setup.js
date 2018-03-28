// To prevent error swallowing in promises
process.on('unhandledRejection', up => {
  throw up
})
