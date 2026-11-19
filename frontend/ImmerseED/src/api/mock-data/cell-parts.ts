// Sample parts for each model until the back end has them.
// Only the Human cell is split into well-named pieces so far.
import { CellPart } from '@/api/types';

export const CELL_PARTS: Record<string, CellPart[]> = {
  human: [
    {
      name: 'Nucleus',
      summary: 'Holds the cell’s DNA, the instructions for everything the cell does.',
      meshes: ['Nucleus_membrane', 'Nuclear_pores', 'Heterochromatin', 'Nucleolus'],
    },
    {
      name: 'Mitochondria',
      summary: 'Turn food into energy the cell can use.',
      meshes: ['Mitochondria_external_membranes', 'Mitochondria_inside'],
    },
    { name: 'Golgi apparatus', summary: 'Packs proteins and ships them where they’re needed.', meshes: ['Golgi'] },
    { name: 'Rough ER', summary: 'Folded tubes covered in ribosomes that make and move proteins.', meshes: ['Rer'] },
    { name: 'Ribosomes', summary: 'Tiny builders that make proteins.', meshes: ['Ribosomes'] },
    { name: 'Lysosomes', summary: 'Break down waste and worn-out parts.', meshes: ['Lysosome'] },
    { name: 'Centrioles', summary: 'Help the cell split in two when it divides.', meshes: ['Centrioles'] },
    { name: 'Cell membrane', summary: 'A thin outer layer that controls what goes in and out.', meshes: ['Cell_membrane2'] },
  ],
};
