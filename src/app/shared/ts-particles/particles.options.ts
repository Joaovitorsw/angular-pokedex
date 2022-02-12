import { IParticlesProps } from 'ng-particles';
import { BUG } from './types/bug';
import { DARK } from './types/dark';
import { DRAGON } from './types/dragon';
import { ELECTRIC } from './types/electric';
import { FAIRY } from './types/fairy';
import { FIGHTING } from './types/fighting';
import { FIRE } from './types/fire';
import { FLYING } from './types/flying';
import { GHOST } from './types/ghost';
import { GRASS } from './types/grass';
import { GROUND } from './types/ground';
import { ICE } from './types/ice';
import { NORMAL } from './types/normal';
import { POISON } from './types/poison';
import { PSYCHIC } from './types/psychic';
import { ROCK } from './types/rock';
import { STEEL } from './types/steel';
import { DEFAULT } from './types/template';
import { WATER } from './types/water';

export let particles: IParticlesProps;

particles = DEFAULT;

export const particlesAnimations: any = {
  bug() {
    particles = BUG;
  },

  fire() {
    particles = FIRE;
  },

  water() {
    particles = WATER;
  },

  ice() {
    particles = ICE;
  },

  electric() {
    particles = ELECTRIC;
  },

  ghost() {
    particles = GHOST;
  },

  grass() {
    particles = GRASS;
  },

  normal() {
    particles = NORMAL;
  },

  poison() {
    particles = POISON;
  },

  ground() {
    particles = GROUND;
  },

  flying() {
    particles = FLYING;
  },

  fairy() {
    particles = FAIRY;
  },
  psychic() {
    particles = PSYCHIC;
  },

  fighting() {
    particles = FIGHTING;
  },
  rock() {
    particles = ROCK;
  },

  dark() {
    particles = DARK;
  },
  steel() {
    particles = STEEL;
  },
  dragon() {
    particles = DRAGON;
  },
};
