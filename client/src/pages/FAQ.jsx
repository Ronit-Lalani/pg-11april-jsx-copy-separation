import { useState } from "react"
import { useLocation } from "wouter"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PageTransition from "@/components/ui/page-transition"
import {
  Search,
  Phone,
  Mail,
  MessagesSquare,
  HelpCircle,
  CreditCard,
  UserCircle,
  Home,
  Shield,
  BellRing,
  ArrowRight,
  Calendar
} from "lucide-react"

const FAQ = () => {
  const [, navigate] = useLocation()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Function to handle search input change
  const handleSearchChange = e => {
    setSearchQuery(e.target.value)
  }

  // Function to filter FAQs based on search query and active tab
  const filterFAQs = faqs => {
    let filteredFAQs = faqs

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      filteredFAQs = filteredFAQs.filter(
        faq =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
      )
    }

    // Filter by category
    if (activeTab !== "all") {
      filteredFAQs = filteredFAQs.filter(faq => faq.category === activeTab)
    }

    return filteredFAQs
  }

  // FAQ data
  const faqs = [
    {
      id: 1,
      category: "booking",
      question: "How do I book a PG accommodation?",
      answer:
        "Booking a PG is simple. Browse our listings, select a property, and click the 'Book Now' button. You'll need to provide your details, select your move-in date, and complete the payment process to confirm your booking."
    },
    {
      id: 2,
      category: "booking",
      question: "Can I cancel my booking? What is the refund policy?",
      answer:
        "Yes, you can cancel your booking, but refund policies vary by property. Most properties have a free cancellation period up to 7 days before check-in. After that, cancellation fees may apply. Check the property's specific cancellation policy on its listing page for details."
    },
    {
      id: 3,
      category: "booking",
      question: "How far in advance should I book a PG?",
      answer:
        "We recommend booking at least 2-4 weeks in advance, especially in high-demand areas or during peak seasons (like college admission periods). This ensures you have enough options to choose from and can secure your preferred accommodation."
    },
    {
      id: 4,
      category: "booking",
      question: "Can I schedule a visit before booking?",
      answer:
        "Yes, we encourage you to visit the property before making a decision. You can schedule a visit directly through our platform by clicking the 'Schedule Visit' button on the property listing page. The owner or manager will then contact you to arrange a convenient time."
    },
    {
      id: 5,
      category: "payment",
      question: "What payment methods are accepted?",
      answer:
        "We accept various payment methods including credit/debit cards, net banking, UPI, and wallet payments through our secure payment gateway. All transactions are encrypted for your security."
    },
    {
      id: 6,
      category: "payment",
      question: "Is there a security deposit? When is it refunded?",
      answer:
        "Most properties require a security deposit, typically equivalent to 1-2 months' rent. This deposit is refundable at the end of your stay, provided there are no damages to the property and all dues are cleared. The refund process usually takes 7-14 business days after checkout."
    },
    {
      id: 7,
      category: "payment",
      question: "Are there any hidden charges?",
      answer:
        "No, we maintain complete transparency in our pricing. All charges including rent, security deposit, maintenance fees, and any additional services are clearly displayed on the property listing and booking confirmation."
    },
    {
      id: 8,
      category: "payment",
      question: "How do I pay my monthly rent?",
      answer:
        "You can pay your monthly rent through the StayEase portal or app. We'll send you a reminder before your due date. You can set up automatic payments for convenience, or make manual payments each month using your preferred payment method."
    },
    {
      id: 9,
      category: "account",
      question: "How do I create an account?",
      answer:
        "Click on the 'Sign Up' button at the top right of the homepage. You can register using your email address, or sign up with your Google or Facebook account for quicker access."
    },
    {
      id: 10,
      category: "account",
      question: "How do I reset my password?",
      answer:
        "Click on 'Login', then select 'Forgot Password'. Enter your registered email address to receive a password reset link. Follow the instructions in the email to set a new password."
    },
    {
      id: 11,
      category: "account",
      question: "How do I update my profile information?",
      answer:
        "After logging in, go to your account dashboard and select 'Profile Settings'. Here you can update your personal information, change your password, and manage your notification preferences."
    },
    {
      id: 12,
      category: "account",
      question: "Can I deactivate my account?",
      answer:
        "Yes, you can deactivate your account from the 'Account Settings' section in your dashboard. Note that deactivating your account will not automatically cancel any active bookings or tenancies."
    },
    {
      id: 13,
      category: "property",
      question: "How are properties verified on StayEase?",
      answer:
        "Our verification process includes physical inspection of the property, verification of the owner's identity and property documents, and regular quality checks. Properties that meet our standards receive a 'Verified' badge on their listings."
    },
    {
      id: 14,
      category: "property",
      question: "What amenities are typically included in PG accommodations?",
      answer:
        "Common amenities include furnished rooms, Wi-Fi, electricity, water supply, regular cleaning, and maintenance services. Premium PGs may also offer meals, laundry services, air conditioning, TV, gym, and recreational facilities. Each listing clearly displays the amenities included."
    },
    {
      id: 15,
      category: "property",
      question: "Are meals included in the rent?",
      answer:
        "This varies by property. Some PGs include meals in the rent (usually 2-3 meals per day), while others offer it as an add-on service or don't provide meals at all. The meal options are clearly mentioned in the property details."
    },
    {
      id: 16,
      category: "property",
      question: "What is the typical duration of stay?",
      answer:
        "Most PGs offer accommodations for a minimum of 3 months, with many tenants staying for 6-12 months or longer. Short-term stays of 1-3 months may be available at selected properties, usually at a slightly higher monthly rate."
    },
    {
      id: 17,
      category: "property",
      question: "Do PGs have curfew times?",
      answer:
        "Some PGs do have curfew times, especially in certain neighborhoods or for specific demographics. Curfew details are always mentioned in the property rules section of the listing. Many modern PGs offer flexible entry/exit with biometric or app-based access."
    },
    {
      id: 18,
      category: "owners",
      question: "How do I list my property on StayEase?",
      answer:
        "Register as a property owner on our platform, complete the verification process, and then use the 'Add Property' feature in your dashboard to create your listing. Our team will review and approve your listing before it goes live."
    },
    {
      id: 19,
      category: "owners",
      question: "What are the commission fees for listing a property?",
      answer:
        "We charge a commission of 5% on successful bookings. There are no upfront fees for listing your property. Premium listing features and promotional placements are available for an additional fee."
    },
    {
      id: 20,
      category: "owners",
      question: "How are tenant verifications done?",
      answer:
        "We verify tenants through ID verification, employment or education credentials check, and review of previous rental history when available. This helps ensure that property owners receive reliable and responsible tenants."
    }
  ]

  const filteredFAQs = filterFAQs(faqs)

  return (
    <PageTransition>
      <div className="bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <div className="relative bg-primary/10 dark:bg-primary/5 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Find answers to common questions about PG accommodations,
                bookings, payments, and more.
              </p>

              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for answers..."
                  className="pl-10 py-6 text-base shadow-md"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2">
                <TabsTrigger value="all" className="flex gap-1 items-center">
                  <HelpCircle className="h-4 w-4" />
                  <span className="hidden md:inline">All FAQs</span>
                </TabsTrigger>
                <TabsTrigger
                  value="booking"
                  className="flex gap-1 items-center"
                >
                  <Calendar className="h-4 w-4" />
                  <span className="hidden md:inline">Booking</span>
                </TabsTrigger>
                <TabsTrigger
                  value="payment"
                  className="flex gap-1 items-center"
                >
                  <CreditCard className="h-4 w-4" />
                  <span className="hidden md:inline">Payment</span>
                </TabsTrigger>
                <TabsTrigger
                  value="account"
                  className="flex gap-1 items-center"
                >
                  <UserCircle className="h-4 w-4" />
                  <span className="hidden md:inline">Account</span>
                </TabsTrigger>
                <TabsTrigger
                  value="property"
                  className="flex gap-1 items-center"
                >
                  <Home className="h-4 w-4" />
                  <span className="hidden md:inline">Properties</span>
                </TabsTrigger>
                <TabsTrigger value="owners" className="flex gap-1 items-center">
                  <Shield className="h-4 w-4" />
                  <span className="hidden md:inline">For Owners</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFAQs.length > 0 ? (
                  filteredFAQs.map(faq => (
                    <AccordionItem
                      key={faq.id}
                      value={`item-${faq.id}`}
                      className="border rounded-lg p-1"
                    >
                      <AccordionTrigger className="px-4 py-2 text-left font-medium hover:no-underline data-[state=open]:text-primary">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 pt-1 text-gray-600 dark:text-gray-300">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      No matching questions found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                      We couldn't find any FAQs matching your search. Try a
                      different term or browse our categories.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setSearchQuery("")}
                      className="gap-2"
                    >
                      View All FAQs <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </Accordion>
            </TabsContent>

            {/* We're reusing the same component for all tabs since the filtering is done in the filterFAQs function */}
            <TabsContent value="booking" className="mt-0">
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFAQs.length > 0 ? (
                  filteredFAQs.map(faq => (
                    <AccordionItem
                      key={faq.id}
                      value={`item-${faq.id}`}
                      className="border rounded-lg p-1"
                    >
                      <AccordionTrigger className="px-4 py-2 text-left font-medium hover:no-underline data-[state=open]:text-primary">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 pt-1 text-gray-600 dark:text-gray-300">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      No booking questions found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                      We couldn't find any booking-related FAQs matching your
                      search.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setSearchQuery("")}
                      className="gap-2"
                    >
                      Clear Search <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </Accordion>
            </TabsContent>

            <TabsContent value="payment" className="mt-0">
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFAQs.length > 0 ? (
                  filteredFAQs.map(faq => (
                    <AccordionItem
                      key={faq.id}
                      value={`item-${faq.id}`}
                      className="border rounded-lg p-1"
                    >
                      <AccordionTrigger className="px-4 py-2 text-left font-medium hover:no-underline data-[state=open]:text-primary">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 pt-1 text-gray-600 dark:text-gray-300">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      No payment questions found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                      We couldn't find any payment-related FAQs matching your
                      search.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setSearchQuery("")}
                      className="gap-2"
                    >
                      Clear Search <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </Accordion>
            </TabsContent>

            <TabsContent value="account" className="mt-0">
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFAQs.length > 0 ? (
                  filteredFAQs.map(faq => (
                    <AccordionItem
                      key={faq.id}
                      value={`item-${faq.id}`}
                      className="border rounded-lg p-1"
                    >
                      <AccordionTrigger className="px-4 py-2 text-left font-medium hover:no-underline data-[state=open]:text-primary">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 pt-1 text-gray-600 dark:text-gray-300">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <UserCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      No account questions found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                      We couldn't find any account-related FAQs matching your
                      search.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setSearchQuery("")}
                      className="gap-2"
                    >
                      Clear Search <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </Accordion>
            </TabsContent>

            <TabsContent value="property" className="mt-0">
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFAQs.length > 0 ? (
                  filteredFAQs.map(faq => (
                    <AccordionItem
                      key={faq.id}
                      value={`item-${faq.id}`}
                      className="border rounded-lg p-1"
                    >
                      <AccordionTrigger className="px-4 py-2 text-left font-medium hover:no-underline data-[state=open]:text-primary">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 pt-1 text-gray-600 dark:text-gray-300">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      No property questions found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                      We couldn't find any property-related FAQs matching your
                      search.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setSearchQuery("")}
                      className="gap-2"
                    >
                      Clear Search <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </Accordion>
            </TabsContent>

            <TabsContent value="owners" className="mt-0">
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFAQs.length > 0 ? (
                  filteredFAQs.map(faq => (
                    <AccordionItem
                      key={faq.id}
                      value={`item-${faq.id}`}
                      className="border rounded-lg p-1"
                    >
                      <AccordionTrigger className="px-4 py-2 text-left font-medium hover:no-underline data-[state=open]:text-primary">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 pt-1 text-gray-600 dark:text-gray-300">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      No owner questions found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                      We couldn't find any owner-related FAQs matching your
                      search.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setSearchQuery("")}
                      className="gap-2"
                    >
                      Clear Search <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </Accordion>
            </TabsContent>
          </Tabs>
        </div>

        {/* Still Have Questions */}
        <div className="bg-gray-50 dark:bg-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Still Have Questions?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Contact our support team for personalized assistance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="rounded-full bg-primary/10 p-4 mb-4">
                    <Phone className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Call Us
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Speak directly with our customer support team
                  </p>
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => (window.location.href = "tel:+918001234567")}
                  >
                    +91 800 123 4567
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="rounded-full bg-primary/10 p-4 mb-4">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Email Us
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Send us a detailed message about your query
                  </p>
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() =>
                      (window.location.href = "mailto:support@stayease.com")
                    }
                  >
                    support@stayease.com
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="rounded-full bg-primary/10 p-4 mb-4">
                    <MessagesSquare className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Live Chat
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Chat with our support team in real-time
                  </p>
                  <Button
                    onClick={() => navigate("/contact")}
                    className="gap-2"
                  >
                    Start Chat
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Want to see our support team in person?
              </p>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => navigate("/contact")}
              >
                Visit Our Contact Page <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Subscription Alert */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3 flex-shrink-0">
                    <BellRing className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Stay Updated
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Subscribe to our newsletter for the latest updates on new
                      properties, offers, and PG living tips.
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="min-w-[240px]"
                  />
                  <Button>Subscribe</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default FAQ
