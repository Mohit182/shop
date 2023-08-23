import { Button } from "@mui/material";
import React from "react";
import { db } from "../../../firebase";
import { TextField } from "@mui/material";

const AddPopUp = (props) => {
  const { addHandlerToggle } = props;
  const [name, setName] = React.useState("");

  const addClientHandler = () => {
    db.collection("clients").add({
      name: name,
    });
  };

  return (
    <div className="pop-up">
      <div className="pop-up-content">
        <form className="pop-up-form">
          <h1>Add Client</h1>
          <TextField
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ margin: "10px" }}
          />
          <div style={{ display: "flex" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                addHandlerToggle();
                addClientHandler();
              }}
              sx={{ margin: "10px" }}
            >
              Add Client
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={addHandlerToggle}
              sx={{ margin: "10px" }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPopUp;
