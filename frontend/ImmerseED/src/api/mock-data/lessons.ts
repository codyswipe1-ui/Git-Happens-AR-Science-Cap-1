// Sample lessons and progress until the back end has a /lessons endpoint.
import { Lesson } from '@/api/types';

export const LESSONS: Lesson[] = [
  { id: 1, title: 'What is a cell?', modelId: 1, partsDone: 6, partsTotal: 6, status: 'done' },
  { id: 2, title: 'Inside the animal cell', modelId: 1, partsDone: 2, partsTotal: 8, status: 'current' },
  { id: 3, title: 'Plant vs. animal cells', modelId: 2, partsDone: 0, partsTotal: 12, status: 'locked' },
  { id: 4, title: 'The cells in you', modelId: 3, partsDone: 0, partsTotal: 6, status: 'locked' },
];
