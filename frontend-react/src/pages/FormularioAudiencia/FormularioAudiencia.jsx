import React from 'react';
import { Link } from 'react-router-dom';

const FormularioAudiencia = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>📝 Nueva Audiencia</h2>
      <p>Aquí irá el formulario para crear audiencias.</p>
      <Link to="/audiencias">Volver</Link>
    </div>
  );
};

export default FormularioAudiencia;