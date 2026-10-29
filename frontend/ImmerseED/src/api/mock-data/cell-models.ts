// Sample data until the back end has a /models endpoint.
// Delete this file once getCellModels() in src/api.ts calls the real API.
import { CellModel } from '@/api/types';

export const CELL_MODELS: CellModel[] = [
  {
    id: 1,
    name: 'Animal Cell',
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
    modelType: 'plant',
    level: 'Intermediate',
    description: 'Has a cell wall, chloroplasts and a big central vacuole.',
    partsCount: 12,
  },
  {
    id: 3,
    name: 'Bacteria Cell',
    modelType: 'bacteria',
    level: 'Advanced',
    description: 'A tiny one-celled organism with no nucleus.',
    partsCount: 6,
  },
  {
    id: 4,
    name: 'Neuron Cell',
    modelType: 'specialized',
    level: 'Advanced',
    description: 'A nerve cell with long branches that send signals.',
    partsCount: 7,
  },
  {
    id: 5,
    name: 'Blood Cell',
    modelType: 'specialized',
    level: 'Beginner',
    description: 'A red blood cell, shaped like a disc to carry oxygen.',
    partsCount: 3,
    locked: true,
  },
];
