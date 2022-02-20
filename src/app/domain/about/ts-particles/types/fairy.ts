import { IParticlesProps } from 'ng-particles';

export const FAIRY: IParticlesProps = {
  particles: {
    number: {
      value: 40,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: '#e03a83',
    },
    shape: {
      type: 'star',
      stroke: {
        width: 1,
        color: '#fa92b2',
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: 'img/github.svg',
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 1,
      random: false,
      anim: {
        enable: true,
        speed: 0.4795204795204795,
        opacity_min: 0,
        sync: false,
      },
    },
    size: {
      value: 8,
      random: true,
      anim: {
        enable: true,
        speed: 10,
        size_min: 4,
        sync: false,
      },
    },
    line_linked: {
      enable: false,
      distance: 100,
      color: '#ea7eae',
      opacity: 1,
      width: 0,
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: 'bottom-right',
      random: true,
      straight: true,
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
