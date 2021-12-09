import { SinglePaste } from "./SinglePaste";
import { PasteProps } from "../App";
import { CommentProps } from "./CommentSection";

interface RecentPastesProps {
  pastesList: PasteProps[];
  baseURL: string;
  comments: CommentProps[];
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
        />
      ))}
    </div>
  );
}
