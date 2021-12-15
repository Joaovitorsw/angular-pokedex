import { IParticlesProps } from 'ng-particles';

export const particles: IParticlesProps = {
  particles: {
    number: {
      value: 25,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: '#e3fdf5',
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 1.5,
        color: '#000000',
      },
      polygon: {
        nb_sides: 3,
      },
      image: {
        src: '',
        width: 45,
        height: 45,
      },
    },
    opacity: {
      value: 1,
      random: false,
      anim: {
        enable: false,
        speed: 0,
        opacity_min: 0,
        sync: false,
      },
    },
    size: {
      value: 15,
      random: false,
      anim: {
        enable: false,
        speed: 0,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: '#ffffff',
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 4.5,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'bounce',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: false,
        mode: 'repulse',
      },
      onclick: {
        enable: true,
        mode: 'repulse',
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
      },
      repulse: {
        distance: 50,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
};
