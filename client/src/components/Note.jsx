import React, { useEffect, useState } from "react";
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { draftToHTML } from "draftjs-to-html";
import { useLoaderData } from "react-router-dom";

export default function Note() {
  const { note } = useLoaderData();
  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty();
  });
  const [rawHTML, setDrawHTML] = useState(note.content);

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(note.content);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(state));
  }, [note.id]);

  useEffect(() => {
    setDrawHTML(note.content);
  }, [note.content]);

  const handleOnChange = (e) => {
    setEditorState(e);
    setDrawHTML(draftToHTML(convertToRaw(e.getCurrentContent())));
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleOnChange}
      placeholder="Write something!"
    ></Editor>
  );
}
