import { IParticlesProps } from 'ng-particles';

export const ELECTRIC: IParticlesProps = {
  particles: {
    number: {
      value: 298,
      density: { enable: true, value_area: 7181.257706535142 },
    },
    color: { value: '#ffffff' },
    shape: {
      type: 'image',
      stroke: { width: 0, color: '#000000' },
      polygon: { nb_sides: 5 },
      image: {
        src: 'https://cdn-icons-png.flaticon.com/512/728/728139.png',
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
    },
    size: {
      value: 24.0511086057873,
      random: true,
      anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
    },
    line_linked: {
      enable: true,
      distance: 120,
      color: '#ffffff',
      opacity: 1,
      width: 2,
    },
    move: {
      enable: true,
      speed: 6,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: false, mode: 'bubble' },
      onclick: { enable: false, mode: 'push' },
      resize: true,
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: {
        distance: 119.88011988011988,
        size: 23.976023976023978,
        duration: 2,
        opacity: 1,
      },
      repulse: { distance: 87.91208791208791, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 },
    },
  },
  retina_detect: true,
};
