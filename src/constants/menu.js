import electron from 'electron';

import { SetDialog, SetTmp } from '../actions/flow';
import { DeleteFile, CreateFile } from '../actions/project';

import CreateFileDialog from '../components/file/create';
import RenameFileDialog from '../components/file/rename';

const NewFile = {
    name: 'New...',
    short: 'Strg +',
    enabled: () => true,
    execute: data => SetDialog({
        Component: CreateFileDialog, data
    })
};

const Rename = {
    name: 'Rename',
    short: 'Shift F6',
    enabled: () => true,
    execute: data => SetDialog({
        Component: RenameFileDialog, data
    })
};

const Delete = {
    name: 'Delete',
    short: 'Entf',
    enabled: () => true,
    execute: () => DeleteFile()
};

const Copy = {
    name: 'Copy',
    icon: 'copy',
    short: 'Ctrl C',
    enabled: () => true,
    execute: data => SetTmp({
        object: data.file,
        type: 'resource'
    })
};

const Paste = {
    name: 'Paste',
    icon: 'paste',
    short: 'Ctrl V',
    enabled: ({ tmp }) => tmp && tmp.type == 'resource',
    execute: data => CreateFile(data.tmp.object)
};

export const CONTEXT = {
    dir: [NewFile, Rename, Delete, Copy, Paste],
    file: [Rename, Delete, Copy ]
};