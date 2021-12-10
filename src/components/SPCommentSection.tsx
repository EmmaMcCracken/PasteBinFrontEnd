import { CreateComment } from "./CreateComment";

export interface CommentProps {
  comment_id: number;
  paste_id: number;
  text: string;
  date: string;
}

interface SingleCommentProps {
  comment_id: number;
  text: string;
  date: string;
}

interface SinglePasteCommentSectionProps {
  pasteComments: CommentProps[];
  baseURL: string;
  setRefresh: (input: boolean) => void;
  paste_id: number;
}

export function SinglePasteCommentSection(
  props: SinglePasteCommentSectionProps
): JSX.Element {
  const { pasteComments, baseURL, setRefresh } = props;

  return (
    <div className="pastesList">
      {pasteComments.map((comment) => (
        <SingleComment
          key={comment.comment_id}
          text={comment.text}
          date={comment.date}
          comment_id={comment.comment_id}
        />
      ))}
      <CreateComment
        baseURL={baseURL}
        setRefresh={setRefresh}
        paste_id={props.paste_id}
      />
    </div>
  );
}

function SingleComment(props: SingleCommentProps): JSX.Element {
  return (
    <div className="card w-100">
      <div className="card-body">
        <h5 className="card-title">{props.date.slice(0, 10)}</h5>
        <p className="card-text">{props.text}</p>
        <button className="btn btn-primary">Edit comment</button>
      </div>
    </div>
  );
}
