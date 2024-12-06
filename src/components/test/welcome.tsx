import { useState } from "react";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Card from "../UIs/card";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { useFormState } from "../stepContext";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Loader } from "lucide-react";

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
      amountToPay: "7900",
      sub: "one month advert",
    },
    {
      purchaseVolume: "advertweek",
      amountToPay: "5900",
      sub: "one week advert",
    },
    {
      purchaseVolume: "advertday",
      amountToPay: "4500",
      sub: "one day advert",
    },
  ],
};

const Plans = () => {
  const { handleNext, dispatch, data } = useFormState();
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<number>(0);
  const [category, setCategory] = useState<
    "TopHunt" | "Adverts" | "MessagePoints" | "premium"
  >("premium");

  async function handleSubmit() {
    try {
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

  return (
    <>
      <CardHeader>
        <CardTitle>Welcome {data?.username}</CardTitle>
        <CardDescription>Select a subscription to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="premium" className="" onValueChange={setCategory}>
          <TabsList className="overflow-x-auto w-full mb-2 gap-2 md:gap-6 justify-start bg-transparent">
            <TabsTrigger value="premium" className="px-3">
              Premium
            </TabsTrigger>
            <TabsTrigger value="MessagePoints" className="px-3">
              Message points
            </TabsTrigger>
            <TabsTrigger value="TopHunt" className="px-3">
              Top points
            </TabsTrigger>
            <TabsTrigger value="Adverts" className="px-3">
              Adverts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="premium" className="overflow-x-auto w-full">
            <ToggleGroup
              type="single"
              defaultValue="0"
              className="flex gap-4 text-white items-center"
              onValueChange={(e) => setSelected(+e)}
            >
              <Card
                top="6 months"
                middle="₦7,900.00"
                bottom="Save 80 %"
                value="0"
              />
              <Card
                top="3 months"
                middle="₦5,900.00"
                bottom="Save 60 %"
                value="1"
              />
              <Card
                top="2 months"
                middle="₦4,500.00"
                bottom="Save 40 %"
                value="2"
              />
              <Card
                top="1 month"
                middle="₦2,500.00"
                bottom="Save 20 %"
                value="3"
              />
            </ToggleGroup>
          </TabsContent>
          <TabsContent value="MessagePoints">
            <ToggleGroup
              type="single"
              defaultValue="0"
              className="flex gap-4 text-white overflow-x-auto w-full items-center justify-center"
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
              className="flex gap-4 text-white overflow-x-auto w-full items-center justify-center"
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
              className="flex gap-4 text-white overflow-x-auto w-full items-center justify-center"
              onValueChange={(e) => setSelected(+e)}
            >
              <Card top="1 month Advert" middle="₦7,900.00" value="0" />
              <Card top="1 Week Advert" middle="₦5,900.00" value="1" />
              <Card top="1 day Advert" middle="₦4,500.00" value="2" />
            </ToggleGroup>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button disabled={isLoading} onClick={() => handleSubmit()}>
          {isLoading && (
            <span className="mr-2 animate-spin">
              <Loader />
            </span>
          )}
          Continue
        </Button>
      </CardFooter>
    </>
  );
};

export default Plans;
