import { IParticlesProps } from 'ng-particles';

export let particles: IParticlesProps;

const defaultOptions: any = {
  particles: {
    number: { value: 160, density: { enable: true, value_area: 800 } },
    color: { value: '#FFFFFF' },
    shape: {
      type: 'circle',
      stroke: { width: 0, color: '#000000' },
      polygon: { nb_sides: 5 },
      image: { src: 'img/github.svg', width: 100, height: 100 },
    },
    opacity: {
      value: 1,
      random: true,
      anim: { enable: true, speed: 1, opacity_min: 0, sync: false },
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: false, speed: 4, size_min: 0.3, sync: false },
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
      speed: 1,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 600 },
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'bubble' },
      onclick: { enable: true, mode: 'repulse' },
      resize: true,
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 250, size: 0, duration: 2, opacity: 0 },
      repulse: { distance: 415.58441558441564, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 },
    },
  },
  retina_detect: true,
};

particles = defaultOptions;

export const particlesAnimations: any = {
  homePage(url: string) {
    particles = {
      particles: {
        number: {
          value: 15,
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
            width: 1.5,
            color: '#000000',
          },
          polygon: {
            nb_sides: 3,
          },
          image: {
            src: url,
            width: 45,
            height: 45,
          },
        },
        opacity: {
          value: 1,
          random: false,
          anim: {
            enable: true,
            speed: 4.5,
            opacity_min: 0.3,
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
  },

  bug() {
    const options = { ...defaultOptions };
    options.particles.color.value = '#a8b820';
    particles = options as any;
  },

  fire() {
    particles = {
      particles: {
        number: { value: 400, density: { enable: true, value_area: 3000 } },
        color: { value: '#fc0000' },
        shape: {
          type: 'circle',
          stroke: { width: 0, color: '#000000' },
          polygon: { nb_sides: 3 },
          image: { src: 'img/github.svg', width: 100, height: 100 },
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: true, speed: 5, size_min: 0, sync: false },
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
          speed: 7.8914764163227265,
          direction: 'top',
          random: true,
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
  },

  water() {
    particles = {
      particles: {
        number: {
          value: 160,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: '#ffffff',
        },
        shape: {
          type: 'circle',
        },
        opacity: {
          value: 0.7,
          random: true,
          anim: {
            enable: false,
          },
        },
        size: {
          value: 30,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: false,
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'top',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
          },
        },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: false,
          },
          onclick: {
            enable: false,
          },
          resize: true,
        },
      },
      retina_detect: true,
    };
  },

  ice() {
    particles = {
      particles: {
        number: { value: 400, density: { enable: true, value_area: 800 } },
        color: { value: '#fff' },
        shape: {
          type: 'image',
          stroke: { width: 0, color: '#000000' },
          polygon: { nb_sides: 5 },
          image: {
            src: 'https://cdn.discordapp.com/emojis/780357370999341078.png?size=96',
            width: 100,
            height: 100,
          },
        },
        opacity: {
          value: 1,
          random: false,
          anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
        },
        size: {
          value: 10,
          random: true,
          anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
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
          speed: 2,
          direction: 'bottom',
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
  },

  electric() {
    particles = {
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
          onhover: { enable: true, mode: 'bubble' },
          onclick: { enable: true, mode: 'push' },
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
  },

  ghost() {
    particles = {
      particles: {
        number: { value: 60, density: { enable: false, value_area: 0 } },
        color: { value: '#fff' },
        shape: {
          type: 'image',
          stroke: { width: 0, color: '#000000' },
          polygon: { nb_sides: 3 },
          image: {
            src: 'http://www.blog.jonnycornwell.com/wp-content/uploads/2012/07/Smoke10.png',
            width: 100,
            height: 100,
          },
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
        },
        size: {
          value: 500,
          random: true,
          anim: {
            enable: true,
            speed: 14.617389821424226,
            size_min: 0.1,
            sync: false,
          },
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
          speed: 6,
          direction: 'top-right',
          random: true,
          straight: true,
          out_mode: 'out',
          bounce: false,
          attract: { enable: false, rotateX: 600, rotateY: 1200 },
        },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'bubble' },
          onclick: { enable: true, mode: 'repulse' },
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
  },

  grass() {
    const options = { ...defaultOptions };
    options.particles.color.value = '#309000';
    particles = options as any;
  },

  normal() {
    const options = { ...defaultOptions };
    options.particles.color.value = '#979702';
    particles = options as any;
  },

  poison() {
    const options = { ...defaultOptions };
    options.particles.color.value = '#c183c1';
    particles = options as any;
  },

  ground() {
    const options = { ...defaultOptions };
    options.particles.color.value = '#979702';
    particles = options as any;
  },

  flying() {
    particles = {
      particles: {
        number: { value: 30, density: { enable: true, value_area: 800 } },
        color: { value: '#3a9dc2' },
        shape: {
          type: 'image',
          stroke: { width: 0, color: '#000000' },
          polygon: { nb_sides: 5 },
          image: {
            src: 'https://bytii.net/user/themes/antibackup/assets/images/cloud.png',
            width: 100,
            height: 50,
          },
        },
        opacity: {
          value: 1.0,
          random: true,
          anim: { enable: true, speed: 0.5, opacity_min: 0, sync: false },
        },
        size: {
          value: 35,
          random: true,
          anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
        },
        line_linked: {
          enable: false,
          distance: 1500,
          color: '#0096ff',
          opacity: 0.4,
          width: 1.5,
        },
        move: {
          enable: true,
          speed: 1.0,
          direction: 'right',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: { enable: false, rotateX: 600, rotateY: 1200 },
        },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: false, mode: 'grab' },
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
  },

  fairy() {
    const options = { ...defaultOptions };
    options.particles.color.value = '#e03a83';
    particles = options as any;
  },
};
