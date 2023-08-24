import React from "react";
import { TextField, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import { db } from "../../../firebase";

const AddPopUp = (props) => {
  const { addHandlerToggle, toggleValue, id } = props;
  const [weight, setWeight] = React.useState("");
  const [date, setDate] = React.useState(moment());
  const [remark, setRemark] = React.useState("");

  const add20C = () => {
    console.log("20C");
    db.collection(`clients/${id}/20C`).add({
      weight: weight,
      date: moment(date).format("DD/MM/YYYY"),
      remark: remark,
    });
  };

  const add22C = () => {
    console.log("22C");
    db.collection(`clients/${id}/22C`).add({
      weight: weight,
      date: moment(date).format("DD/MM/YYYY"),
      remark: remark,
    });
  };

  const addGold = () => {
    console.log("gold");
    db.collection(`clients/${id}/GOLD`).add({
      weight: weight,
      date: moment(date).format("DD/MM/YYYY"),
      remark: remark,
    });
  };

  return (
    <div className="pop-up">
      <div className="pop-up-content">
        <form className="pop-up-form">
          <h1>Add {toggleValue}</h1>
          <TextField
            placeholder="Weight"
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            sx={{ margin: "10px" }}
          />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="Date"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
            />
          </LocalizationProvider>
          <TextField
            placeholder="Remark"
            type="text"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            sx={{ margin: "10px" }}
          />
          <div style={{ display: "flex" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (toggleValue === "20c") {
                  add20C();
                } else if (toggleValue === "22c") {
                  add22C();
                } else {
                  addGold();
                }
                addHandlerToggle();
              }}
              sx={{ margin: "10px" }}
            >
              Add
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
