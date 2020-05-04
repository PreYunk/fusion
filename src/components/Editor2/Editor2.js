import React, { useState } from "react";
import classes from "./Editor2.css";

const Editor2 = (props) => {
  const [editorState, setEditorState] = useState("");

  return (
    <>
      <textarea
        className={classes.Editor}
        style={{ width: props.width, height: props.height, resize: "none" }}
        onChange={(event) => setEditorState(event.target.value)}
        type="text/html"
        value={editorState}
      />
      <button
        onClick={() => {
          console.log(editorStateToRenderState(editorState));
          console.log(renderStateToHTML(editorStateToRenderState(editorState)));
          console.log(
            renderStateToEditorState(editorStateToRenderState(editorState))
          );
        }}
      >
        Click
      </button>
    </>
  );
};
export default Editor2;
export const editorStateToRenderState = (es) => {
  const renderState = { lines: [] };
  let line = "";
  for (let i = 0; i < es.length; i++) {
    if (es[i] === "\n" || i == es.length - 1) {
      renderState.lines.push(line);
      line = "";
    } else if (i == es.length - 2) {
      line = line + es[i] + es[i + 1];
    } else {
      line = line + es[i];
    }
  }
  return renderState;
};

export const renderStateToHTML = (rs) => {
  return rs.lines
    .map((line) => {
      return "<p>" + line + "</p>";
    })
    .join("");
};
export const renderStateToEditorState = (rs) => {
  return rs.lines.reduce((acc, line) => {
    acc += line + "\n";
    return acc;
  }, "");
};
