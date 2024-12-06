import { Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "./ui/progress";

const DownloadCheck = () => {
  const [progress, setProgress] = useState(0);
  const [openDiaglog, setOpenDialog] = useState(false);

  const download = async () => {
    setOpenDialog(true);
    try {
      const res = await fetch(
        "https://firebasestorage.googleapis.com/v0/b/huntgame-1d5e3.appspot.com/o/huntgameappforandroid%2Fhuntgame.apk?alt=media&token=92154105-34e2-4d15-ab3b-358808fd1c7b"
      );

      if (!res.body) {
        toast("Unable to download", {
          description: "Something went wrong",
          style: { color: "red" },
        });
      } else {
        const contentLength = res.headers.get("Content-Length");
        console.log({ contentLength });
        const totalLength =
          typeof contentLength == "string" && parseInt(contentLength);
        const reader = res.body.getReader();
        const chunks = [];
        let receivedLength = 0;
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            setOpenDialog(false);
            break;
          }
          console.log({ value });
          chunks.push(value);
          receivedLength = receivedLength + value.length;
          if (typeof totalLength === "number") {
            const step = (receivedLength / totalLength) * 100;
            setProgress(step);
          }
        }

        const blob = new Blob(chunks);

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "huntgame show.apk";
        function handleOnDownload() {
          setTimeout(() => {
            URL.revokeObjectURL(url);
            a.removeEventListener("click", handleOnDownload);
          }, 1000);
        }
        a.addEventListener("click", handleOnDownload, false);
        a.click();

        // console.log({ res });
        // const response = await res.json();
        // console.log({ response });
      }
      // if (res.ok) {
      //   toast("Downloading...");
      // } else {
      //   setOpenDialog(false);
      //   toast("Unable to download", {
      //     description: "Something went wrong",
      //     style: { color: "red" },
      //   });
      // }
    } catch (err) {
      console.log({ err });
      setOpenDialog(false);
      toast("Unable to download", {
        description: "Something went wrong",
        style: { color: "red" },
      });
    }
  };
  return (
    <>
      <Dialog onOpenChange={setOpenDialog} open={openDiaglog}>
        <DialogContent className="max-w-[90vw] sm:max-w-96">
          <DialogHeader>
            <DialogTitle>Downloading...</DialogTitle>
            <DialogDescription>
              <Progress value={progress} className="w-full" />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {typeof window !== "undefined" &&
        !/android/i.test(window.navigator.userAgent) &&
        !/iPad|iPhone|iPod/.test(window.navigator.userAgent) && (
          <p className="text-3xl mb-7 text-[#7E7E7E]">
            App is not available for download on desktop
          </p>
        )}
      {typeof window !== "undefined" &&
        /iPad|iPhone|iPod/.test(window.navigator.userAgent) &&
        !window?.MSStream && (
          <p className="mb-7">
            <a
              href="https://apps.apple.com/ng/app/huntgame/id6502562121"
              target="_blank"
              className="hover:underline text-primary mr-2"
            >
              Click here
            </a>
            to download the iOS app on App store
          </p>
        )}
      <span className="flex gap-2 items-center mb-7">
        <p className="text-sm md:text-[1.375rem]">Category- Social network</p>
        <Share2 className="size-6" strokeWidth={1} />
      </span>
      {typeof window !== "undefined" &&
        /android/i.test(window.navigator.userAgent) && (
          <div className="border-secondary border rounded-[10px] p-5 mb-11">
            <a
              className="text-sm font-bold w-full rounded-[30px] bg-[#155407] h-10 text-white flex items-center justify-center"
              // onClick={() => download()}
              href="https://firebasestorage.googleapis.com/v0/b/huntgame-1d5e3.appspot.com/o/huntgameappforandroid%2Fhuntgame.apk?alt=media&token=92154105-34e2-4d15-ab3b-358808fd1c7b"
            >
              Download huntgame for android
            </a>
            {/* <button
              className="text-sm font-bold w-full rounded-[30px] bg-[#155407] h-10 text-white"
              onClick={() => download()}
            >
              Download huntgame for android
            </button> */}
          </div>
        )}
    </>
  );
};

export default DownloadCheck;
