import { IParticlesProps } from 'ng-particles';

export const STEEL: IParticlesProps = {
  particles: {
    number: { value: 25, density: { enable: true, value_area: 800 } },
    color: { value: '#fff' },
    shape: {
      type: 'image',
      stroke: { width: 0, color: '#000000' },
      polygon: { nb_sides: 5 },
      images: [
        {
          src: 'https://img.icons8.com/fluency/452/screw.png',
          width: 100,
          height: 100,
        },
        {
          src: 'https://img.icons8.com/emoji/452/nut-and-bolt.png',
          width: 100,
          height: 100,
        },
        {
          src: 'https://img.icons8.com/officexs/452/Production-order.png',
          width: 100,
          height: 100,
        },
      ],
    },
    opacity: {
      value: 1,
      random: false,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
    },
    size: {
      value: 10,
      random: false,
      anim: { enable: false, speed: 40, size_min: 25, sync: false },
    },
    line_linked: {
      enable: false,
      distance: 500,
      color: '#ffffff',
      opacity: 0.4,
      width: 2,
    },
    move: {
      enable: true,
      speed: 3,
      direction: 15,
      random: false,
      straight: true,
      out_mode: 'out',
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: false, mode: 'bubble' },
      onclick: { enable: false, mode: 'repulse' },
      resize: true,
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 0.5 } },
      bubble: {
        distance: 400,
        size: 4,
        duration: 0.3,
        opacity: 1,
      },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 },
    },
  },
  retina_detect: true,
};
