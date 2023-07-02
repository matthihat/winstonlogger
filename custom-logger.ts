import { Injectable, LoggerService } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';

@Injectable()
export class WinstonLogger implements LoggerService {
  private logger: any;

  constructor() {
    this.initializeLogger();
  }

  private initializeLogger() {
    const currentLoggingLevel =
        process.env.NODE_ENV === 'development' ? 'debug' : 'error';

    this.logger = createLogger({
      level: currentLoggingLevel,
      format: format.combine(
          format.timestamp(),
          format.printf(({ level, message, timestamp }) => {
            return `${timestamp} ${level}: ${message}`;
          }),
      ),
      transports: [new transports.Console()],
    });

    this.logger.log({
      level: 'info',
      message: 'Initializing logger with log level: ' + currentLoggingLevel,
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(message, { trace });
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
