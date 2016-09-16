import * as Actions from '../actions/file';
import * as Tree from '../util/tree';
import * as File from '../util/file';

import { HOME_PATH } from '../util/common';

export default ({ init, on }) => {
    const root = File.readHierarchy(HOME_PATH);
    const file = File.readAsObject(HOME_PATH);
    File.getDrives(drives => Actions.SetDrives(drives));

    init('files', {
        drives: [],
        open: { root, file },
        create: { root, file }
    });

    on(Actions.Toggle, ({ owner, file }, state, update) => {
        const { root } = state.files[owner];
        const newFile = Object.assign({}, file);

        if (newFile.open) {
            newFile.open = false;
        } else {
            newFile.open = true;
            newFile.children = File.readDirectory(newFile.path);
        }

        state.files[owner] = {
            file: newFile,
            root: Tree.updateNode(root, file, newFile)
        };
        update(state);
    });

    on(Actions.Select, ({ owner, file }, state, update) => {
        state.files[owner].file = File.readAsObject(file.path);
        update(state);
    });

    on(Actions.SetDrives, (drives, state, update) => {
        state.files.drives = drives;
        update(state);
    });

    on(Actions.ChangeDrive, ({ owner, drive }, state, update) => {
        const root = drive.length > 2
            ? File.readHierarchy(drive)
            : File.readAsObject(drive);

        const file = File.readAsObject(drive);

        state.files[owner].root = root;
        state.files[owner].file = file;
        update(state);
    });
};