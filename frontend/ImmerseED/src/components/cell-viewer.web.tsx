// Browser version of the 3D cell: shows public/cell-viewer.html (three.js).
// Tells it which part to circle, and hears back when the student taps the model.
import { useEffect, useMemo, useRef } from 'react';

type Props = {
  model: string;                           // 'human' | 'animal' | 'plant'
  meshes: string[];                        // the part to circle (empty = nothing)
  label?: string;                          // name shown next to the circle
  hint?: boolean;                          // show "Tap any part · drag to spin" (default yes)
  onTapMeshes?: (names: string[]) => void; // what was tapped, nearest first
};

export default function CellViewer({ model, meshes, label = '', hint = true, onTapMeshes }: Props) {
  const frame = useRef<HTMLIFrameElement>(null);

  // Tell the viewer what to highlight whenever it changes. The cell stays loaded.
  const send = () => frame.current?.contentWindow?.postMessage({ type: 'focus', meshes, label }, '*');
  useEffect(send, [meshes, label]);

  // Listen for taps coming back from the viewer.
  const onTap = useRef(onTapMeshes);
  useEffect(() => {
    onTap.current = onTapMeshes;
  }, [onTapMeshes]);
  useEffect(() => {
    const listener = (e: MessageEvent) => {
      if (e.source === frame.current?.contentWindow && e.data?.type === 'tap') onTap.current?.(e.data.meshes);
    };
    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, []);

  // Built once per model: changing the address would reload the whole cell.
  const src = useMemo(
    () =>
      `/cell-viewer.html?model=${encodeURIComponent(model)}&focus=${encodeURIComponent(meshes.join(','))}` +
      `&label=${encodeURIComponent(label)}&hint=${hint ? 1 : 0}`,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [model],
  );

  return (
    <iframe
      key={model}
      ref={frame}
      title="3D cell model"
      src={src}
      onLoad={send}
      style={{ border: 0, width: '100%', height: '100%', background: 'transparent' }}
    />
  );
}
