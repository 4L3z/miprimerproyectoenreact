import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const WelcomeAlert = () => {
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    MySwal.fire({
      title: '¡Bienvenido!',
      text: 'Bienvenido a mi Reproductor De Musica 2.0, Realizado con React, Creado Por Alejandro Palacios, Espero q te guste!',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }, [MySwal]);

  return null; // Este componente no renderiza nada
};

export default WelcomeAlert;
