// Browser version: shows public/lesson-viewer.html (three.js) and tells it which parts to pull apart.
import { useEffect, useRef } from 'react';

type Props = { model: string; meshes: string[]; split: boolean };

export default function LessonStage({ model, meshes, split }: Props) {
  const frame = useRef<HTMLIFrameElement>(null);

  // Send the viewer the current step's parts. It keeps the cell loaded and just moves pieces.
  const send = () => frame.current?.contentWindow?.postMessage({ type: 'focus', meshes, split }, '*');
  useEffect(send, [meshes, split]);

  // The first step is in the address too, so it's right even before any message arrives.
  // (Only built once: changing src would reload the whole cell.)
  const src = useRef(
    `/lesson-viewer.html?model=${encodeURIComponent(model)}&focus=${encodeURIComponent(meshes.join(','))}`,
  ).current;

  return (
    <iframe
      ref={frame}
      title="3D cell for this lesson"
      src={src}
      onLoad={send}
      style={{ border: 0, width: '100%', height: '100%', background: 'transparent' }}
    />
  );
}
