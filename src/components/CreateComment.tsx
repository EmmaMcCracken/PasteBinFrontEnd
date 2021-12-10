import { useState } from "react";

interface CreateCommentProps {
  baseURL: string;
  setRefresh: (input: boolean) => void;
  paste_id: number;
}

export function CreateComment(props: CreateCommentProps): JSX.Element {
  const { baseURL, setRefresh } = props;
  const [textToAdd, setTextToAdd] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  async function handleSubmit() {
    const data = {
      text: textToAdd,
    };
    if (textToAdd !== "") {
      await fetch(baseURL + "comments/" + props.paste_id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      setTextToAdd("");
      setRefresh(true);
    } else {
      setErrorMessage(true);
    }
  }

  return (
    <div className="CreateComment">
      <div className="input-group mb-3">
        <textarea
          value={textToAdd}
          rows={5}
          className="form-control"
          placeholder="Add comment"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          onChange={(e) => {
            const newItem = e.target.value;
            setTextToAdd(newItem);
          }}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          onClick={() => handleSubmit()}
        >
          Post
        </button>
      </div>
      <div className="error">
        {errorMessage && <p>Comment must contain text</p>}
      </div>
    </div>
  );
}
