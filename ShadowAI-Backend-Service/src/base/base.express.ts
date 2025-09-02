class BaseExpressServer {
  public async stopServer(): Promise<void> {
    process.exit(1);
  }
}

export default BaseExpressServer;
