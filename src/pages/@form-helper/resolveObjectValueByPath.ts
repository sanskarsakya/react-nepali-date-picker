const isObject = (o: any) => {
    return o === Object(o);
};

export const resolveObjectValueByPath = (o: any, s: string) => {
    s = s.replace(/\[(\w+)\]/g, ".$1");
    s = s.replace(/^\./, ""); //
    const a = s.split(".");
    for (let i = 0, n = a.length; i < n; ++i) {
        const k = a[i];
        if (isObject(o) && k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
};

export default resolveObjectValueByPath;
