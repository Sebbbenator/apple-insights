import Instruction from "@/components/Instruction";
import ProgressBar from "@/components/ProgressBar";

export default function InsightsLayout({ children }) {
  return (
    <>
      {children}
      <ProgressBar />
      <Instruction />
    </>
  );
}
