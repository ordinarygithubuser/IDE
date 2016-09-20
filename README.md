## Code Editor

A minimal code editor including only features to create JavaScript web and
desktop applications in a rapid, opinionated way. The IDE consist of three
main views, commonly found in editors: The project explorer, the code area
and the terminal section.

The context menu on the project explorer assists by providing templates for
commonly used code constructs. The underlying library to build the applications
is MVA and so it's constructs are used, namely Actions, Components and Stores.

However, on the long run model falls shall be introduced that are diagrams
describing the interaction between these constructs. Most of boilerplate
code should be generated through the editor by translating the diagrams (
described in JSON) into code.

The terminal can run arbitrary commands. At this time interactive sessions are
unfortunately not available. pty.js offers the possibility to integrate these
interactive session. However on my windows machine this won't work at the moment
because the latest pty builds do not contain the needed bindings for node-gyp.

## Roadmap

- ~~Fix folder collapsing on rename action~~
- ~~Fix home path in file browsers~~
- ~~Implement copy / paste for files and directories~~
- ~~Keep editor text in sync with temporary file~~
  * ~~Read file content every time if a file is not already opened~~
- ~~Make SplitPane resizeable~~
  * ~~Make area size relative not absolute~~
  * ~~Let user change relation pre drag and drop~~
- Provide UI interface for frequent commands
- Implement model editor
  * Canvas to create and connect elements
  * Generator / Assistant
- Revisit pty
- ~~Include footer for messages / stats~~
- Fix size of ace_content on maximize / minimize