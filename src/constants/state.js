export const EditorState = (props = {}) => ({
    prev: [],
    file: props.file || null,
    files: props.files || [],
    context: null
});

export const ProjectState = (props = {}) => ({
    selected: null,
    name: props.name || '',
    author: props.author || '',
    root: props.root || null,
    files: props.files || [],
    license: props.license || ''
});