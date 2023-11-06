export function deepMerge(obj1: any, obj2: any): any {
    // create a new object to hold the merged properties
    const mergedObj: any = {};

    // iterate over all properties in obj1 and add them to the merged object
    for (const prop in obj1) {
        if (Object.prototype.hasOwnProperty.call(obj1, prop)) {
            mergedObj[prop] = obj1[prop];
        }
    }

    // iterate over all properties in obj2
    for (const prop in obj2) {
        if (Object.prototype.hasOwnProperty.call(obj2, prop)) {
            // if the property exists in both objects, recursively merge them
            if (prop in mergedObj && typeof obj2[prop] === 'object') {
                mergedObj[prop] = deepMerge(mergedObj[prop], obj2[prop]);
            } else {
                // otherwise, add the property to the merged object
                mergedObj[prop] = obj2[prop];
            }
        }
    }

    // return the merged object
    return mergedObj;
}