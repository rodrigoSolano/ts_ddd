import winston from 'winston';
import { LoggerPort } from '../ports/logger.port';
import { Service } from 'typedi';

enum LogLevel {
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Debug = 'debug',
}

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
  }),
);

@Service()
export class Logger implements LoggerPort {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: LogLevel.Debug,
      transports: [new winston.transports.Console({ format: consoleFormat })],
    });
  }

  log(message: string, ...meta: unknown[]): void {
    this.logger.log(LogLevel.Info, message, ...meta);
  }

  error(message: string, trace?: unknown, ...meta: unknown[]): void {
    this.logger.log(LogLevel.Error, message, trace, ...meta);
  }

  warn(message: string, ...meta: unknown[]): void {
    this.logger.log(LogLevel.Warn, message, ...meta);
  }

  debug(message: string, ...meta: unknown[]): void {
    this.logger.log(LogLevel.Debug, message, ...meta);
  }
}
