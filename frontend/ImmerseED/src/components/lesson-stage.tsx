// Phone version: a drawn cell for now. (Pulling parts apart runs in the browser version.)
import { View } from 'react-native';

import CellArt from '@/components/cell-art';

type Props = { model: string; meshes: string[]; split: boolean };

export default function LessonStage({ model }: Props) {
  const kind = model === 'plant' || model === 'animal' ? model : 'human';
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <CellArt kind={kind} size={180} />
    </View>
  );
}
