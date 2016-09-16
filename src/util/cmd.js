import ChildProcess from 'child_process';
import readline from 'readline';

const Result = (type, value) => ({ type, value });

const getResult = (error, stdout, stderr) => {
    if (error) return Result('ShellError', error.message);
    if (stderr) return Result('CmdError', stderr.message);
    return Result('Output', stdout);
};

export const execute = (command, dir, done) => {
    const conf = { encoding: 'utf8', cwd: dir };
    ChildProcess.exec(command, conf, (error, stdout, stderr) => {
        done(getResult(error, stdout, stderr));
    });
};

export const createSession = (id, dir) => {
    return {
        input: '',
        id: id,
        history: [],
        dir: dir
    };
};