"use client";

import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { useEffect } from "react";
import { useMediaQuery } from "@/lib/use-media-query";
import Image from "next/image";

export default function Gallery(props) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const lightboxConfig = {
      bgOpacity: 1,
      allowPanToNext: false,
      zoom: false,
      secondaryZoomLevel: props.disableZoom ? "fit" : 1,
      padding: { top: 48, bottom: 48, left: 48, right: 48 },
      counter: false,
      loop: false,
      gallery: "#" + props.galleryID,
      children: "a",
      pswpModule: () => import("photoswipe"),
    };

    let lightbox = new PhotoSwipeLightbox(lightboxConfig);

    lightbox.init();

    return () => {
      lightbox.destroy();
    };
  }, [props.disableZoom, props.galleryID]);

  const specialStyles = (aspectRatio) => {
    if (props.equalHeight && !isMobile) {
      return { flex: aspectRatio };
    }
    if (props.singleColumn && aspectRatio < 1) {
      return { maxHeight: "750px" };
    }
  };

  return (
    <div
      className={`pswp-gallery ${
        props.singleColumn ? "gallery-single-column" : ""
      } ${props.className}`}
      id={props.galleryID}
    >
      {props.images.map((imgProps, index) => {
        const { src, width, height, alt, priority, sizes } = imgProps;
        const aspectRatio = width / height;
        return (
          <a
            href={src}
            data-pswp-width={width}
            data-pswp-height={height}
            target="_blank"
            rel="noreferrer"
            className="items-left flex flex-col gap-2 no-underline hover:text-black"
            key={props.galleryID + "-" + index}
            style={specialStyles(aspectRatio)}
          >
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              priority={priority}
              className={props.equalHeight ? "noMobileSpecialStyle" : ""}
              sizes={sizes}
            />
          </a>
        );
      })}
      <style jsx>{`
        @media (max-width: 768px) {
          .noMobileSpecialStyle {
            object-fit: initial !important;
            width: initial !important;
            max-height: initial !important;
          }
        }
      `}</style>
    </div>
  );
}
