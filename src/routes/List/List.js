import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Button, Grid, Paper } from "@mui/material";
import AddPopUp from "./components/PopUp";
import { useCookies } from "react-cookie";
import { Menu, MenuItem } from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Delete from "./components/Delete";

const ListItem = ({
  item,
  setHandler,
  setToggle,
  toggle,
  HandlePopUp,
  setEditValues,
  handleDeletePopUp,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      key={item.id}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <p>{item.date}</p>
      <p>{item.weight}</p>
      <p>{item.remark}</p>
      <MoreVertRoundedIcon onClick={handleMenuOpen} />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            setHandler("edit");
            setToggle(toggle);
            setEditValues(item);
            HandlePopUp();
            handleMenuClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setToggle(toggle);
            setEditValues(item);
            handleDeletePopUp();
            handleMenuClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

const List = () => {
  const [data20c, setData20c] = React.useState([]);
  const [data22c, setData22c] = React.useState([]);
  const [clientName, setClientName] = React.useState("");
  const [datagold, setDataGold] = React.useState([]);
  const [addHandler, setAddHandler] = React.useState(false);
  const [deleteHandler, setDeleteHandler] = React.useState(false);
  const [handler, setHandler] = React.useState("add");
  const [editValues, setEditValues] = React.useState({});
  const [toggle, setToggle] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (cookies.token === undefined || cookies.token === null) {
      history("/login");
    }
  }, [cookies.token]);

  useEffect(() => {
    const getClientName = async () => {
      const q = query(collection(db, "clients"));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        if (doc.id === id) setClientName(doc.data().name);
      });
    };
    getClientName();
  }, [addHandler, id, deleteHandler]);

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
  }, [addHandler, id, deleteHandler]);

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
  }, [addHandler, id, deleteHandler]);

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

  const deleteHandlerToggle = () => {
    setDeleteHandler(!deleteHandler);
  };
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
        <div className="mobile menu">
          <MenuRoundedIcon onClick={handleMenuOpen} />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => {
                setToggle("20c");
                setHandler("add");
                addHandlerToggle();
                handleMenuClose();
              }}
            >
              Add 20C
            </MenuItem>
            <MenuItem
              onClick={() => {
                setToggle("22c");
                setHandler("add");
                addHandlerToggle();
                handleMenuClose();
              }}
            >
              Add 22C
            </MenuItem>
            <MenuItem
              onClick={() => {
                setToggle("gold");
                setHandler("add");
                addHandlerToggle();
                handleMenuClose();
              }}
            >
              Add Gold
            </MenuItem>
          </Menu>
        </div>
        <div className="web">
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ margin: "10px" }}
            onClick={() => {
              setToggle("20c");
              setHandler("add");
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
              setHandler("add");
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
              setHandler("add");
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
              m: 2,
            }}
          >
            <h2>20C Data</h2>
            {data20c.map((item) => (
              <ListItem
                key={item.id}
                item={item}
                setHandler={setHandler}
                setToggle={setToggle}
                toggle={"20c"}
                HandlePopUp={addHandlerToggle}
                setEditValues={setEditValues}
                handleDeletePopUp={deleteHandlerToggle}
              />
            ))}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
                fontWeight: "bold",
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
              m: 2,
            }}
          >
            <h2>22C Data</h2>
            {data22c.map((item) => (
              <ListItem
                key={item.id}
                item={item}
                setHandler={setHandler}
                setToggle={setToggle}
                toggle={"22c"}
                HandlePopUp={addHandlerToggle}
                setEditValues={setEditValues}
                handleDeletePopUp={deleteHandlerToggle}
              />
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
                fontWeight: "bold",
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
              m: 2,
            }}
          >
            <h2>Gold Given</h2>
            {datagold.map((item) => (
              <ListItem
                key={item.id}
                item={item}
                setHandler={setHandler}
                setToggle={setToggle}
                toggle={"gold"}
                HandlePopUp={addHandlerToggle}
                setEditValues={setEditValues}
                handleDeletePopUp={deleteHandlerToggle}
              />
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
                fontWeight: "bold",
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
        <Grid
          item
          xs={12}
          sm={12}
          style={{
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px",
          }}
        >
          Total:{" "}
          {data20c.reduce((total, item) => {
            return total + parseInt(item.weight) * 0.88;
          }, 0) +
            data22c.reduce((total, item) => {
              return total + parseInt(item.weight) * 0.96;
            }, 0) -
            datagold.reduce((total, item) => {
              return total + parseInt(item.weight) * 0.995;
            }, 0)}
        </Grid>
      </Grid>
      {addHandler && (
        <AddPopUp
          addHandlerToggle={addHandlerToggle}
          toggleValue={toggle}
          id={id}
          handler={handler}
          values={editValues}
          setEditValues={setEditValues}
        />
      )}
      {deleteHandler && (
        <Delete
          deleteHandlerToggle={deleteHandlerToggle}
          id={id}
          toggleValue={toggle}
          values={editValues}
          setEditValues={setEditValues}
        />
      )}
    </div>
  );
};

export default List;
