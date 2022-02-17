import { IParticlesProps } from 'ng-particles';

export const ROCK: IParticlesProps = {
  particles: {
    number: {
      value: 15,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: '#b8a038',
    },
    shape: {
      type: 'image',
      stroke: {
        width: 1,
        color: '#e0c068',
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: 'https://img.icons8.com/external-icongeek26-flat-icongeek26/344/external-stone-geography-icongeek26-flat-icongeek26.png',
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 0.5287289198936227,
      random: false,
      anim: {
        enable: false,
        speed: 0,
        opacity_min: 0.34919320128957837,
        sync: true,
      },
    },
    size: {
      value: 25,
      random: true,
      anim: {
        enable: false,
        speed: 10,
        size_min: 40,
        sync: false,
      },
    },
    line_linked: {
      enable: false,
      distance: 96.20472365193136,
      color: '#ea7eae',
      opacity: 1,
      width: 0,
    },
    move: {
      enable: true,
      speed: 5,
      direction: 'topLeft',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 10000,
        rotateY: 10000,
      },
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: false,
        mode: 'grab',
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
