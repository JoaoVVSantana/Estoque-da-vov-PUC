export const renameKey = (obj, oldKey, newKey) => {
    const { [oldKey]: value, ...rest } = obj;
    return { ...rest, [newKey]: value };
};