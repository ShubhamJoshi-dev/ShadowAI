import { UnknownAny } from "../types/types";
import shadowAiLogger from "../libs/logger.libs";

export function retry(maxRetries = 3, delayMs = 2000) {
  return function <T extends (...args: any[]) => Promise<any>>(
    value: T,
    context: ClassMethodDecoratorContext
  ) {
    async function replacement(
      this: any,
      ...args: Parameters<T>
    ): Promise<ReturnType<T>> {
      let retries = maxRetries;

      while (retries > 0) {
        try {
          return await value.apply(this, args);
        } catch (err) {
          retries--;

          if (retries === 0) {
            shadowAiLogger.error(
              `Maximum retries exceeded for ${String(context.name)}`
            );
            throw err;
          }

          shadowAiLogger.error(
            `Error in ${String(context.name)}, retrying... (${retries} left)`
          );

          await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
      }
      throw new Error("Unreachable code");
    }

    return replacement as T;
  };
}
