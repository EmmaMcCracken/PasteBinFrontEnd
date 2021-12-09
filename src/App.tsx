import { useEffect, useState } from "react";

interface PasteProps {
  id: number;
  title: string | null;
  text: string;
  date: string;
}

interface CreatePasteProps {
  baseURL: string;
  setRefresh: (input: boolean) => void;
}

interface RecentPastesProps {
  pastesList: PasteProps[];
}

function CreatePaste(props: CreatePasteProps): JSX.Element {
  const { baseURL, setRefresh } = props;
  const [textToAdd, setTextToAdd] = useState("");
  const [titleToAdd, setTitleToAdd] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  async function handleSubmit() {
    const data = {
      title: titleToAdd,
      text: textToAdd,
    };
    if (titleToAdd.length < 51 && textToAdd !== "") {
      await fetch(baseURL + "pastes", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      setTextToAdd("");
      setTitleToAdd("");
      setRefresh(true);
    } else {
      setErrorMessage(true);
    }
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
      <div className="error">
        {titleToAdd.length > 50 && (
          <p>The title should not exceed 50 characters.</p>
        )}
        {errorMessage && (
          <p>
            Your paste could not be submitted. Please make sure the text input
            is not blank.
          </p>
        )}
      </div>
    </div>
  );
}

function RecentPastes(props: RecentPastesProps): JSX.Element {
  const { pastesList } = props;

  return (
    <div className="pastesList">
      {pastesList.map((paste) => <SinglePaste key={paste.id} id={paste.id} title={paste.title} text={paste.text} date={paste.date}/>)}
    </div>
  );
}

interface SinglePasteProps {
  id: number;
  title: string | null;
  text: string;
  date: string;
}

function SinglePaste(props: SinglePasteProps): JSX.Element {
  const [expand, setExpand] = useState(false);
  return (
        <div className={expand ? "paste-expanded" : "paste-summary"} key={props.id} onClick={() => setExpand(!expand)}>
          <h2>{props.title && props.title}</h2>
          <p>{props.text}</p>
        </div>
  );
}

function App(): JSX.Element {
  const baseURL = "https://c3a4-paste-bin-back-end.herokuapp.com/";

  const [pastesList, setPastesList] = useState<PasteProps[]>([]);

  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      const response = await fetch(baseURL + "pastes");
      const data = await response.json();
      setPastesList(data);
      setRefresh(false);
    }
    getData();
  }, [refresh]);

  return (
    <div className="main">
      {" "}
      <CreatePaste baseURL={baseURL} setRefresh={setRefresh} />{" "}
      <RecentPastes pastesList={pastesList} />{" "}
    </div>
  );
}

export default App;
