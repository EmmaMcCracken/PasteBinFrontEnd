import { useEffect, useState } from "react";
import { CommentProps } from "./components/SPCommentSection";
import { CreatePaste } from "./components/CreatePaste";
import { RecentPastes } from "./components/RecentPastes";

export interface PasteProps {
  id: number;
  title: string | null;
  text: string;
  date: string;
}

function App(): JSX.Element {
  const baseURL = "https://c3a4-paste-bin-back-end.herokuapp.com/";

  const [pastesList, setPastesList] = useState<PasteProps[]>([]);

  const [refresh, setRefresh] = useState<boolean>(false);

  const [commentsList, setCommentsList] = useState<CommentProps[]>([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch(baseURL + "pastes");
      const data = await response.json();
      setPastesList(data);
      setRefresh(false);
    }
    getData();
  }, [refresh]);

  useEffect(() => {
    async function getData() {
      const response = await fetch(baseURL + "comments");
      const data: CommentProps[] = await response.json();
      setCommentsList(data);
    }
    getData();
  }, [refresh]);

  return (
    <div className="main">
      {" "}
      <h1 className="display-1">Paste Bin</h1>
      <CreatePaste baseURL={baseURL} setRefresh={setRefresh} />{" "}
      <RecentPastes
        comments={commentsList}
        baseURL={baseURL}
        pastesList={pastesList}
        setRefresh={setRefresh}
      />{" "}
    </div>
  );
}

export default App;
