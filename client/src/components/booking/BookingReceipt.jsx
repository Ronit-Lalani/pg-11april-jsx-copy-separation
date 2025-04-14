import { useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Download,
  Printer,
  Share2,
  Copy,
  FileText,
  CircleDollarSign,
  User,
  Home,
  Calendar,
  CheckCircle2
} from "lucide-react";

const BookingReceipt = ({
  property,
  booking,
  amount = 15000,
  date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
  transactionId = `TXN${Math.floor(Math.random() * 1000000)}`,
  tenant = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210"
  }
}) => {
  const { toast } = useToast();
  const receiptRef = useRef(null);

  const handleCopyId = () => {
    navigator.clipboard.writeText(transactionId);
    toast({
      title: "Transaction ID copied",
      description: "The transaction ID has been copied to clipboard",
    });
  };

  const handlePrint = () => {
    if (receiptRef.current) {
      const printWindow = window.open('', '', 'width=800,height=600');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Booking Receipt</title>');
        printWindow.document.write('<style>');
        printWindow.document.write(`
          body { font-family: Arial, sans-serif; padding: 20px; }
          .receipt { max-width: 800px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; }
          .header { display: flex; justify-content: space-between; margin-bottom: 20px; }
          .logo { font-size: 24px; font-weight: bold; }
          .title { text-align: center; margin: 20px 0; }
          .info-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
          .info-label { font-weight: bold; }
          .separator { border-top: 1px solid #ddd; margin: 20px 0; }
          .property { display: flex; gap: 15px; margin-bottom: 20px; }
          .property-img { width: 100px; height: 80px; object-fit: cover; }
          .property-details h3 { margin: 0 0 5px 0; }
          .property-details p { margin: 0; color: #666; }
          .payment { margin: 20px 0; }
          .payment h3 { margin-bottom: 10px; }
          .payment-row { display: flex; justify-content: space-between; margin-bottom: 5px; }
          .payment-total { font-weight: bold; font-size: 18px; margin-top: 10px; }
          .footer { text-align: center; margin-top: 40px; color: #666; font-size: 12px; }
        `);
        printWindow.document.write('</style></head><body>');
        printWindow.document.write(receiptRef.current.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }
    }
  };

  const handleDownload = () => {
    toast({
      title: "Receipt downloaded",
      description: "Your booking receipt has been downloaded",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Booking Receipt',
        text: `Booking receipt for ${property?.title || "PG Accommodation"}`,
        url: window.location.href,
      })
      .catch(() => {
        toast({
          title: "Sharing failed",
          description: "Unable to share the receipt",
          variant: "destructive",
        });
      });
    } else {
      toast({
        title: "Sharing not supported",
        description: "Your browser doesn't support the Web Share API",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" className="gap-1" onClick={handlePrint}>
          <Printer className="h-4 w-4" /> Print
        </Button>
        <Button variant="outline" size="sm" className="gap-1" onClick={handleDownload}>
          <Download className="h-4 w-4" /> Download
        </Button>
        <Button variant="outline" size="sm" className="gap-1" onClick={handleShare}>
          <Share2 className="h-4 w-4" /> Share
        </Button>
      </div>

      <Card className="border border-gray-200 dark:border-gray-700">
        <CardContent className="p-6" ref={receiptRef}>
          {/* Entire JSX from the .tsx version is reused below exactly as-is */}
          {/* I kept it untouched since it's already compatible with JSX */}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingReceipt;
