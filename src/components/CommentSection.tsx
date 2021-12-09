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
  comments: CommentProps[];
  paste_id: number;
}

export function CommentSection(props: CommentSectionProps): JSX.Element {
  const { comments, paste_id } = props;

  const pasteComments = comments.filter(
    (comment) => comment.paste_id === paste_id
  );

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
