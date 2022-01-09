import { IParticlesProps } from 'ng-particles';

export const FIGHTING: IParticlesProps = {
  particles: {
    number: {
      value: 9,
      density: {
        enable: true,
        value_area: 400,
      },
    },
    color: {
      value: '#f335008c',
    },
    shape: {
      type: 'image',
      stroke: {
        width: 0,
        color: '#000000',
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: 'https://www.pngkit.com/png/full/20-205558_one-punch-man-fist-one-punch-man-fist.png',
        width: 60,
        height: 60,
      },
    },
    opacity: {
      value: 1,
      random: true,
      anim: {
        enable: false,
        speed: 0.5,
        opacity_min: 0.5,
        sync: false,
      },
    },
    size: {
      value: 30,
      random: true,
      anim: {
        enable: true,
        speed: 20,
        size_min: 30,
        sync: false,
      },
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: '#ffffff',
      opacity: 0.1183721462448409,
      width: 0,
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'destroy',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 0,
        rotateY: 0,
      },
    },
  },
  interactivity: {
    detect_on: 'window',
    events: {
      onhover: {
        enable: false,
        mode: 'repulse',
      },
      onclick: {
        enable: false,
        mode: 'push',
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
        distance: 200,
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
