// Sample data until the back end has a /models endpoint.
// Delete this file once getCellModels() in src/api.ts calls the real API.
import { CellModel } from '@/api/types';

export const CELL_MODELS: CellModel[] = [
  {
    id: 1,
    name: 'Animal Cell',
    modelUrl: 'animal',
    modelType: 'animal',
    level: 'Beginner',
    description: 'The building block of animals, including you.',
    partsCount: 8,
    sceneId: '877e0989-706e-49be-99c7-e17073f20c18',
    quizId: 'animal-cell',
  },
  {
    id: 2,
    name: 'Plant Cell',
    modelUrl: 'plant',
    modelType: 'plant',
    level: 'Intermediate',
    description: 'Has a cell wall, chloroplasts and a big central vacuole.',
    partsCount: 12,
  },
  {
    id: 3,
    name: 'Human Eukaryotic Cell',
    modelType: 'animal',
    level: 'Intermediate',
    description: 'Explore a human cell and its main components.',
    partsCount: 0,
    modelUrl: 'human',
  },
];
