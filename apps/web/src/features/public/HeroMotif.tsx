import './hero-motif.css';

// ACR-002 selected CSS/static first. This module intentionally introduces no
// WebGL canvas, GLB/GLTF asset, texture or draw call.
export default function HeroMotif() {
  return (
    <div className="sf-hero__motif" aria-hidden="true">
      <div className="sf-hero__motif-scene">
        <span className="sf-hero__motif-ground" />
        <span className="sf-hero__motif-leaf sf-hero__motif-leaf--back" />
        <span className="sf-hero__motif-leaf sf-hero__motif-leaf--front" />
        <span className="sf-hero__motif-drop" />
      </div>
    </div>
  );
}
