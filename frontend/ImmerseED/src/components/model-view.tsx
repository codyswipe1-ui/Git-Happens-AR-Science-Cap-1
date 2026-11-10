import { createContext, useContext, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { ViroSceneNavigator, ViroScene, Viro3DObject, ViroAmbientLight, ViroDirectionalLight, ViroNode, ViroOrbitCamera } from '@reactvision/react-viro';
import bounds from '@/api/model-bounds.json';

const sources = { animal: require('../../public/models/animal.glb'), plant: require('../../public/models/plant.glb'), human: require('../../public/models/human.glb') };
type ModelKey = keyof typeof sources;
const ViewerContext = createContext({ model: 'animal' as ModelKey, angle: 0, distance: 4, loaded: () => {}, failed: () => {} });
function CellScene() {
  const { model, angle, distance, loaded, failed } = useContext(ViewerContext);
  const fit = bounds[model];
  return <ViroScene>
    <ViroOrbitCamera active position={[0, 0, distance]} focalPoint={[0, 0, 0]} />
    <ViroAmbientLight color="#ffffff" intensity={600} />
    <ViroDirectionalLight color="#ffffff" direction={[0, -1, -1]} intensity={800} />
    <ViroNode rotation={[0, angle, 0]}>
      <Viro3DObject source={sources[model]} type="GLB" scale={[fit.scale, fit.scale, fit.scale]} position={fit.position as [number, number, number]} onLoadEnd={loaded} onError={failed} />
    </ViroNode>
  </ViroScene>;
}
export default function ModelView({ model }: { model: string }) {
  const [angle, setAngle] = useState(0);
  const [distance, setDistance] = useState(4);
  const [status, setStatus] = useState('Loading 3D model…');
  if (!(model in sources)) return <Text>Model unavailable.</Text>;
  return <ViewerContext.Provider value={{ model: model as ModelKey, angle, distance, loaded: () => setStatus(''), failed: () => setStatus('Could not load this model. Switch tabs to retry.') }}>
    <View style={{ flex: 1 }}>
      <ViroSceneNavigator style={{ flex: 1 }} initialScene={{ scene: CellScene }} />
      {!!status && <Text style={{ color: 'white', padding: 12 }}>{status}</Text>}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12, padding: 12 }}>
        <Button title="Rotate left" onPress={() => setAngle(angle - 30)} />
        <Button title="Rotate right" onPress={() => setAngle(angle + 30)} />
        <Button title="Zoom in" onPress={() => setDistance(Math.max(2, distance - 0.5))} />
        <Button title="Zoom out" onPress={() => setDistance(Math.min(8, distance + 0.5))} />
        <Button title="Reset" onPress={() => { setAngle(0); setDistance(4); }} />
      </View>
    </View>
  </ViewerContext.Provider>;
}
