import React from "react";

export default function Profile() {
  return (
    <div style={{ textAlign: "center" }}>
      <br />
      <h1 className="title is-2"> Perfil de nombre </h1>
      <p>
        <img
          alt=""
          src="default_avatar.png"
          style={{ width: "200px", height: "200px", borderRadius: "50%", objectFit: "fill" }}
        />
      </p>

      <p className="is-size-5">
        <strong>Calificación: </strong>
      </p>

      <br />
      <br />

      <div className="columns">
        <div className="column">
          <p className="is-size-4">
            <strong>Este mes</strong>
          </p>

          <p className="is-size-5">Trámites realizados: 12</p>

          <p className="is-size-5">Ganancias: 48.000 CLP</p>

          <p className="is-size-5">Tiempo promedio: 40 minutos/trámite</p>
        </div>

        <div className="column">
          <p className="is-size-4">
            <strong>Histórico</strong>
          </p>

          <p className="is-size-5">Trámites realizados: 24</p>

          <p className="is-size-5">Ganancias: 96.000 CLP</p>

          <p className="is-size-5">Tiempo promedio: 45 minutos/trámite</p>
        </div>
      </div>
    </div>
  );
}
