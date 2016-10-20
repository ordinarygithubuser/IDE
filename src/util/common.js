export const getPath = node => {
    if (!node) return null;
    if (node.parent) {
        return getPath(node.parent) + '/' + node.name;
    }
    return node.name;
};

export const equalsPath = (n1, n2) => {
    return getPath(n1) == getPath(n2);
};

export const applyDiff = (obj, delta) => {
    const copy = Object.assign({}, obj);
    return Object.assign(copy, delta);
};

export const round = (num, places) => {
    return num.toFixed(places)
};