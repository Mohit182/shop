import { Button, Grid, Paper } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import AddPopUp from "./components/AddPopUp";
import { collection, query, where, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const history = useNavigate();
  const [clients, setClients] = React.useState([]);
  const [addHandler, setAddHandler] = React.useState(false);

  const addHandlerToggle = () => {
    setAddHandler(!addHandler);
  };

  React.useEffect(() => {
    db.collection("clients/")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setClients((prev) => [
            ...prev,
            { id: doc.id, name: doc.data().name },
          ]);
        });
      });
  }, []);

  //   when all the clients are fetched, the clients array is set to the state
  //   the clients array is then mapped to display the client size using the below useEffect

  React.useEffect(() => {
    clients.map((client) => {
      db.collection("clients/" + client.id + "/85%")
        .get()
        .then((snapshot) => {
          const size85 = snapshot.size || 0;

          db.collection("clients/" + client.id + "/92%")
            .get()
            .then((snapshot) => {
              const size92 = snapshot.size || 0;

              setClients((prev) =>
                prev.map((item) =>
                  item.id === client.id
                    ? { ...item, size: size85 + size92 }
                    : item
                )
              );
            });
        });
    });
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
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
        {clients.map((client) => (
          <Grid item xs={12} md={6} lg={3} key={client.id}>
            <div className="dashboard-card" onClick={() => history(`/list/${client.id}`)}>
              <h4 className="card-title">{client.name}</h4>
              <div className="card-body">{client.size} entries</div>
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
