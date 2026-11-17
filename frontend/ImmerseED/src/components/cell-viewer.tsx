// Phone version of the 3D cell: the existing ViroReact viewer.
// (Circling a part and tapping parts only work in the browser version for now.)
import ModelView from '@/components/model-view';

type Props = {
  model: string;
  meshes: string[];
  label?: string;
  hint?: boolean;
  onTapMeshes?: (names: string[]) => void;
};

export default function CellViewer({ model }: Props) {
  return <ModelView model={model} />;
}
