"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Share2, Facebook } from "lucide-react";
import { useState, useEffect } from "react";
import { getContactInfo, type ContactInfo } from "@/lib/contact";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";

export default function Contact() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: "",
    phone: "",
    address: "",
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getContactInfo().then((info) => {
      if (info.email || info.phone || info.address) {
        setContactInfo(info);
      }
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        toast.success("Message sent successfully!");
        setFormData({ fullName: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      question: "How do I enroll my child in your programs?",
      answer:
        'You can start the enrollment process by clicking the "Get Started" button in the navigation or visiting our office in Lagos. We will conduct a brief assessment to understand your child\'s needs and place them in the appropriate program.',
    },
    {
      question: "What safety protocols are in place for the children?",
      answer:
        "We maintain strict safety protocols including background checks for all staff, secure facility access, regular supervision, and emergency procedures. Parent communication is maintained throughout all programs.",
    },
    {
      question: "How can I see the impact of my donations?",
      answer:
        "We provide regular impact reports and testimonials from participants. You can visit our gallery page to see photos from our programs and community events. We also offer periodic open house events for donors.",
    },
    {
      question: "Are your programs free of charge?",
      answer:
        "Our core mentorship and discipleship programs are available on a sliding scale basis to ensure accessibility. We partner with sponsors to provide scholarships for families in need.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-[url(/imgs/asset-13.jpeg)] bg-position-[center_-15rem] bg-cover bg-no-repeat py-20 md:py-32 rounded-none">
        <div className="max-w-7xl mx-auto px-6 text-center text-white relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Get in Touch with Us
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Whether you have a question about our programs or need support, we
            are here to help.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <Mail className="text-blue-600" size={24} />
                <h2 className="text-3xl font-bold text-gray-900">
                  Send us a Message
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                    required
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-semibold disabled:opacity-70"
                >
                  {isSubmitting
                    ? "Sending..."
                    : submitted
                      ? "Message Sent!"
                      : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Direct Contact
              </h2>

              <div className="space-y-6">
                <Card className="bg-blue-50 border-0">
                  <CardContent className="pt-6 flex items-center gap-4">
                    <Mail className="text-blue-600 shrink-0" size={24} />
                    <div>
                      <p className="text-sm text-gray-600 uppercase font-semibold">
                        Email us
                      </p>
                      <p className="text-gray-900 font-semibold">
                        {contactInfo.email}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 border-0">
                  <CardContent className="pt-6 flex items-center gap-4">
                    <Phone className="text-blue-600 shrink-0" size={24} />
                    <div>
                      <p className="text-sm text-gray-600 uppercase font-semibold">
                        Call us
                      </p>
                      <p className="text-gray-900 font-semibold">
                        {contactInfo.phone}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 border-0">
                  <CardContent className="pt-6 flex items-center gap-4">
                    <MapPin className="text-blue-600 shrink-0" size={24} />
                    <div>
                      <p className="text-sm text-gray-600 uppercase font-semibold">
                        Visit us
                      </p>
                      <p className="text-gray-900 font-semibold">
                        {contactInfo.address}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media */}
                <div className="pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 uppercase font-semibold mb-4">
                    Follow our journey
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.origin);
                        toast.success("Website link copied to clipboard!");
                      }}
                      className="text-blue-600 hover:text-blue-700 bg-blue-100 hover:bg-blue-50 transition-colors flex items-center gap-2 p-2 rounded-full"
                    >
                      <Share2 size={24} />
                      <p>share</p>
                    </button>
                    {/* <a
                      href="#"
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <Facebook size={24} />
                    </a>
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <Mail size={24} />
                    </a> */}
                  </div>
                </div>
              </div>

              {/* Team Photo */}
              {/* <div className="mt-8 rounded-2xl overflow-hidden h-48 bg-gray-200">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/contact-us-page-ZzO6u49wQf0mF8h9xZt6IRmTfARhx0.png"
                  alt="Team"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-600 mt-4 text-center">Lagos, Nigeria</p> */}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Find quick answers to common questions for parents and guardians.
          </p>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="border border-gray-200 rounded-lg px-6"
              >
                <AccordionTrigger className="text-gray-900 font-semibold hover:text-blue-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  );
}
