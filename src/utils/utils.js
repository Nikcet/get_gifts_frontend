export function isObjectEmpty(object) {
    for (let key in object) {
        return false;
    }
    return true;
}