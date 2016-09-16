import * as Actions from '../actions/file';
import * as File from '../util/file';

export default ({ init, on }) => {
    const root = File.readHierarchy(File.HOME_PATH);
    const file = File.readAsObject(File.HOME_PATH);
    File.getDrives(drives => Actions.SetDrives(drives));

    init('files', {
        dives: [],
        open: { root, file },
        create: { root, file }
    });

    on(Actions.Toggle, ({ owner, file }, state, update) => {
        const { root } = state.files[owner];

        if (file.open) {
            file.open = false;
        } else {
            file.open = true;
            if (!file.children) {
                file.children = File.readDirectory(file.path);
            }
        }

        state.files[owner] = {
            file: state.files[owner].file,
            root: File.updateTree(root, file)
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