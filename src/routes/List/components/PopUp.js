import React from "react";
import { TextField, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import { db } from "../../../firebase";

const AddPopUp = (props) => {
  const { addHandlerToggle, toggleValue, id, handler, values, setEditValues } =
    props;
  const [weight, setWeight] = React.useState("");
  const [date, setDate] = React.useState(moment());
  const [remark, setRemark] = React.useState("");

  React.useEffect(() => {
    // if values not empty object
    if (Object.keys(values).length !== 0) {
      if (values.weight) {
        setWeight(values.weight);
      }
      if (values.date) {
        setDate(moment(values.date, "DD/MM/YYYY"));
      }
      if (values.remark) {
        setRemark(values.remark);
      }
    }
  }, [values]);

  const add20C = () => {
    db.collection(`clients/${id}/20C`).add({
      weight: weight,
      date: moment(date).format("DD/MM/YYYY"),
      remark: remark,
    });
  };

  const add22C = () => {
    db.collection(`clients/${id}/22C`).add({
      weight: weight,
      date: moment(date).format("DD/MM/YYYY"),
      remark: remark,
    });
  };

  const addGold = () => {
    db.collection(`clients/${id}/GOLD`).add({
      weight: weight,
      date: moment(date).format("DD/MM/YYYY"),
      remark: remark,
    });
  };

  const edit20C = () => {
    db.collection(`clients/${id}/20C`)
      .doc(values.id)
      .update({
        weight: weight,
        date: moment(date).format("DD/MM/YYYY"),
        remark: remark,
      });
  };

  const edit22C = () => {
    db.collection(`clients/${id}/22C`)
      .doc(values.id)
      .update({
        weight: weight,
        date: moment(date).format("DD/MM/YYYY"),
        remark: remark,
      });
  };

  const editGold = () => {
    db.collection(`clients/${id}/GOLD`)
      .doc(values.id)
      .update({
        weight: weight,
        date: moment(date).format("DD/MM/YYYY"),
        remark: remark,
      });
  };

  return (
    <div className="pop-up">
      <div className="pop-up-content">
        <form className="pop-up-form">
          <h1>
            {handler === "add" ? "Add" : "Edit"} {toggleValue}
          </h1>
          <TextField
            placeholder="Weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            sx={{ margin: "10px" }}
          />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              format="DD/MM/YYYY"
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
                if (handler === "add") {
                  if (toggleValue === "20c") {
                    add20C();
                  } else if (toggleValue === "22c") {
                    add22C();
                  } else {
                    addGold();
                  }
                } else {
                  if (toggleValue === "20c") {
                    edit20C();
                  } else if (toggleValue === "22c") {
                    edit22C();
                  } else {
                    editGold();
                  }
                }
                addHandlerToggle();
                setEditValues({});
              }}
              sx={{ margin: "10px" }}
              disabled={weight.length === 0}
            >
              {handler === "add" ? "Add" : "Edit"}
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
