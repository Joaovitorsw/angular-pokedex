import { IParticlesProps } from 'ng-particles';

export const GRASS: IParticlesProps = {
  particles: {
    number: {
      value: 20,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: '#309000',
    },
    shape: {
      type: 'polygon',
      stroke: {
        width: 1,
        color: '#309000',
      },
      polygon: {
        nb_sides: 6,
      },
      image: {
        src: 'img/github.svg',
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
      value: 8.017060304327615,
      random: false,
      anim: {
        enable: false,
        speed: 10,
        size_min: 40,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 100,
      color: '#309000',
      opacity: 1,
      width: 9.13944874693348,
    },
    move: {
      enable: true,
      speed: 0.8,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: true,
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
