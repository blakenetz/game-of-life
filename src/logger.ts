import chalk from "chalk";

class Logger {
  startTime: number | null;

  constructor() {
    this.startTime = null;
  }

  private suffix() {
    return chalk.magenta(`🧫 ${new Date().toISOString()}`);
  }

  info(...args: any[]) {
    console.log(`${this.suffix()}`, chalk.bold.blue("[INFO]"), ...args);
  }

  debug(...args: any[]) {
    if (process.env.NODE_ENV === "production") return;
    console.log(`${this.suffix()}`, chalk.bold.green("[DEBUG]"), ...args);
  }

  error(...args: any[]) {
    console.log(`${this.suffix()}`, chalk.bold.red("[ERROR]"), ...args);
  }

  time = {
    start: () => {
      this.startTime = Date.now();
    },
    end: () => {
      const ms = Date.now() - this.startTime!;
      this.info(chalk.yellow(`Finished in: ${ms / 1000}s`));
      this.startTime = null;
    },
  };
}

export default new Logger();
