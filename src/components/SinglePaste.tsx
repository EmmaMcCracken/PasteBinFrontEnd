import { useState } from "react";
import { CommentProps, SinglePasteCommentSection } from "./SPCommentSection";

interface SinglePasteProps {
  id: number;
  title: string | null;
  text: string;
  date: string;
  comments: CommentProps[];
  baseURL: string;
  setRefresh: (input: boolean) => void;
}

export function SinglePaste(props: SinglePasteProps): JSX.Element {
  const [expand, setExpand] = useState(false);
  const [editing, setEditing] = useState(false);
  const [textToEdit, setTextToEdit] = useState(props.text);
  const [titleToEdit, setTitleToEdit] = useState<string | null>(props.title);

  const pasteComments = props.comments.filter(
    (comment) => comment.paste_id === props.id
  );
  const numberOfComments = pasteComments.length;
  async function handleUpdate() {
    setEditing(false);
    await fetch(props.baseURL + "pastes/" + props.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: titleToEdit, text: textToEdit }), // body data type must match "Content-Type" header
    });
    props.setRefresh(true);
  }
  return (
    <>
      <div className="card border-light mb-3 single-paste" key={props.id}>
        <div className="card-header">{props.date.slice(0, 10)}</div>
        <div className="card-body">
          <>
            {!editing && (
              <>
                <h5 className="card-title">{props.title && props.title}</h5>
                <p
                  className={
                    expand
                      ? "card-text paste-expanded"
                      : "card-text paste-summary"
                  }
                  id={`paste-text-${props.id}`}
                >
                  {props.text}
                </p>
                {numberOfComments > 1 && ` ${numberOfComments} comments`}
                {numberOfComments === 1 && ` ${numberOfComments} comment`}{" "}
                <br />
                <button
                  className="btn btn-light"
                  onClick={() => setExpand(!expand)}
                >
                  {expand ? "See less" : "See more"}
                </button>
              </>
            )}
          </>
          {editing ? (
            <div className="CreatePaste">
              <input
                value={titleToEdit === null ? "" : titleToEdit}
                className="form-control form-control-lg"
                placeholder="add title here"
                onChange={(e) => {
                  const newItem = e.target.value;
                  setTitleToEdit(newItem);
                }}
              />
              <div className="input-group mb-3">
                <textarea
                  value={textToEdit}
                  rows={5}
                  className="form-control"
                  placeholder="Add text"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  onChange={(e) => {
                    const newItem = e.target.value;
                    setTextToEdit(newItem);
                  }}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                  onClick={() => handleUpdate()}
                >
                  Update
                </button>
              </div>{" "}
            </div>
          ) : (
            <button
              className="btn btn-light"
              onClick={() => setEditing(!editing)}
            >
              Edit paste
            </button>
          )}
          {expand && (
            <SinglePasteCommentSection
              pasteComments={pasteComments}
              baseURL={props.baseURL}
              setRefresh={props.setRefresh}
              paste_id={props.id}
            />
          )}
        </div>
      </div>
    </>
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
