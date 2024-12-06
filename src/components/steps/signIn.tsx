"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "@/components/UIs/button";
import { toast } from "sonner";
import { Input } from "@/components/UIs/input";
import { useFormState } from "../stepContext";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
  email: z.string().email({ message: "Please input a valid email address" }),
});

const SignIn = () => {
  const { handleNext, step, dispatch, data } = useFormState();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit({ email }: z.infer<typeof FormSchema>) {
    try {
      const res = await fetch(
        "https://us-central1-huntgame-1d5e3.cloudfunctions.net/loginuserweb/loginUserweb",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            code: 12345,
          }),
        }
      );
      console.log({ res });
      const response = await res.json();
      console.log({ response });
      if (res.ok) {
        toast("An OTP has been sent to your mail");
        dispatch({ type: "modify", payload: { ...data, email } });
        handleNext("verify");
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[32rem] mx-auto px-5"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-6">
              <h3 className="text-[1.625rem] md:text-[2.5rem]">Sign In</h3>
              <p className="font-extrabold pb-4 max-w-[60vw] m-0">
                Sign into your account to see subscription plans
              </p>
              <FormControl className="mb-2">
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage className="text-base" />
            </FormItem>
          )}
        />
        <Button disabled={form.formState.isSubmitting} text="Sign in" />
      </form>
      {/* <a href="/download">download</a> */}
    </Form>
  );
};

export default SignIn;
