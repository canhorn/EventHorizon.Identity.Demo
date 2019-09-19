const getPropertyFromData = (data: any, is: string | string[]): any => {
    if (typeof is == "string") {
        is = is.split(".");
    }
    if (is.length == 1) {
        return data[is[0]];
    } else if (is.length == 0) {
        return data;
    } else {
        var prop = is.shift() || "";
        //Forge a path of nested objects if there is a value to set
        if (data[prop] == undefined) {
            data[prop] = {};
        }
        return getPropertyFromData(data[prop], is);
    }
};

export const resolveTemplate = (messageTemplate: string, templateData: any) => {
    return messageTemplate.replace(/\$\{(.+?)\}/g, (_, firstMatch) => {
        return getPropertyFromData(templateData, firstMatch);
    });
};
