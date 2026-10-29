export default function ModelView({ model }: { model: string }) {
  return <iframe title="Interactive 3D cell model" src={`/model-viewer.html?model=${encodeURIComponent(model)}`} style={{ border: 0, width: '100%', height: '100%', minHeight: 320 }} />;
}
