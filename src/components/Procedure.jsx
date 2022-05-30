/* eslint-disable react/prop-types */
import React from "react";

const style = {
  marginLeft: 15,
};

export default function Procedure({ procedure }) {
  return (
    <div style={style}>
      <h1>Tramite Numero {procedure.id} </h1>
      <h1> Usuario: {procedure.userId} </h1>
      <h1> Tramiter: {procedure.tramiterId} </h1>
      <h1> Tipo: {procedure.type} </h1>
      <h1> Comentario: {procedure.comments} </h1>
      <h1> Precio: {procedure.price} </h1>
      <h1> Rating: {procedure.rating} </h1>
    </div>
  );
}
