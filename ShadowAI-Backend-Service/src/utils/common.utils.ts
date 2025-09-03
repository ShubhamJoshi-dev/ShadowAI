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


export {
    excludeObjectKey
}