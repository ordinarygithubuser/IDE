export const EditorState = (props = {}) => ({
    prev: [],
    file: props.file || null,
    files: props.files || [],
    context: null
});

export const ProjectState = (props = {}) => ({
    name: props.name || '',
    author: props.author || '',
    children: props.files || [],
    license: props.license || '',
    open: true
});