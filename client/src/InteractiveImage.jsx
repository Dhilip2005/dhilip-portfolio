import { openImageLightbox } from "./ImageLightbox.jsx";

export function InteractiveImage({ src, alt, caption, className = "", onOpen, children }) {
  if (!src) {
    return (
      <div className={`interactive-image image-placeholder ${className}`}>
        <span>IMAGE PLACEHOLDER</span>
        {children}
      </div>
    );
  }

  const open = () => {
    if (onOpen) {
      onOpen({ src, alt, caption });
      return;
    }
    openImageLightbox([{ src, alt, caption }], src);
  };

  return (
    <button
      type="button"
      className={`interactive-image ${className}`}
      onClick={open}
      aria-label={caption ? `Open image: ${caption}` : `Open image: ${alt}`}
    >
      <img src={src} alt={alt} loading="lazy" />
      {children}
    </button>
  );
}
