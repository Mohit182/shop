import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const List = () => {
  const history = useNavigate();
  // fetch id from route params
  const { id } = useParams();

  return <div>
    <h1>Client ID: {id}</h1>
    
  </div>;
};

export default List;
