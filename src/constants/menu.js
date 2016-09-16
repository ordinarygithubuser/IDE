import electron from 'electron';

import { SetDialog } from '../actions/flow';
import { DeleteFile } from '../actions/project';

import CreateFile from '../components/file/create';
import RenameFile from '../components/file/rename';

const NewFile = {
    name: 'New...',
    short: 'Strg +',
    execute: data => SetDialog({
        Component: CreateFile, data
    })
};

const Rename = {
    name: 'Rename',
    short: 'Shift F6',
    execute: data => SetDialog({
        Component: RenameFile, data
    })
};

const Delete = {
    name: 'Delete',
    short: 'Entf',
    execute: () => DeleteFile()
};

const Copy = {
    name: 'Copy',
    icon: 'copy',
    short: 'Ctrl C',
    execute: () => {}
};

const Paste = {
    name: 'Paste',
    icon: 'paste',
    short: 'Ctrl V',
    execute: () => {}
};

export const CONTEXT = {
    dir: [NewFile, Rename, Delete, Copy, Paste],
    file: [Rename, Delete, Copy, Paste]
};