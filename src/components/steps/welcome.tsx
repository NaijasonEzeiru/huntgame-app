import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Card from "../UIs/card";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { useFormState } from "../stepContext";
import { Button } from "../ui/button";
import { toast } from "sonner";

const v = {
  premium: [
    {
      purchaseVolume: 180,
      amountToPay: "7900",
      sub: "six months premium subscription",
    },
    {
      purchaseVolume: 90,
      amountToPay: "5900",
      sub: "three months premium subscription",
    },
    {
      purchaseVolume: 60,
      amountToPay: "4500",
      sub: "two months premium subscription",
    },
    {
      purchaseVolume: 30,
      amountToPay: "2500",
      sub: "one month premium subscription",
    },
  ],
  MessagePoints: [
    {
      purchaseVolume: 15,
      amountToPay: "6900",
      sub: "15 message points",
    },
    {
      purchaseVolume: 10,
      amountToPay: "4900",
      sub: "10 message points",
    },
    {
      purchaseVolume: 5,
      amountToPay: "3200",
      sub: "5 message points",
    },
    {
      purchaseVolume: 2,
      amountToPay: "1500",
      sub: "2 message points",
    },
  ],
  TopHunt: [
    {
      purchaseVolume: 15,
      amountToPay: "2900",
      sub: "15 top points",
    },
    {
      purchaseVolume: 10,
      amountToPay: "1900",
      sub: "10 top points",
    },
    {
      purchaseVolume: 5,
      amountToPay: "1200",
      sub: "5 top points",
    },
    {
      purchaseVolume: 2,
      amountToPay: "700",
      sub: "2 top points",
    },
  ],
  Adverts: [
    {
      purchaseVolume: "advertmonth",
      amountToPay: "85000",
      sub: "one month advert",
    },
    {
      purchaseVolume: "advertweek",
      amountToPay: "24900",
      sub: "one week advert",
    },
    {
      purchaseVolume: "advertday",
      amountToPay: "3900",
      sub: "one day advert",
    },
  ],
};

const Welcome = () => {
  const { handleNext, dispatch, data } = useFormState();
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<number>(0);
  const [category, setCategory] = useState<
    "TopHunt" | "Adverts" | "MessagePoints" | "premium"
  >("premium");

  async function handleSubmit() {
    try {
      setIsLoading(true);
      const res = await fetch(
        "https://us-central1-huntgame-1d5e3.cloudfunctions.net/generateAccountweb/generateaccesstoken",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category,
            purchaseVolume: v[category][selected].purchaseVolume,
            amountToPay: v[category][selected].amountToPay,
            customerName: data.username,
            email: data.email,
          }),
        }
      );
      const response = await res.json();
      console.log({ response });
      setIsLoading(false);
      if (res.ok) {
        toast(response?.message);
        dispatch({
          type: "modify",
          payload: {
            ...data,
            accountName: response?.msg?.accountName,
            amount: response?.msg?.amount,
            accountNumber: response?.msg?.accountNumber,
            bankName: response?.msg?.bankName,
            sub: v[category][selected].sub,
          },
        });
        handleNext("payment");
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
  console.log({ category: v[category][selected] });

  return (
    <div className="max-w-[80vw] mx-auto overflow-hidden sm:px-6">
      <span className="flex gap-2 items-baseline pb-4">
        <h3 className="text-[1.625rem] md:text-[2.5rem]">Welcome</h3>
        <p className="font-extrabold">{data?.username}</p>
      </span>
      <p className="font-extrabold pb-4 max-w-[60vw] m-0">
        Select a subscription to continue.
      </p>
      <Tabs
        defaultValue="premium"
        className="mb-3 md:mb-6"
        onValueChange={setCategory}
      >
        <TabsList className="overflow-x-auto w-full mb-2 gap-2 md:gap-6 h-16 justify-start md:mb-16">
          <TabsTrigger
            value="premium"
            className="md:h-14 md:px-12 md:rounded-[40px]"
          >
            Premium
          </TabsTrigger>
          <TabsTrigger
            value="MessagePoints"
            className="md:h-14 md:px-5 md:rounded-[40px]"
          >
            Message points
          </TabsTrigger>
          <TabsTrigger
            value="TopHunt"
            className="md:h-14 md:px-5 md:rounded-[40px]"
          >
            Top points
          </TabsTrigger>
          <TabsTrigger
            value="Adverts"
            className="md:h-14 md:px-5 md:rounded-[40px]"
          >
            Adverts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="premium" className="overflow-x-auto w-full">
          <ToggleGroup
            type="single"
            defaultValue="0"
            className="flex gap-4 text-white w-max items-center justify-center"
            onValueChange={(e) => setSelected(+e)}
          >
            <Card
              top="6 months premium"
              middle="₦7,900.00"
              bottom="Save 80 %"
              value="0"
            />
            <Card
              top="3 months premium"
              middle="₦5,900.00"
              bottom="Save 60 %"
              value="1"
            />
            <Card
              top="2 months premium"
              middle="₦4,500.00"
              bottom="Save 40 %"
              value="2"
            />
            <Card
              top="1 month premium"
              middle="₦2,500.00"
              bottom="Save 20 %"
              value="3"
            />
          </ToggleGroup>
        </TabsContent>
        <TabsContent value="MessagePoints" className="overflow-x-auto w-full">
          <ToggleGroup
            type="single"
            defaultValue="0"
            className="flex gap-4 text-white w-max items-center justify-center"
            onValueChange={(e) => setSelected(+e)}
          >
            <Card
              top="15 message points"
              middle="₦6,900.00"
              bottom="Save 80 %"
              value="0"
            />
            <Card
              top="10 message points"
              middle="₦4,900.00"
              bottom="Save 60 %"
              value="1"
            />

            <Card
              top="5 message points"
              middle="₦3,200.00"
              bottom="Save 40 %"
              value="2"
            />

            <Card
              top="2 message points"
              middle="₦1,500.00"
              bottom="Save 20 %"
              value="3"
            />
          </ToggleGroup>
        </TabsContent>
        <TabsContent
          value="TopHunt"
          className="flex gap-4 text-white overflow-x-auto w-full"
        >
          <ToggleGroup
            type="single"
            defaultValue="0"
            className="flex gap-4 text-white w-max items-center justify-center"
            onValueChange={(e) => setSelected(+e)}
          >
            <Card
              top="15 Top points"
              middle="₦2,900.00"
              bottom="Save 80 %"
              value="0"
            />
            <Card
              top="10 Top points"
              middle="₦1,900.00"
              bottom="Save 60 %"
              value="1"
            />
            <Card
              top="5 Top points"
              middle="₦1,200.00"
              bottom="Save 40 %"
              value="2"
            />
            <Card
              top="2 Top points"
              middle="₦700.00"
              bottom="Save 20 %"
              value="3"
            />
          </ToggleGroup>
        </TabsContent>
        <TabsContent
          value="Adverts"
          className="flex gap-4 text-white overflow-x-auto w-full"
        >
          <ToggleGroup
            type="single"
            defaultValue="0"
            className="flex gap-4 text-white w-max items-center justify-center"
            onValueChange={(e) => setSelected(+e)}
          >
            <Card top="1 month Advert" middle="₦85,000.00" value="0" />
            <Card top="1 Week Advert" middle="₦24,900.00" value="1" />
            <Card top="1 day Advert" middle="₦3,900.00" value="2" />
          </ToggleGroup>
        </TabsContent>
      </Tabs>
      <Button
        disabled={isLoading}
        onClick={() => handleSubmit()}
        className="w-full bg-[#D20F89] md:text-[1.375rem] h-16 font-extrabold sm:h-20 xl:h-24 text-white rounded-[1.875rem] md:rounded-[3.125rem] max-w-[32rem] mx-auto flex"
      >
        {isLoading && (
          <span className="mr-2 animate-spin">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              // class="lucide lucideLoader"
            >
              <path d="M12 2v4" />
              <path d="m16.2 7.8 2.9-2.9" />
              <path d="M18 12h4" />
              <path d="m16.2 16.2 2.9 2.9" />
              <path d="M12 18v4" />
              <path d="m4.9 19.1 2.9-2.9" />
              <path d="M2 12h4" />
              <path d="m4.9 4.9 2.9 2.9" />
            </svg>
          </span>
        )}
        Continue
      </Button>
      {/* <Button disabled={isLoading} text="Continue" onclick={()=> handleSubmit}/> */}
    </div>
  );
};

export default Welcome;
