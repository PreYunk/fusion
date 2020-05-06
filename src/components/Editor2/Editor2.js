import React, { useState, useEffect, useRef } from "react";
import classes from "./Editor2.css";
import Toolbar from "./Toolbar/Toolbar";

const Editor2 = (props) => {
  const editorRef = useRef(null);
  const toolbarButtonClickHandler = (isOn, type) => {
    if (isOn) {
      setEditorState(editorState + "|s|" + type + "|s/|");
    } else {
      setEditorState(editorState + "|e|" + type + "|e/|");
    }
    editorRef.current.focus();
  };

  const [editorState, setEditorState] = useState(props.editorState || "");

  useEffect(() => {
    props.onChange(editorState);
  }, [editorState]);

  const onChangeHandler = (event) => {
    console.log(props.editStatus);

    setEditorState(event.target.value);
  };

  return (
    <div className={classes.Wrapper}>
      <Toolbar
        toolbarButtonClicked={(isOn, type) =>
          toolbarButtonClickHandler(isOn, type)
        }
      />
      <textarea
        ref={editorRef}
        autoFocus
        readOnly={props.readOnly}
        className={classes.Editor}
        style={{ width: props.width, height: props.height, resize: "none" }}
        onChange={(event) => onChangeHandler(event)}
        type="text/html"
        value={editorState}
      />
    </div>
  );
};
export default Editor2;
export const editorStateToRenderState = (es) => {
  console.log(es);
  const renderState = { lines: [], raw: es };
  let tracker = "";
  let segment = "";
  let segCtr = 0;
  let segmentType = "";
  let line = {};
  for (let i = 0; i < es.length; i++) {
    tracker += es[i];
    if (tracker.endsWith("|s/|")) {
      console.log("1st");
      console.log(segment);

      if (segment !== "") {
        segment = segment.slice(0, -10);
        line[segCtr] = { text: segment, type: "text" };
        segCtr++;
        segment = "";
      }
    } else if (tracker.endsWith("|e/|")) {
      console.log("2");
      segmentType = segment.slice(-7, -3);
      segment = segment.slice(0, -10);
      line[segCtr] = { text: segment, type: segmentType };
      segCtr++;
      segment = "";
      if (i === es.length - 1) renderState.lines.push(line);
    } else if (es[i] === "\n") {
      console.log("3");
      line[segCtr] = { text: segment, type: "text" };
      segCtr = 0;
      segment = "";
      renderState.lines.push(line);
      line = {};
    } else if (i === es.length - 1) {
      console.log("4");
      segment += es[i];
      line[segCtr] = { text: segment, type: "text" };
      renderState.lines.push(line);
      segCtr = 0;
      segment = "";
      line = {};
    } else {
      segment += es[i];
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
    let l = "";
    for (const s of Object.values(line)) {
      l += s.text + " ";
    }
    acc += l + "\n";
    return acc;
  }, "");
};
