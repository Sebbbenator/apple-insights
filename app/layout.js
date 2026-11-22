import "./globals.css";
import styles from "./layout.module.css";

export const metadata = {
  title: {
    default: "Apple Insights 2026",
    template: "%s · Apple Insights",
  },
  description:
    "Studieprojekt på Erhvervsakademi Aarhus. Ikke tilknyttet Apple.",
  icons: {
    icon: "/AppleInsights.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0d0d0d",
};

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body>
        <div className={styles.app}>{children}</div>
      </body>
    </html>
  );
}
