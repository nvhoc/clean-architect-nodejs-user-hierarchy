import { createLogger, format, transports } from 'winston'

const logger = createLogger({
  // To see more detailed errors, change this to 'debug'
  level: 'info',
  format: format.simple(),
  transports: [new transports.Console()],
})

export default logger
