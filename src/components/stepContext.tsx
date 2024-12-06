import React, {
  type Dispatch,
  type ReactNode,
  createContext,
  useContext,
  useState,
  useReducer,
} from "react";

interface IAction {
  type: "modify";
  payload: IFormData;
}

interface IFormData {
  email: string;
  username: string;
  accountNumber: string;
  accountName: string;
  bankName: string;
  amount: number;
  sub: string;
}

interface IFormContext {
  setPrevStep: (value: string) => void;
  handleNext: (value: "payment" | "verify" | "welcome" | "signIn") => void;
  dispatch: Dispatch<IAction>;
  step: string;
  prevStep: string;
  data: IFormData;
}

const formState = createContext<IFormContext>({
  handleNext: (value: string) => {},
  setPrevStep: (value: string) => {},
  step: "signIn",
  prevStep: "signIn",
  data: {
    email: "",
    username: "",
    accountName: "",
    accountNumber: "",
    amount: 0,
    bankName: "",
    sub: "",
  },
  dispatch: (value: {}) => {},
});

export const StepContext = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState("first");
  const [prevStep, setPrevStep] = useState("first");
  const [data, dispatch] = useReducer(reducer, {
    username: "",
    email: "",
    accountName: "",
    accountNumber: "",
    amount: 0,
    bankName: "",
    sub: "",
  });
  function reducer(data: IFormData, action: IAction) {
    const { type } = action;
    switch (type) {
      case "modify": {
        return { ...action.payload };
      }
      default:
        return data;
    }
  }

  function handleNext(value: string = prevStep) {
    setStep(value);
  }
  console.log({ data });

  return (
    <formState.Provider
      value={{
        step,
        handleNext,
        data,
        dispatch,
        prevStep,
        setPrevStep,
      }}
    >
      {children}
    </formState.Provider>
  );
};

export function useFormState() {
  return useContext(formState);
}
