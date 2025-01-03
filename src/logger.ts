import chalk from "chalk";

export default class logger {
  private static suffix() {
    return chalk.magenta(`🧫 ${new Date().toISOString()}`);
  }

  static info(...args: any[]) {
    console.log(`${this.suffix()}`, chalk.bold.blue("[INFO]"), ...args);
  }
  static debug(...args: any[]) {
    if (process.env.NODE_ENV === "production") return;
    console.log(`${this.suffix()}`, chalk.bold.green("[DEBUG]"), ...args);
  }
  static error(...args: any[]) {
    console.log(`${this.suffix()}`, chalk.bold.red("[ERROR]"), ...args);
  }
}
