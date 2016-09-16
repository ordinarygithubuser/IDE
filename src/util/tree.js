import * as Util from './common';
import Path from 'path';

export const updateNode = (node, oldNode, newNode) => {
    if (node.path == oldNode.path) {
        return newNode;
    } else if (oldNode.path.startsWith(node.path) && node.children) {
        node.children = node.children.map(current => {
            return updateNode(current, oldNode, newNode);
        });
    }

    return node;
};

export const renameNode = (node, oldNode, newNode) => {
    return updateNode(node, oldNode, rename(newNode, newNode, oldNode));
};

const rename = (node, newNode, oldNode, first = true) => {
    if (!first) {
        const suffix = node.path.substring(oldNode.path.length);
        node.path = Path.join(newNode.path, suffix);
    }

    if (node.children) {
        node.children = node.children.map(child => {
            return rename(child, newNode, oldNode, false);
        });
    }

    return node;
};

export const insertNode = (node, newNode) => {
    if (node.path == Util.getParentPath(newNode)) {
        if (!node.children) node.children = [];
        if (!node.open) node.open = true;
        node.children.push(newNode);
        node.children = Util.sort(node.children);
    } else if (newNode.path.startsWith(node.path) && node.children) {
        node.children = node.children.map(child => {
            return insertNode(child, newNode);
        });
    }

    return node;
};

export const removeNode = (node, oldNode) => {
    if (oldNode.path.startsWith(node.path)) {
        if (node.path == Util.getParentPath(oldNode)) {
            node.children = node.children.filter(child => {
                return child.path != oldNode.path;
            });
        } else {
            node.children = node.children.map(child => {
                return removeNode(child, oldNode);
            });
        }
    }
    return node;
};