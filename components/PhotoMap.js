"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { duration, textRise } from "@/lib/motion";
import styles from "./PhotoMap.module.css";

const mapStyle = "https://tiles.openfreemap.org/styles/dark";
const denmark = [
  [8, 54.5],
  [15.2, 57.8],
];

function toGeoJson(places) {
  return {
    type: "FeatureCollection",
    features: places.map((place) => ({
      type: "Feature",
      properties: { photos: place.photos },
      geometry: { type: "Point", coordinates: [place.longitude, place.latitude] },
    })),
  };
}

function token(element, name) {
  return getComputedStyle(element).getPropertyValue(name).trim();
}

const locale = {
  "Map.Title": "Kort over Danmark med dine fotos",
  "NavigationControl.ZoomIn": "Zoom ind",
  "NavigationControl.ZoomOut": "Zoom ud",
  "AttributionControl.ToggleAttribution": "Vis kilder",
};

function showDanishNames(map) {
  for (const layer of map.getStyle().layers) {
    const field = layer.layout?.["text-field"];

    if (field && JSON.stringify(field).includes("name_en")) {
      map.setLayoutProperty(layer.id, "text-field", ["coalesce", ["get", "name:da"], ["get", "name"]]);
    }
  }
}

function closeAttribution(element) {
  const attribution = element.querySelector(".maplibregl-ctrl-attrib");
  attribution?.removeAttribute("open");
  attribution?.classList.remove("maplibregl-compact-show");
}

const textHidden = { opacity: 0, y: -40 };
const textShown = { opacity: 1, y: 0 };

export default function PhotoMap({ places, topPlace }) {
  const container = useRef(null);
  const reduceMotion = useReducedMotion();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let map = null;
    let cancelled = false;
    let loaded = false;

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
        locale: locale,
        dragPan: false,
        dragRotate: false,
        scrollZoom: false,
        boxZoom: false,
        keyboard: false,
        touchPitch: false,
      });

      map.touchZoomRotate.disableRotation();
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-right");

      map.on("error", () => {
        if (!loaded) {
          setFailed(true);
        }
      });

      map.on("load", () => {
        loaded = true;
        showDanishNames(map);
        closeAttribution(container.current);

        const most = Math.max(...places.map((place) => place.photos));
        const fade = reduceMotion ? 0 : duration.hero * 1000;

        map.addSource("places", { type: "geojson", data: toGeoJson(places) });

        map.addLayer({
          id: "heat",
          type: "heatmap",
          source: "places",
          paint: {
            "heatmap-weight": ["interpolate", ["linear"], ["get", "photos"], 0, 0, most, 1],
            "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 5, 50, 10, 140],
            "heatmap-intensity": 1.2,
            "heatmap-opacity": 0,
            "heatmap-opacity-transition": { duration: fade, delay: 0 },
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0,
              "rgba(0, 0, 0, 0)",
              0.2,
              token(container.current, "--app-photos-map-heat-low"),
              0.5,
              token(container.current, "--app-photos-map-heat-mid"),
              0.8,
              token(container.current, "--app-photos-map-heat-high"),
              1,
              token(container.current, "--app-photos-map-heat-peak"),
            ],
          },
        });

        map.addLayer({
          id: "top-place",
          type: "circle",
          source: "places",
          filter: ["==", ["get", "photos"], most],
          paint: {
            "circle-radius": 5,
            "circle-color": token(container.current, "--app-photos-map-heat-peak"),
            "circle-stroke-width": 2,
            "circle-stroke-color": token(container.current, "--app-photos-map-heat-mid"),
            "circle-opacity": 0,
            "circle-stroke-opacity": 0,
            "circle-opacity-transition": { duration: fade, delay: fade },
            "circle-stroke-opacity-transition": { duration: fade, delay: fade },
          },
        });

        map.setPaintProperty("heat", "heatmap-opacity", 0.85);
        map.setPaintProperty("top-place", "circle-opacity", 1);
        map.setPaintProperty("top-place", "circle-stroke-opacity", 1);
      });
    }

    createMap().catch(() => setFailed(true));

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [places, reduceMotion]);

  return (
    <main className={styles.screen}>
      <div className={styles.content}>
        <h1 className={`${styles.heading} semibold`}>Her blev de fleste af dine minder skabt:</h1>

        <div className={styles.map}>
          {failed ? (
            <p className={`${styles.fallback} regular`}>Kortet kunne ikke vises lige nu.</p>
          ) : (
            <div ref={container} className={styles.canvas} />
          )}
        </div>

        <ul className={failed ? styles.list : "sr-only"} aria-label="Steder hvor du tog fotos">
          {places.map((place) => (
            <li key={place.place}>
              {place.place}: {place.photos.toLocaleString("da-DK")} fotos
            </li>
          ))}
        </ul>

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
