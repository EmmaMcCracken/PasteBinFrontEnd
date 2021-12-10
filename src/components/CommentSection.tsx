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

interface CommentSectionProps {
  pasteComments: CommentProps[];
}

export function CommentSection(props: CommentSectionProps): JSX.Element {
  const { pasteComments } = props;

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
    </div>
  );
}

function SingleComment(props: SingleCommentProps): JSX.Element {
  return (
    <>
      <p>{props.text}</p>
    </>
  );
}
