"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/UIs/button";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormState } from "../stepContext";
import { Input } from "../UIs/input";
import { Loader } from "lucide-react";
import { Button as ShadButton } from "../ui/button";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function Verify() {
  const { handleNext, setPrevStep, dispatch, data } = useFormState();
  const Ref = useRef(null);
  const [timer, setTimer] = useState("00:00:00");
  const [resending, setResending] = useState(false);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer("00:00:30");

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 30);
    return deadline;
  };

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  // Another way to call the clearTimer() to start
  // the countdown is via action event from the
  // button first we create function to be called
  // by the button
  const onClickReset = () => {
    clearTimer(getDeadTime());
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function handleSubmit() {
    try {
      setResending(true);
      const res = await fetch(
        "https://us-central1-huntgame-1d5e3.cloudfunctions.net/loginuserweb/loginUserweb",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data?.email,
            code: 12345,
          }),
        }
      );
      console.log({ res });
      const response = await res.json();
      console.log({ response });
      setResending(false);
      if (res.ok) {
        toast("An OTP has been sent to your mail");
        onClickReset();
      } else {
        toast("failed.", {
          description: "The provided email address has not been registered",
          style: { color: "red" },
        });
      }
    } catch (err) {
      console.log({ err });
      toast("failed.", {
        description: "Something went wrong",
        style: { color: "red" },
      });
    }
  }

  async function onSubmit({ pin }: z.infer<typeof FormSchema>) {
    try {
      const res = await fetch(
        "https://us-central1-huntgame-1d5e3.cloudfunctions.net/otpconfirmation/emailotp-confirmation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            code: +pin,
          }),
        }
      );
      const response = await res.json();
      console.log({ response });
      if (res.ok) {
        toast(response?.message);
        dispatch({
          type: "modify",
          payload: { ...data, username: response?.userName },
        });
        handleNext("welcome");
      } else if (response?.message) {
        toast(response.message, {
          description: "Check the code and try again.",
          style: { color: "red" },
        });
      } else {
        toast("failed.", {
          description: "Ooops, Something went wrong",
          style: { color: "red" },
        });
      }
    } catch (err) {
      toast("failed.", {
        description: "Something went wrong",
        style: { color: "red" },
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-[32rem] mx-auto px-3 sm:px-7"
      >
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <h3 className="text-[1.625rem] md:text-[2.5rem] px-5 self-start">
                Verify email
              </h3>
              <p className="font-extrabold pb-4 max-w-[60vw] m-0 px-5 self-start">
                Is this your account? verify it, enter
                <br /> the code sent to {data?.email}
              </p>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>

                {/* <Input
                  type="number"
                  placeholder="OTP"
                  {...field}
                  maxLength={6}
                /> */}
              </FormControl>
              {/* <FormDescription>
                    Please enter the one-time password sent to your phone.
                  </FormDescription> */}
              <FormMessage className="text-base" />
            </FormItem>
          )}
        />

        <div className="mx-5">
          <Button disabled={form.formState.isSubmitting} text="Verify email" />
        </div>
      </form>
      <div className="flex gap-2 px-3 sm:px-12 items-center mx-auto max-w-[32rem] mt-3 flex-wrap justify-center">
        <span className="whitespace-nowrap">Did not get the mail?</span>
        <ShadButton
          className="bg-slate-800"
          onClick={() => handleSubmit()}
          disabled={timer !== "00:00:00" || resending}
        >
          {resending && (
            <span className="mr-2 animate-spin">
              <Loader />
            </span>
          )}
          Resend
        </ShadButton>
        {timer !== "00:00:00" && <span>{timer}</span>}
      </div>
    </Form>
  );
}
