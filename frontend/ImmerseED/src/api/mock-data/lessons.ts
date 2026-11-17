// Sample lessons and progress until the back end has a /lessons endpoint.
import { Lesson, LessonStep } from '@/api/types';

// For now every lesson uses the Human cell and these 3 parts.
// `meshes` are how the piece names start inside public/models/human.glb.
const HUMAN_CELL_STEPS: LessonStep[] = [
  {
    part: 'Nucleus',
    title: 'The control center',
    body: 'The nucleus holds the cell’s DNA: the instructions for everything the cell does, from growing to repairing itself. Tiny holes called pores let messages in and out.',
    meshes: ['Nucleus_membrane', 'Nuclear_pores', 'Heterochromatin', 'Nucleolus'],
  },
  {
    part: 'Mitochondria',
    title: 'The power plants',
    body: 'Mitochondria turn the food you eat into energy the cell can use. Busy cells, like muscle cells, have lots of them.',
    meshes: ['Mitochondria_external_membranes', 'Mitochondria_inside'],
  },
  {
    part: 'Golgi apparatus',
    title: 'The shipping center',
    body: 'The Golgi apparatus packs proteins into tiny bubbles and sends them where they’re needed, inside or outside the cell.',
    meshes: ['Golgi'],
  },
];

const HUMAN_CELL_ID = 3;
const shared = { modelId: HUMAN_CELL_ID, partsTotal: HUMAN_CELL_STEPS.length, steps: HUMAN_CELL_STEPS };

export const LESSONS: Lesson[] = [
  { id: 1, title: 'What is a cell?', ...shared, partsDone: 3, status: 'done' },
  { id: 2, title: 'Inside a human cell', ...shared, partsDone: 1, status: 'current' },
  { id: 3, title: 'Plant vs. animal cells', ...shared, partsDone: 0, status: 'locked' },
  { id: 4, title: 'Animal cells up close', ...shared, partsDone: 0, status: 'locked' },
];
