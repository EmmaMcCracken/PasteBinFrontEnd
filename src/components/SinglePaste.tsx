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
  async function handleDelete() {
    await fetch(props.baseURL + "pastes/" + props.id, {
      method: "DELETE",
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
                {props.text.includes("\n") ? (
                  <pre
                    className={
                      expand
                        ? "card-text paste-expanded"
                        : "card-text paste-summary"
                    }
                    id={`paste-text-${props.id}`}
                  >
                    {props.text}
                  </pre>
                ) : (
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
                )}
                {numberOfComments > 1 && ` ${numberOfComments} comments`}
                {numberOfComments === 1 && ` ${numberOfComments} comment`}{" "}
                <br />
                {hasMoreThanFiveLines(props.text) ? (
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => setExpand(!expand)}
                  >
                    {expand ? "See less" : "See more"}
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => setExpand(!expand)}
                  >
                    {expand ? "See less" : "See comments"}
                  </button>
                )}
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
            <>
              <button
                className="btn btn-outline-warning"
                onClick={() => setEditing(!editing)}
              >
                Edit paste
              </button>
              <button
                className="btn btn-outline-dark"
                onClick={() => navigator.clipboard.writeText(props.text)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-back"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z" />
                </svg>
              </button>
            </>
          )}
          {editing && (
            <button
              className="btn btn-secondary"
              onClick={() => setEditing(!editing)}
            >
              Cancel
            </button>
          )}
          <button
            className="btn btn-outline-danger"
            onClick={() => handleDelete()}
          >
            Delete paste
          </button>
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

function hasMoreThanFiveLines(input: string) {
  if (input.split("\n").length > 5) {
    return true;
  } else {
    return false;
  }
}
