import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Button, Grid, Paper } from "@mui/material";
import AddPopUp from "./components/PopUp";
const List = () => {
  const [data20c, setData20c] = React.useState([]);
  const [data22c, setData22c] = React.useState([]);
  const [clientName, setClientName] = React.useState("");
  const [datagold, setDataGold] = React.useState([]);
  const [addHandler, setAddHandler] = React.useState(false);
  const [toggle, setToggle] = React.useState("");
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getClientName = async () => {
      const q = query(collection(db, "clients"));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        if (doc.id === id) setClientName(doc.data().name);
      });
    };
    getClientName();
  }, [addHandler, id]);

  useEffect(() => {
    const getClientData20c = async () => {
      const q = query(collection(db, `/clients/${id}/20C`));
      const querySnapshot = await getDocs(q);
      const tempClients = [];
      querySnapshot.forEach((doc) => {
        tempClients.push({ id: doc.id, ...doc.data() });
      });
      setData20c(tempClients);
    };
    getClientData20c();
  }, [addHandler, id]);

  useEffect(() => {
    const getClientData22c = async () => {
      const q = query(collection(db, `/clients/${id}/22C`));
      const querySnapshot = await getDocs(q);
      const tempClients = [];
      querySnapshot.forEach((doc) => {
        tempClients.push({ id: doc.id, ...doc.data() });
      });
      setData22c(tempClients);
    };
    getClientData22c();
  }, [addHandler, id]);

  useEffect(() => {
    const getClientDataGold = async () => {
      const q = query(collection(db, `/clients/${id}/GOLD`));
      const querySnapshot = await getDocs(q);
      const tempClients = [];
      querySnapshot.forEach((doc) => {
        tempClients.push({ id: doc.id, ...doc.data() });
      });
      setDataGold(tempClients);
    };
    getClientDataGold();
  }, [id]);

  const addHandlerToggle = () => {
    setAddHandler(!addHandler);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="small"
        sx={{ margin: "10px" }}
        onClick={() => history("/")}
      >
        Back
      </Button>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1
          style={{
            margin: "10px",
            fontWeight: "bold",
            fontSize: "20px",
            alignItems: "flex-start",
          }}
        >
          Client Name: {clientName}
        </h1>
        <div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ margin: "10px" }}
            onClick={() => {
              setToggle("20c");
              addHandlerToggle();
            }}
          >
            Add 20C
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ margin: "10px" }}
            onClick={() => {
              setToggle("22c");
              addHandlerToggle();
            }}
          >
            Add 22C
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ margin: "10px" }}
            onClick={() => {
              setToggle("gold");
              addHandlerToggle();
            }}
          >
            Add GOLD
          </Button>
        </div>
      </div>
      <Grid container>
        <Grid item xs={12} sm={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
              m: 2,
            }}
          >
            <h2>20C Data</h2>
            {data20c.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p>{item.date}</p>
                <p>{item.weight}</p>
                <p>{item.remark}</p>
              </div>
            ))}

            {/* show total of all weight at last */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <p>Total</p>
              <p>
                {data20c.reduce((total, item) => {
                  return total + parseInt(item.weight) * 0.88;
                }, 0)}
              </p>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
              m: 2,
            }}
          >
            <h2>22C Data</h2>
            {data22c.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p>{item.date}</p>
                <p>{item.weight}</p>
                <p>{item.remark}</p>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <p>Total</p>
              <p>
                {data22c.reduce((total, item) => {
                  return total + parseInt(item.weight) * 0.96;
                }, 0)}
              </p>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
              m: 2,
            }}
          >
            <h2>Gold Given</h2>
            {datagold.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p>{item.date}</p>
                <p>{item.weight}</p>
                <p>{item.remark}</p>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <p>Total</p>
              <p>
                {datagold.reduce((total, item) => {
                  return total + parseInt(item.weight) * 0.995;
                }, 0)}
              </p>
            </div>
          </Paper>
        </Grid>
      </Grid>
      {addHandler && (
        <AddPopUp
          addHandlerToggle={addHandlerToggle}
          toggleValue={toggle}
          id={id}
        />
      )}
    </div>
  );
};

export default List;
