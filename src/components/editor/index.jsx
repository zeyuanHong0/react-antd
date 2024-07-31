import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { useEffect, useState } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
// import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";

const MyEditor = ({ getHtml, editContent }) => {
  const [editor, setEditor] = useState(null);
  const [html, setHtml] = useState("");
  // 工具栏配置
  const toolbarConfig = {};

  // 编辑器配置
  const editorConfig = {
    placeholder: "请输入内容...",
  };

  // 详情内容返显
  useEffect(() => {
    setHtml(editContent);
  }, [editContent]);

  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  const handleSetHtml = (editor) => {
    setHtml(editor.getHtml());
    getHtml(
      editor.isEmpty() || editor.getText().trim().length === 0
        ? ""
        : editor.getHtml()
    );
  };
  return (
    <>
      <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: "1px solid #ccc" }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => handleSetHtml(editor)}
          mode="default"
          style={{ height: "300px", overflowY: "hidden" }}
        />
      </div>
    </>
  );
};

export default MyEditor;
