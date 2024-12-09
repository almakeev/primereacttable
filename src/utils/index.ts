export const isPositiveNumber = (val: string) => {
    const trimmedStr = val.trim();
    if (!trimmedStr) {
        return false;
    }
    return !Number.isNaN(+trimmedStr) && +trimmedStr > 0;
};
