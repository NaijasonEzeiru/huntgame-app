import React from "react";

import { useFormState } from "../stepContext";
import Button from "../UIs/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button as ButtonUi } from "../ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const Payment = () => {
  const { data, dispatch, handleNext } = useFormState();

  const closeDialog = () => {
    dispatch({
      type: "modify",
      payload: {
        email: "",
        username: "",
        accountName: "",
        accountNumber: "",
        amount: 0,
        bankName: "",
        sub: "",
      },
    });
    handleNext("signIn");
  };

  return (
    <div className="max-w-[80vw] mx-auto overflow-hidden sm:px-6">
      <h3 className="font-extrabold max-w-[28rem] mx-auto text-center mb-8">
        {data?.username}, you are attempting to pay for {data?.sub}.
      </h3>
      <div className="bg-secondary text-white rounded-3xl mb-2 pt-7 pb-16 px-3 text-center space-y-4 max-w-[32rem] mx-auto lg:rounded-[40px] lg:my-7">
        <p>Transfer</p>
        <p className="border border-white rounded-md px-2 py-1 w-fit mx-auto md:px-3 md:py-2">
          ₦{data?.amount}
        </p>
        <p>To</p>
        <div className="flex gap-2 items-center justify-center">
          <p>{data?.accountNumber}</p>
          <ButtonUi
            size="icon"
            variant="ghost"
            onClick={() => {
              navigator.clipboard.writeText(data?.accountNumber);
              toast("Account number copied to clipboard");
            }}
          >
            <Copy />
          </ButtonUi>
        </div>
        <p>{data?.bankName}</p>
        <p>{data?.accountName}</p>
      </div>
      <p className="text-primary mb-2 lg:mb-8 text-center text-xs sm:text-base mx-6 sm:mx-9">
        This account number is temporary and expires in 20 minutes, do not save
        this account.
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Button disabled={false} text="I have made the transfer" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Your subscription is being processed</DialogTitle>
            <DialogDescription>You can now return to the app</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <ButtonUi type="submit" onClick={closeDialog}>
              Ok
            </ButtonUi>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Payment;
