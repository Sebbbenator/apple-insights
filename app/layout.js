import Header from "@/components/Header";
import "./globals.css";

export const metadata = {
  title: {
    default: "Apple Insights 2026",
    template: "%s · Apple Insights",
  },
  description: "Studieprojekt på Erhvervsakademi Aarhus. Ikke tilknyttet Apple.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body>
        <Header />
        {children}
        <footer className="study-notice">
          Studieprojekt, Multimediedesign, Erhvervsakademi Aarhus. Ikke tilknyttet Apple.
        </footer>
      </body>
    </html>
  );
}
