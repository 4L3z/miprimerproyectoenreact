import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import confetti from 'canvas-confetti';

const WelcomeAlert = () => {
  const MySwal = withReactContent(Swal);

  const launchConfetti = () => {
    const end = Date.now() + 3 * 1000;
    const colors = ['#bb0000', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };
  useEffect(() => {
    MySwal.fire({
      title: '¡Bienvenido!',
      text: 'Bienvenido a mi Reproductor De Musica 2.0, Realizado con React y una libreria de componentes llamado Next UI. Creado Por Alejandro Palacios, Espero q te guste!',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      localStorage.setItem('hasVisited', 'true');
      launchConfetti();
    });
  }, [MySwal]);

  return null; // Este componente no renderiza nada
};

export default WelcomeAlert;
