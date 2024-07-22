class Logger {
  static log(message: string, ...optionalParameters: unknown[]): void {
    console.log(message, optionalParameters);
  }
}

export default Logger;
