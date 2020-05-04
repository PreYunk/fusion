import React from "react";

const Editor2 = (props) => {
  return (
    <div
      contentEditable="true"
      style={{ width: props.width, height: props.height }}
    ></div>
  );
};
export default Editor2;
