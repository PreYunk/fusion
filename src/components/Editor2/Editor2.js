import React, { useState, useEffect, useRef } from "react";
import classes from "./Editor2.css";
import Toolbar from "./Toolbar/Toolbar";
import AlertDialog from "../AlertDialog/AlertDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faDivide } from "@fortawesome/free-solid-svg-icons";
import { Context, Node } from "react-mathjax2";
import Button from "../Button/Button";
import ToolbarDialog from "./Toolbar/ToolbarDialog/ToolbarDialog";
import Input from "../Input/Input";
import MathButtons from "./Toolbar/MathButtons/MathButtons";

let currentType = "";

const infoComponents = (
  <Context input="tex">
    <div>
      <div>
        <span>
          Clicking on <FontAwesomeIcon icon={faDivide} />
          &nbsp; on Editor toolbar marks the start of math expression.<br></br>{" "}
          you can see the editor appends <b>|s|math|/s|</b> expression when the
          option is selected.<br></br> This marks starting of math expression"
          and on deselecting it editor appends <b>|e|math|/e|</b> ,this marks
          ending of math expression," which means everything between{" "}
          <b>|s|math|/s|</b> and <b>|e|math|/e|</b> is considered as math
          expression.
        </span>
        <br />
        <br />
        <br />
      </div>
      <br />
      <div>
        <h2>
          <FontAwesomeIcon icon={faInfoCircle} />
          &nbsp; Make sure to press divide icon to start math expression and
          press the same button to end expression in same line
        </h2>
      </div>
      <br />
      <div>
        <h3>Button Examples</h3>
        <br />
        <ol>
          <li>
            <span>
              <Node inline>{"\\frac{x}{y}"}</Node> button generates expression{" "}
              <b>{"\\frac{}{}"}</b>
            </span>
            <br></br>
            Example:- {"\\frac{x}{y}"} will generate{" "}
            <Node inline>{"\\frac{x}{y}"}</Node>
          </li>
          <li>
            <span>
              x button generates expression <b>{"\\times"}</b>
            </span>
            <br></br>
            Example:- {"a \\times b"} will generate{" "}
            <Node inline>{"a \\times b"}</Node>
          </li>
          <li>
            <span>
              <Node inline>{"\\sqrt{x}"}</Node> button generates expression{" "}
              <b>{"\\sqrt{x}"}</b>
            </span>
            <br></br>
            Example:- {"\\sqrt{x}"} will generate{" "}
            <Node inline>{"\\sqrt{x}"}</Node>
          </li>
          <li>
            <span>
              <Node inline>{"\\int"}</Node> button generates expression{" "}
              <b>{"\\int"}</b>
            </span>
            <br></br>
            Example:- {"\\int (x^2)"} will generate{" "}
            <Node inline>{"\\int (x^2)"}</Node>
          </li>
        </ol>
      </div>
      <hr />
      <div>
        <h3>
          You can merge functions to create complex expressions like including
          sqrt in frac function
        </h3>
        <h3>Examples</h3>
        <ul>
          <li>
            To write <Node inline>{"x^2"}</Node> expression will be <b>x^2</b>
          </li>
          <li>
            To write <Node inline>{"\\frac{1}{\\sqrt{x}}"}</Node> expression
            will be <b>{"\\frac{1}{\\sqrt{x}}"}</b>
          </li>
          <li>
            To write <Node inline>{"x^2 + x + c1 = c2"}</Node> expression will
            be <b>x^2 + x + c1 = c2</b>
          </li>
          <li>
            To write{" "}
            <Node inline>{"x = \\frac{-b + \\sqrt{b^2 - 4ac}}{2a}"}</Node>{" "}
            expression will be <b>{"x = \\frac{-b + \\sqrt{b^2 - 4ac}}{2a}"}</b>
          </li>
        </ul>
      </div>
    </div>
  </Context>
);

const Editor2 = (props) => {
  const [expState, setExpState] = useState("");
  const [editorState, setEditorState] = useState(props.editorState || "");
  const [infoOpen, setInfoOpen] = useState(false);
  const [mathBarVisible, setMathBarVisible] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const editorRef = useRef(null);
  const inputRef = useRef(null);

  const insertAtCaret = (text, state, setState, ref) => {
    const startPos = ref.current.selectionStart;
    const endPos = ref.current.selectionEnd;
    const scrollTop = ref.current.scrollTop;
    setState(
      state.substring(0, startPos) +
        " " +
        text +
        " " +
        state.substring(endPos, state.length)
    );
    ref.current.focus();
    ref.current.selectionStart = startPos + text.length;
    ref.current.selectionEnd = startPos + text.length;
    ref.current.scrollTop = scrollTop;
  };
  const toolbarButtonClickHandler = (isOn, type) => {
    currentType = type;
    if (type === "math") setMathBarVisible(true);
    else setMathBarVisible(false);
    setDialogOpen(true);
  };

  useEffect(() => {
    props.onChange(editorState);
  }, [editorState]);

  const onChangeHandler = (event) => {
    setEditorState(event.target.value);
  };

  const editorInfoClickHandler = () => {
    setInfoOpen(true);
  };
  const onInfoClose = () => {
    setInfoOpen(false);
  };
  const mathButtonClickHandler = (exp) => {
    insertAtCaret(exp, expState, setExpState, inputRef);
  };

  const toolbarDialogAcceptHandler = (dialogType) => {
    setDialogOpen(false);
    insertAtCaret(
      "|s|" +
        dialogType +
        "|s/|" +
        " " +
        expState +
        " " +
        "|e|" +
        dialogType +
        "|e/|",
      editorState,
      setEditorState,
      editorRef
    );
    setExpState("");
  };

  const toolbarContents = [];
  toolbarContents.push(
    <MathButtons
      visible={mathBarVisible}
      onMathButtonClicked={mathButtonClickHandler}
    />
  );
  toolbarContents.push(
    <Input
      ref={inputRef}
      value={expState}
      onChange={(event) => setExpState(event.target.value)}
      placeholder="Expression"
    />
  );

  return (
    <div className={classes.Wrapper}>
      <div className={classes.editorInfo}>
        <Button onClick={editorInfoClickHandler}>
          <FontAwesomeIcon icon={faInfoCircle} />
          &nbsp;Editor
        </Button>
      </div>
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
      <AlertDialog
        fullScreen
        isOpen={infoOpen}
        onClose={onInfoClose}
        dialogTitle="Instructions to use Editor (Mainly for maths)"
        onClickButton={onInfoClose}
        buttonText="Close"
        dialogContentComponent={infoComponents}
      />
      <ToolbarDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        content={toolbarContents}
        onAccept={toolbarDialogAcceptHandler}
        dialogType={currentType}
      />
    </div>
  );
};
export default Editor2;
export const editorStateToRenderState = (es) => {
  const renderState = { lines: [], raw: es };
  let tracker = "";
  let segment = "";
  let segCtr = 0;
  let segmentType = "";
  let line = {};
  for (let i = 0; i < es.length; i++) {
    tracker += es[i];
    if (tracker.endsWith("|s/|")) {
      if (segment !== "") {
        segment = segment.slice(0, -10);
        line[segCtr] = { text: segment, type: "text" };
        segCtr++;
        segment = "";
      }
    } else if (tracker.endsWith("|e/|")) {
      segmentType = segment.slice(-7, -3);
      segment = segment.slice(0, -10);
      line[segCtr] = { text: segment, type: segmentType };
      segCtr++;
      segment = "";
      if (i === es.length - 1) renderState.lines.push(line);
    } else if (es[i] === "\n") {
      line[segCtr] = { text: segment, type: "text" };
      segCtr = 0;
      segment = "";
      renderState.lines.push(line);
      line = {};
    } else if (i === es.length - 1) {
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
