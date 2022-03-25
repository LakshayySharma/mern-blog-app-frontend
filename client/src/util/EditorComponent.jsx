import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EditorComponent = () => {
  return (
    <Editor
      wrapperClassName="wrapper-class"
      editorClassName="editor-class"
      toolbarClassName="toolbar-class"
      // wrapperStyle={<wrapperStyleObject>}
      // editorStyle={<editorStyleObject>}
      // toolbarStyle={<toolbarStyleObject>}
    />
  );
};

export default EditorComponent;
