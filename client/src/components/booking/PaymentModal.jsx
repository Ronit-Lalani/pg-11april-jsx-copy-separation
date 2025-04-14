import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  CheckCircle2, 
  Wallet, 
  Building, 
  AlertCircle,
  Loader2
} from "lucide-react";

const PaymentModal = ({ isOpen, onClose, onSuccess, property, amount }) => {
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const resetForm = () => {
    setCardNumber("");
    setCardExpiry("");
    setCardCvv("");
    setCardName("");
    setUpiId("");
    setIsProcessing(false);
    setIsSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handlePaymentSubmit = () => {
    if (paymentMethod === "card") {
      if (!cardNumber || !cardExpiry || !cardCvv || !cardName) {
        toast({
          title: "Incomplete card details",
          description: "Please fill in all card information to proceed.",
          variant: "destructive",
        });
        return;
      }
    } else if (paymentMethod === "upi" && !upiId) {
      toast({
        title: "UPI ID required",
        description: "Please enter your UPI ID to proceed.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onSuccess();
        handleClose();
      }, 2000);
    }, 2000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const formatCardExpiry = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    return v.length >= 2 ? v.slice(0, 2) + (v.length > 2 ? "/" + v.slice(2, 4) : "") : v;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isSuccess ? "Payment Successful" : "Complete Your Payment"}
          </DialogTitle>
          <DialogDescription>
            {isSuccess 
              ? "Your booking has been confirmed successfully."
              : `Secure payment for booking ${property.title}`
            }
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-10 flex flex-col items-center justify-center text-center">
            <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-3 mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Payment Complete</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your payment of ₹{amount.toLocaleString("en-IN")} was successful
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              A confirmation has been sent to your email
            </p>
          </div>
        ) : isProcessing ? (
          <div className="py-10 flex flex-col items-center justify-center text-center">
            <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
            <h3 className="text-xl font-semibold mb-2">Processing Payment</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Please do not close this window
            </p>
          </div>
        ) : (
          <>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Property</p>
                  <p className="font-medium">{property.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{property.address}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
                  <p className="font-bold text-lg">₹{amount.toLocaleString("en-IN")}</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  This is a simulated payment interface for demonstration purposes. No real payments will be processed.
                </p>
              </div>
            </div>

            <Tabs defaultValue="card" onValueChange={setPaymentMethod}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="card" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Card</span>
                </TabsTrigger>
                <TabsTrigger value="upi" className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  <span>UPI</span>
                </TabsTrigger>
                <TabsTrigger value="netbanking" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  <span>NetBanking</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="card">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      maxLength={19}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry-date">Expiry Date</Label>
                      <Input
                        id="expiry-date"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(formatCardExpiry(e.target.value))}
                        maxLength={5}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/[^0-9]/g, ""))}
                        maxLength={3}
                        type="password"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="card-name">Name on Card</Label>
                    <Input
                      id="card-name"
                      placeholder="John Doe"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="upi">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="upi-id">UPI ID</Label>
                    <Input
                      id="upi-id"
                      placeholder="yourname@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Enter your UPI ID to proceed with the payment. You will receive a payment request on your UPI app.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="netbanking">
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    {["HDFC Bank", "ICICI Bank", "SBI", "Axis Bank", "Kotak Bank", "Other Banks"].map((bank) => (
                      <Button key={bank} variant="outline" className="h-20 flex flex-col items-center justify-center">
                        <Building className="h-6 w-6 mb-2" />
                        <span className="text-xs text-center">{bank}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}

        <DialogFooter>
          {isSuccess ? (
            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          ) : isProcessing ? (
            <Button disabled className="w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={handleClose} className="w-1/3">
                Cancel
              </Button>
              <Button onClick={handlePaymentSubmit} className="w-2/3">
                Pay ₹{amount.toLocaleString("en-IN")}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
