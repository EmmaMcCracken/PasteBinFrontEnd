import { useEffect, useState } from "react";

interface PasteProps {
  id: number;
  title: string | null;
  text: string;
  date: string;
}

interface CreatePasteProps {
  baseURL: string;
}

interface RecentPastesProps {
  pastesList: PasteProps[];
}

function CreatePaste(props: CreatePasteProps): JSX.Element {
  const { baseURL } = props;
  const [textToAdd, setTextToAdd] = useState("");
  const [titleToAdd, setTitleToAdd] = useState("");

  async function handleSubmit() {
    const data = {
      title: titleToAdd,
      text: textToAdd,
    };

    if (titleToAdd.length > 50) {
      alert("The title must be less than 50 characters.");
    }

    await fetch(baseURL, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    setTextToAdd("");
    setTitleToAdd("");
  }
  return (
    <div className="CreatePaste">
      <input
        value={titleToAdd}
        placeholder="add title here"
        onChange={(e) => {
          const newItem = e.target.value;
          setTitleToAdd(newItem);
        }}
      />
      <input
        value={textToAdd}
        placeholder="add text here"
        onChange={(e) => {
          const newItem = e.target.value;
          setTextToAdd(newItem);
        }}
      />
      <button onClick={() => handleSubmit()}>Submit</button>
    </div>
  );
}

function RecentPastes(props: RecentPastesProps): JSX.Element {
  const { pastesList } = props;
  return (
    <div className="pastesList">
      {pastesList.map((paste) => (
        <div className="pasteItem" key={paste.id}>
          <h2>{paste.title && paste.title}</h2>
          <p>{paste.text}</p>
        </div>
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
      <CreatePaste baseURL={baseURL} /> <RecentPastes pastesList={pastesList} />{" "}
    </div>
  );
}

export default App;
