import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFormState } from "../stepContext";
import { Button } from "../ui/button";

const Pay = () => {
  const { data } = useFormState();
  return (
    <>
      <CardHeader>
        <CardTitle>
          {data?.username}, you are attempting to pay for {data?.sub}.
        </CardTitle>
        <CardDescription>
          This account number is temporary and expires in 20 minutes,
          <br /> do not save this account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-secondary text-white rounded-3xl pt-7 pb-16 px-3 text-center space-y-4">
          <p>Transfer</p>
          <p>₦{data?.amount}</p>
          <p>{data?.accountNumber}</p>
          <p>{data?.amount}</p>
          <p>{data?.bankName}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button>I have made the transfer</Button>
      </CardFooter>
    </>
  );
};

export default Pay;
