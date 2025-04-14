import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    toast.success("Message sent successfully!");
    reset();
  };

  return (
    <section className="container mx-auto py-12 px-4">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Contact Info */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            Have questions, feedback, or just want to say hello? Fill out the
            form, and we’ll get back to you shortly!
          </p>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-gray-700">contact@pgfinder.com</p>
            </div>
            <div>
              <p className="font-semibold">Phone</p>
              <p className="text-gray-700">+91 98765 43210</p>
            </div>
            <div>
              <p className="font-semibold">Address</p>
              <p className="text-gray-700">
                123 PG Lane, Hostel Street, Bengaluru, India
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Input placeholder="Your Name" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Input placeholder="Email Address" {...register("email")} />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Textarea
              placeholder="Your Message"
              rows={5}
              {...register("message")}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
}
