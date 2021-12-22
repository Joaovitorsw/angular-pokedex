import { IParticlesProps } from 'ng-particles';

export const home: IParticlesProps = {
  particles: {
    number: {
      value: 4,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: '#e3fdf5',
    },
    shape: {
      type: 'image',
      stroke: {
        width: 0,
        color: '#000000',
      },
      polygon: {
        nb_sides: 3,
      },
      image: {
        src: 'https://raw.githubusercontent.com/Joaovitorsw/joaovitorsw-pokedex/fe402a5c23c3c534cdfff06ff00677745836ca3e/src/assets/images/search-bar-icon.svg',
        width: 45,
        height: 45,
      },
    },
    opacity: {
      value: 1,
      random: false,
      anim: {
        enable: false,
        speed: 4.5,
        opacity_min: 0.5,
        sync: false,
      },
    },
    size: {
      value: 15,
      random: false,
      anim: {
        enable: false,
        speed: 0,
        size_min: 0,
        sync: false,
      },
    },
    line_linked: {
      enable: false,
      distance: 0,
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
        enable: false,
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
