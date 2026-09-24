declare module "@paystack/inline-js" {
  interface PaystackTransaction {
    id: number;
    reference: string;
    message: string;
  }

  interface PaystackError {
    message: string;
  }

  interface PaystackCallbacks {
    onSuccess?: (transaction: PaystackTransaction) => void;
    onCancel?: () => void;
    onError?: (error: PaystackError) => void;
    onLoad?: (response: {
      id: number;
      customer: any;
      accessCode: string;
    }) => void;
  }

  class Paystack {
    resumeTransaction(accessCode: string, callbacks?: PaystackCallbacks): void;
  }

  export default Paystack;
}
