import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // handle submit logic
    console.log("Form submitted :", formData);
    setFormData({
      fullName: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="w-full px-12 bg-green-50 py-12 pt-8">
      <Link
        to="/"
        className="inline-flex pb-6 items-center gap-2 text-sm text-gray-600 hover:text-emerald-600"
      >
        <ArrowLeft size={16} /> Back to listings
      </Link>
      <div className="mx-auto max-w-3xl px-4">
        <Card className="shadow-lg border-muted">
          <CardHeader>
            <CardTitle className="text-2xl text-green-900 font-bold text-center">
              Contact Us
            </CardTitle>
            <p className="text-center text-sm text-muted-foreground">
              We’d love to hear from you. Please fill out this form.
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="fullName"
                  onChange={(e) => handleChange(e)}
                  value={formData.fullName}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  onChange={(e) => handleChange(e)}
                  type="email"
                  value={formData.email}
                  placeholder="you@example.com"
                  required
                  name="email"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleChange(e)}
                  id="message"
                  placeholder="Write your message here..."
                  rows={5}
                  required
                  name="message"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="bg-green-700 hover:bg-green-600 w-full"
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
