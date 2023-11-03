import React, { useEffect, useMemo, useState } from "react";
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { useLoaderData, useSubmit, useLocation } from "react-router-dom";
import { debounce } from "@mui/material";

export default function Note() {
  const { note } = useLoaderData();
  const submit = useSubmit();
  const location = useLocation();
  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty();
  });

  //rawHTML: dữ liệu chuyển từ dạng editor state của thư viện draftjs sang HTML
  const [rawHTML, setRawHTML] = useState(note.content);

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(note.content);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(state));
  }, [note.id]);

  // chỉ submit dữ liệu sang backend khi rawHTML thay đổi
  useEffect(() => {
    debouncedMemorized(rawHTML, note, location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawHTML, location.pathname]);

  //khi event onchange khi gõ nó sẽ hoạt động liên tục
  //nên sẽ delay nó 1 khoảng tgian là 1 giây trong khoảng tgian 1 giây nó nếu ta gõ liên tục nó sẽ bỏ qua các event trc đó mà chỉ thực thi event cuối cùng
  const debouncedMemorized = useMemo(() => {
    return debounce((rawHTML, note, pathname) => {
      if (rawHTML === note.content) return;

      submit(
        { ...note, content: rawHTML },
        {
          method: "post",
          action: pathname,
        }
      );
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setRawHTML(note.content);
  }, [note.content]);

  const handleOnChange = (e) => {
    setEditorState(e);
    setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())));
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleOnChange}
      placeholder="Write something!"
    ></Editor>
  );
}
