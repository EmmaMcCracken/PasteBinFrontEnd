import { SinglePaste } from "./SinglePaste";
import { PasteProps } from "../App";
import { CommentProps } from "./SPCommentSection";

interface RecentPastesProps {
  pastesList: PasteProps[];
  comments: CommentProps[];
  baseURL: string;
  setRefresh: (input: boolean) => void;
}
export function RecentPastes(props: RecentPastesProps): JSX.Element {
  const { pastesList, comments } = props;

  return (
    <div className="pastesList">
      {pastesList.map((paste) => (
        <SinglePaste
          key={paste.id}
          id={paste.id}
          title={paste.title}
          text={paste.text}
          date={paste.date}
          comments={comments}
          baseURL={props.baseURL}
          setRefresh={props.setRefresh}
        />
      ))}
    </div>
  );
}
