import SectionLayout from "@/components/SectionLayout";
import HotTopicsSection from "@/components/sections/HotTopicsSection";
import MemecoinSection from "@/components/sections/MemecoinSection";

export default function HotPage() {
  return (
    <SectionLayout title="Hot & Shitcoins" accent="orange">
      <HotTopicsSection />
      <MemecoinSection />
    </SectionLayout>
  );
}
