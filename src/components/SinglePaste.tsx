import { useState } from "react";
import { CommentProps, CommentSection } from "./CommentSection";

interface SinglePasteProps {
  id: number;
  title: string | null;
  text: string;
  date: string;
  comments: CommentProps[];
}
export function SinglePaste(props: SinglePasteProps): JSX.Element {
  const [expand, setExpand] = useState(false);
  const pasteComments = props.comments.filter(
    (comment) => comment.paste_id === props.id
  );
  const numberOfComments = pasteComments.length;
  return (
    <div key={props.id}>
      <h2>{props.title && props.title}</h2>
      <p
        id={`paste-text-${props.id}`}
        className={expand ? "paste-expanded" : "paste-summary"}
      >
        {props.text}
      </p>
      {/* {console.log(countLines(props.id))} */}
      {numberOfComments > 1 && ` ${numberOfComments} comments`}
      {numberOfComments === 1 && ` ${numberOfComments} comment`} <br />
      <button onClick={() => setExpand(!expand)}>
        {expand ? "See less" : "See more"}
      </button>
      {/* {countLines(props.id) > 5 && (
        <button onClick={() => setExpand(!expand)}>
          {expand ? "See less" : "See more"}
        </button>
      )} */}
      {expand && <CommentSection pasteComments={pasteComments} />}
    </div>
  );
}
// function countLines(id: number) {
//   const el = document.getElementById(`paste-text-${id}`);
//   console.log("el", el);
//   if (el !== null) {
//     const divHeight = el.offsetHeight;
//     console.log("divHeight", divHeight);
//     const lineHeight = parseInt(el.style.lineHeight);
//     const lines = divHeight / lineHeight;
//     console.log("lineHeight", lineHeight);
//     return lines;
//   } else return 0;
// }
