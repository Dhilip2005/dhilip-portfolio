import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Minus, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function ImageLightbox() {
  const [gallery, setGallery] = useState([]);
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const open = gallery.length > 0;

  useEffect(() => {
    const handleOpen = (event) => {
      const items = event.detail?.items?.length ? event.detail.items : [event.detail?.item].filter(Boolean);
      if (!items.length) return;
      setGallery(items);
      setIndex(Math.max(0, items.findIndex((item) => item.src === event.detail?.current) || 0));
      setZoom(1);
    };
    window.addEventListener("open-image-lightbox", handleOpen);
    return () => window.removeEventListener("open-image-lightbox", handleOpen);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (event) => {
      if (event.key === "Escape") setGallery([]);
      if (event.key === "ArrowRight") setIndex((value) => (value + 1) % gallery.length);
      if (event.key === "ArrowLeft") setIndex((value) => (value - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, gallery.length]);

  const move = (direction) => setIndex((value) => (value + direction + gallery.length) % gallery.length);
  const item = gallery[index];

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div className="image-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Image preview">
          <button className="lightbox-close" type="button" onClick={() => setGallery([])} aria-label="Close image preview"><X size={20} /></button>
          <div className="lightbox-tools" aria-label="Image zoom controls">
            <button type="button" onClick={() => setZoom((value) => Math.max(1, value - .25))} aria-label="Zoom out"><Minus size={16} /></button>
            <span>{Math.round(zoom * 100)}%</span>
            <button type="button" onClick={() => setZoom((value) => Math.min(3, value + .25))} aria-label="Zoom in"><Plus size={16} /></button>
          </div>
          {gallery.length > 1 && <button className="lightbox-prev" type="button" onClick={() => move(-1)} aria-label="Previous image"><ChevronLeft size={26} /></button>}
          <motion.figure key={item.src} className="lightbox-figure" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.04 }}>
            <img src={item.src} alt={item.alt || item.title || "Portfolio image"} style={{ transform: `scale(${zoom})` }} />
            {(item.caption || item.title) && <figcaption><span>{item.title}</span>{item.caption}</figcaption>}
          </motion.figure>
          {gallery.length > 1 && <button className="lightbox-next" type="button" onClick={() => move(1)} aria-label="Next image"><ChevronRight size={26} /></button>}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function openImageLightbox(items, current) {
  window.dispatchEvent(new CustomEvent("open-image-lightbox", { detail: { items, current } }));
}
