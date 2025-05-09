import React, { useEffect, useState } from "react";
import {
  Editor,
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
} from "draft-js";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html"; // <-- Import this
import "draft-js/dist/Draft.css";

const DraftEditor = ({ value, onChange }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized && value) {
      try {
        const parsed = JSON.parse(value);
        const contentState = convertFromRaw(parsed);
        setEditorState(EditorState.createWithContent(contentState));
      } catch (err) {
        const blocksFromHtml = htmlToDraft(value);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(
          contentBlocks,
          entityMap
        );
        setEditorState(EditorState.createWithContent(contentState));
      }
      setInitialized(true);
    }
  }, [value, initialized]);

  const handleChange = (state) => {
    setEditorState(state);
    const content = convertToRaw(state.getCurrentContent());
    const html = draftToHtml(content); // <-- Convert to HTML
    onChange(html);
  };

  return (
    <div className="border rounded p-0 bg-white min-h-[200px] border-gray-300">
      <div className="max-h-[270px] overflow-y-auto p-3">
        <Editor
          editorState={editorState}
          onChange={handleChange}
          placeholder="Write your message here..."
        />
      </div>
    </div>
  );
};

export default DraftEditor;
