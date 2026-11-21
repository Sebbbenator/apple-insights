"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import styles from "./TimeDust.module.css";

const gap = 2;
const spread = 0.7;
const life = 1.2;

function drawDigits(target, context) {
  const opacity = Number(getComputedStyle(target).getPropertyValue("--app-insights-year-opacity")) || 0.6;

  target.querySelectorAll("[data-digit]").forEach((digit) => {
    const box = digit.getBoundingClientRect();
    const style = getComputedStyle(digit);
    const gradient = context.createLinearGradient(box.left, box.top, box.right, box.bottom);
    gradient.addColorStop(0, "#ffffff");
    gradient.addColorStop(1, "#737373");

    context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    context.fillStyle = gradient;
    context.globalAlpha = opacity;

    const metrics = context.measureText(digit.textContent);
    const textHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
    const baseline = box.top + (box.height - textHeight) / 2 + metrics.fontBoundingBoxAscent;
    context.fillText(digit.textContent, box.left + parseFloat(style.paddingLeft), baseline);
  });
}

function makeParticles(context, width, height) {
  const pixels = context.getImageData(0, 0, width, height).data;
  const particles = [];
  let left = width;
  let right = 0;

  for (let y = 0; y < height; y += gap) {
    for (let x = 0; x < width; x += gap) {
      const i = (y * width + x) * 4;
      if (pixels[i + 3] > 20) {
        particles.push({
          x: x,
          y: y,
          color: `rgb(${pixels[i]} ${pixels[i + 1]} ${pixels[i + 2]})`,
          alpha: pixels[i + 3] / 255,
          speedX: 60 + Math.random() * 160,
          speedY: -40 - Math.random() * 120,
          delay: 0,
        });
        left = Math.min(left, x);
        right = Math.max(right, x);
      }
    }
  }

  particles.forEach((particle) => {
    particle.delay = ((particle.x - left) / (right - left)) * spread + Math.random() * 0.25;
  });

  return particles;
}

export default function TimeDust({ target, active }) {
  const reduceMotion = useReducedMotion();
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active || reduceMotion) {
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    drawDigits(target.current, context);
    const particles = makeParticles(context, width, height);
    const start = performance.now();
    let frame;

    function tick(now) {
      const time = (now - start) / 1000;
      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        const t = Math.max(0, time - particle.delay);
        const progress = Math.min(t / life, 1);
        if (progress >= 1) {
          return;
        }
        context.globalAlpha = particle.alpha * (1 - progress);
        context.fillStyle = particle.color;
        context.fillRect(
          particle.x + particle.speedX * t + 30 * t * t,
          particle.y + particle.speedY * t,
          gap,
          gap
        );
      });

      if (time < spread + 0.25 + life) {
        frame = requestAnimationFrame(tick);
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reduceMotion, target]);

  return <canvas ref={canvasRef} className={styles.dust} aria-hidden="true" />;
}
