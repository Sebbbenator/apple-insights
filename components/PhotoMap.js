"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { textRise } from "@/lib/motion";
import styles from "./PhotoMap.module.css";

const mapStyle = "https://tiles.openfreemap.org/styles/dark";
const denmark = [
  [8, 54.5],
  [15.2, 57.8],
];

const textHidden = { opacity: 0, y: -40 };
const textShown = { opacity: 1, y: 0 };

export default function PhotoMap({ places, topPlace }) {
  const container = useRef(null);

  useEffect(() => {
    let map = null;
    let cancelled = false;

    async function createMap() {
      const maplibregl = await import("maplibre-gl");

      if (cancelled) {
        return;
      }

      maplibregl.setWorkerUrl(
        new URL("maplibre-gl/dist/maplibre-gl-worker.mjs", import.meta.url).href,
      );

      map = new maplibregl.Map({
        container: container.current,
        style: mapStyle,
        bounds: denmark,
        fitBoundsOptions: { padding: 16 },
        attributionControl: { compact: true },
        dragPan: false,
        dragRotate: false,
        scrollZoom: false,
        boxZoom: false,
        keyboard: false,
        touchPitch: false,
      });

      map.touchZoomRotate.disableRotation();
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-right");
    }

    createMap();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, []);

  return (
    <main className={styles.screen}>
      <div className={styles.content}>
        <h1 className={`${styles.heading} semibold`}>Her blev de fleste af dine minder skabt:</h1>

        <div ref={container} className={styles.map} />

        <motion.p
          className={`${styles.text} regular`}
          initial={textHidden}
          animate={textShown}
          transition={textRise}
        >
          Du tog {topPlace.photos.toLocaleString("da-DK")} billeder i {topPlace.place}
        </motion.p>
      </div>
    </main>
  );
}
