"use client";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useFormState } from "../stepContext";
import { Loader } from "lucide-react";
import { Input } from "../ui/input";

const FormSchema = z.object({
  email: z.string().email({ message: "Please input a valid email address" }),
});

const LogIn = () => {
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
      const data = await res.json();
      console.log({ data });
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
    <>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Sign into your account to see subscription plans
          {data?.email}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>One-Time Password</FormLabel> */}
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormDescription className="mt-4">
                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting && (
                        <span className="mr-2 animate-spin">
                          <Loader />
                        </span>
                      )}
                      Verify email
                    </Button>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </>
  );
};

export default LogIn;
