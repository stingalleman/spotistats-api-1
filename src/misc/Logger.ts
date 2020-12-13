import chalk from "chalk";

/**
 * Info logger.
 * @param message Message to log to the console.
 */
export function infoLogger(message: string): void {
  return console.log(`${chalk.green("[INFO]")} ${message}`);
}

/**
 * Error logger.
 * @param message Message to log to the console.
 * @param error Error object.
 */
export function errorLogger(message: string, error?: Error): void {
  if (error) return console.log(`\n${chalk.red.bold("[ERROR]")} ${chalk.red(`${message}`)}\n${error}\n`);
  return console.log(`${chalk.red.bold("[ERROR]")} ${chalk.red(`${message}`)}`);
}
