import * as Util from '../util/common';

const visitNode = (node, child, onMatch, onDir) => {
    if (Util.equalsPath(node, child)) {
        return onMatch();
    } else if (node.children) {
        node.children = node.children.map(next => {
            return onDir(next);
        });
    }
    return node;
};

export const filterNode = (node, child, onFile, onDir) => {
    if (Util.equalsPath(node, child)) {
        return onFile();
    } else if (child.children) {
        child.children = child.children.filter(next => {
            return onDir(next);
        });
    }
    return false;
};

export const insert = (node, child, resource) => {
    return visitNode(node, child, () => {
        node.children.push(resource);
        return node;
    }, next => {
        return insert(next, child, resource);
    });
};

export const update = (node, child, diff) => {
    return visitNode(node, child, () => {
        return Util.applyDiff(node, diff);
    }, next => {
        return update(next, child, diff)
    });
};

export const remove = (node, child) => {
    return filterNode(node, child, () => {
        return Util.equalsPath(node, child);
    }, next => {
        return remove(node, next);
    });
};
