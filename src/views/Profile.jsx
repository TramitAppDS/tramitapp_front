import React from "react";

export default function Profile() {
  return (
    <div style={{ textAlign: "center" }}>
      <br></br>
      <h1 class="title is-2"> Perfil de nombre </h1>
      <p>
        <img
          src="default_avatar.png"
          style={{ width: "200px", height: "200px", borderRadius: "50%", objectFit: "fill" }}
        />
      </p>

      <p class="is-size-5">
        <strong>Calificación: </strong>
      </p>

      <br></br>
      <br></br>

      <div className="columns">
        <div className="column">
          <p class="is-size-4">
            <strong>Este mes</strong>
          </p>

          <p class="is-size-5">Trámites realizados: 12</p>

          <p class="is-size-5">Ganancias: 48.000 CLP</p>

          <p class="is-size-5">Tiempo promedio: 40 minutos/trámite</p>
        </div>

        <div className="column">
          <p class="is-size-4">
            <strong>Histórico</strong>
          </p>

          <p class="is-size-5">Trámites realizados: 24</p>

          <p class="is-size-5">Ganancias: 96.000 CLP</p>

          <p class="is-size-5">Tiempo promedio: 45 minutos/trámite</p>
        </div>
      </div>
    </div>
  );
}
