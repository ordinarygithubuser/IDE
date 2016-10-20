const Result = (type, value) => ({ type, value });

export const execute = session => {
    const args = ('/c ' + session.input).split(' ');

    return Result('Wayne', 'Command not implemented for: ' + session.input);
};

