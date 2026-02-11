import SectionLayout from "@/components/SectionLayout";
import TweetContentSection from "@/components/sections/TweetContentSection";

export default function TweetsPage() {
  return (
    <SectionLayout title="Tweet content" accent="purple">
      <TweetContentSection />
    </SectionLayout>
  );
}
