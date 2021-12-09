import { useState } from "react";

interface CreatePasteProps {
  baseURL: string;
  setRefresh: (input: boolean) => void;
}
export function CreatePaste(props: CreatePasteProps): JSX.Element {
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
        method: "POST",
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
