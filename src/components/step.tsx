import dynamic from "next/dynamic";
import LoadingPage from "./loadingPage";
import { useFormState } from "./stepContext";
import SignIn from "./steps/signIn";

export function Step() {
  const { step } = useFormState();
  const Verify = dynamic(() => import("./steps/verify"), {
    loading: () => <LoadingPage />,
  });
  const Welcome = dynamic(() => import("./steps/welcome"), {
    loading: () => <LoadingPage />,
  });
  const Payment = dynamic(() => import("./steps/payment"), {
    loading: () => <LoadingPage />,
  });

  switch (step) {
    case "verify":
      return <Verify />;
    case "welcome":
      return <Welcome />;
    case "payment":
      return <Payment />;
    default:
      return <Welcome />;
      return <SignIn />;
  }
}
