import { useEffect, useState } from "react";

interface PasteProps {
  id: number;
  title: string | null;
  text: string;
  date: string;
}

interface RecentPastesProps {
  pastesList: PasteProps[];
}

function CreatePaste(): JSX.Element {
  return (
    <div className="CreatePaste">
      {/* <input
        value={descriptionToAdd}
        placeholder="add item here"
        onChange={(e) => {
          const newItem = e.target.value;
          setDescriptionToAdd(newItem);
        }}
      /> */}
    </div>
  );
}

function RecentPastes(props: RecentPastesProps): JSX.Element {
  const { pastesList } = props;
  return (
    <div className="pastesList">
      {pastesList.map((paste) => (
        <p key={paste.id}>{paste.text}</p>
      ))}
    </div>
  );
}

function App(): JSX.Element {
  const baseURL = "https://c3a4-paste-bin-back-end.herokuapp.com/";

  const [pastesList, setPastesList] = useState<PasteProps[]>([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch(baseURL);
      const data = await response.json();
      setPastesList(data);
    }
    getData();
  }, [pastesList]);

  return (
    <div className="main">
      {" "}
      <CreatePaste /> <RecentPastes pastesList={pastesList} />{" "}
    </div>
  );
}

export default App;
