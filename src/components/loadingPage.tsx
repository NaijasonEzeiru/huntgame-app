"use client";

const LoadingPage = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center w-full h-[18vh] text-primary text-6xl">
      <div className="relative">
        <span className="relative inline-block uppercase flip">.</span>
        <span className="relative inline-block uppercase flip">.</span>
        <span className="relative inline-block uppercase flip">.</span>
        <span className="relative inline-block uppercase flip">.</span>
        <span className="relative inline-block uppercase flip">.</span>
        <span className="relative inline-block uppercase flip">.</span>
      </div>
    </div>
  );
};

export default LoadingPage;
