"use client";

import { useEffect, useState } from "react";

const timeFormat = new Intl.DateTimeFormat("da-DK", { hour: "2-digit", minute: "2-digit" });

export default function Clock({ className }) {
  const [time, setTime] = useState(null);

  useEffect(() => {
    let intervalId;

    function update() {
      setTime(timeFormat.format(new Date()));
    }

    update();

    const msToNextMinute = 60000 - (Date.now() % 60000);
    const timeoutId = setTimeout(() => {
      update();
      intervalId = setInterval(update, 60000);
    }, msToNextMinute);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  return <span className={className}>{time ?? " "}</span>;
}
