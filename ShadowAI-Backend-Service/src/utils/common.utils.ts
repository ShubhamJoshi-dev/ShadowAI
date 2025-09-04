import shadowAiLogger from "../libs/logger.libs";

const excludeObjectKey = (obj: object, objectKeys: Array<string>) => {
  const newPayload = {} as any;
  for (const [key, value] of Object.entries(obj)) {
    if (objectKeys.includes(key)) {
      continue;
    }
    newPayload[key] = value;
  }
  return newPayload;
};

const checkAndAssign = <T>(
  obj: any,
  keyValue: Array<{ key: string; value: T }>
): void => {
  if (Array.isArray(keyValue) && keyValue.length > 0) {
    for (const item of keyValue) {
      const { key, value } = item;
      if (!Object.keys(obj).includes(key)) {
        obj[key] = value;
      }
    }
  }
  shadowAiLogger.info(`Process Check And Assign Completed For the object`);
};

export { excludeObjectKey, checkAndAssign };
