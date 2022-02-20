import { IParticlesProps } from 'ng-particles';

export const DRAGON: IParticlesProps = {
  particles: {
    number: {
      value: 10,
      density: {
        enable: true,
        value_area: 600,
      },
    },
    color: {
      value: '#1a0252ad',
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
        src: 'https://www.clipartmax.com/png/full/26-261436_clipart-dragon-silhouette-png.png',
        width: 120,
        height: 120,
      },
    },
    opacity: {
      value: 1,
      random: true,
      anim: {
        enable: false,
        speed: 4.5,
        opacity_min: 0.5,
        sync: false,
      },
    },
    size: {
      value: 45,
      random: false,
      anim: {
        enable: true,
        speed: 20,
        size_min: 0,
        sync: false,
      },
    },
    line_linked: {
      enable: false,
      distance: 20,
      color: '#ffffff',
      opacity: 1,
      width: 1,
    },
    move: {
      enable: true,
      speed: 3.5,
      direction: 'top-left',
      random: false,
      straight: true,
      out_mode: 'out',
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
