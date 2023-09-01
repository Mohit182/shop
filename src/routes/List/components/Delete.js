import React from "react";
import { db } from "../../../firebase";
import { Button } from "@mui/material";

const Delete = (props) => {
  const { deleteHandlerToggle, id, toggleValue, values, setEditValues } = props;
  const delete20c = () => {
    db.collection(`clients/${id}/20C`)
      .doc(values.id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        deleteHandlerToggle();
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const delete22c = () => {
    db.collection(`clients/${id}/22C`)
      .doc(values.id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        deleteHandlerToggle();
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const deleteGold = () => {
    db.collection(`clients/${id}/GOLD`)
      .doc(values.id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        deleteHandlerToggle();
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <div className="pop-up">
      <div className="pop-up-content">
        <form className="pop-up-form">
          <h3> Delete Value </h3>
          <p>Are you sure you want to delete this value?</p>
          <div style={{ display: "flex" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ margin: "10px" }}
              onClick={() => {
                if (toggleValue === "20c") {
                  delete20c();
                } else if (toggleValue === "22c") {
                  delete22c();
                } else {
                  deleteGold();
                }
                setEditValues({});
                deleteHandlerToggle();
              }}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={deleteHandlerToggle}
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

export default Delete;
