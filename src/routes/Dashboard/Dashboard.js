import { Button, Grid, Paper } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import AddPopUp from "./components/AddPopUp";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useCookies } from "react-cookie";

const Dashboard = () => {
  const history = useNavigate();
  const [clients, setClients] = React.useState([]);
  const [addHandler, setAddHandler] = React.useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  React.useEffect(() => {
    if (cookies.token === undefined || cookies.token === null || cookies.token.length === 0) {
      history("/login");
    }
  }, [cookies.token]);

  const addHandlerToggle = () => {
    setAddHandler(!addHandler);
  };

  React.useEffect(() => {
    const getClients = async () => {
      const q = query(collection(db, "clients"));
      const querySnapshot = await getDocs(q);
      const tempClients = [];
      querySnapshot.forEach((doc) => {
        tempClients.push({ id: doc.id, ...doc.data() });
      });
      setClients(tempClients);
    };
    getClients();
  }, [addHandler]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginTop: "70px",
        }}
      >
        <h4
          style={{
            margin: "10px",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          Dashboard
        </h4>
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{ margin: "10px" }}
          onClick={addHandlerToggle}
        >
          Add client
        </Button>
      </div>
      <Grid container spacing={3}>
        {clients &&
          clients.map((client) => (
            <Grid item xs={12} md={6} lg={3} key={client.id}>
              <div
                className="dashboard-card"
                onClick={() => history(`/list/${client.id}`)}
              >
                <h4 className="card-title">{client.name}</h4>
                {/* <div className="card-body">{client.size} entries</div> */}
              </div>
            </Grid>
          ))}
      </Grid>
      {/* </Paper> */}
      {addHandler && <AddPopUp addHandlerToggle={addHandlerToggle} />}
    </div>
  );
};

export default Dashboard;
