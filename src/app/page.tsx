"use client";
import { Step } from "@/components/step";
import { StepContext } from "@/components/stepContext";
// import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] text-black text-left z-50">
      <div className="bg-[#F3F3F3] rounded-[1.25rem] md:rounded-none pt-8 md:pt-10 xl:pt-12 md:pb-32  pb-24 min-w-[90vw] sm:min-w-[60vw]">
        <StepContext>
          <Step />
        </StepContext>
      </div>
    </div>
  );
  // return (
  //   <Card className="max-w-[90vw] min-w-72 sm:min-w-[350px]">
  //     <StepContext>
  //       <Step />
  //     </StepContext>
  //   </Card>
  // );
}
