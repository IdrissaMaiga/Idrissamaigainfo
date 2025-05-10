"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
  FiGithub,
  FiLinkedin,
  FiUser,
  FiMessageSquare,
  FiAlertCircle,
  FiCheckCircle,
  FiClipboard,
  FiLoader,
} from "react-icons/fi";

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);
  const [showCopied, setShowCopied] = useState(false);

  // Form change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  // Form submit handler with improved error handling for HTML responses
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formState.name || !formState.email || !formState.message) {
      setSubmitStatus({
        success: false,
        message: "Please fill in all required fields.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      console.log("Submitting form data:", formState);

      // API call to our backend endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      // Check for non-JSON responses (like HTML error pages)
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Server returned non-JSON response: ${await response.text()}`);
      }

      // Parse the response data
      const data = await response.json();
      console.log("Response from server:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      // Success
      setSubmitStatus({
        success: true,
        message: data.message || "Message sent successfully! I'll get back to you soon.",
      });

      // Reset form
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);

      // Check if the error is due to a non-JSON response
      const errorMessage =
        error instanceof Error
          ? error.message.includes("non-JSON response")
            ? "Server error. Please try again later or contact me directly at maigadrisking@gmail.com"
            : error.message
          : "Failed to send message. Please try again later.";

      // Error
      setSubmitStatus({
        success: false,
        message: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Copy email to clipboard
  const copyEmail = () => {
    navigator.clipboard.writeText("maigadrisking@gmail.com");
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 relative">
      {/* Code-like decorative elements */}
      <div className="absolute top-12 left-4 md:left-12 text-gray-200 dark:text-gray-800 text-opacity-20 dark:text-opacity-20 font-mono text-xs md:text-sm hidden md:block">
        &lt;section id=&quot;contact&quot;&gt;
      </div>
      <div className="absolute bottom-8 left-4 md:left-12 text-gray-200 dark:text-gray-800 text-opacity-20 dark:text-opacity-20 font-mono text-xs md:text-sm hidden md:block">
        &lt;/section&gt;
      </div>

      {/* Decorative elements */}
      <div className="blur-circle blur-secondary w-96 h-96 top-1/4 -left-48 opacity-30"></div>
      <div className="blur-circle blur-primary w-96 h-96 -bottom-48 right-1/4 opacity-30"></div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <span className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
            &lt;get_in_touch /&gt;
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">Contact Me</h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            Have a project in mind or want to discuss opportunities? I&apos;m just a message away.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-2"
          >
            <div className="card p-6 h-full flex flex-col">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <span className="text-blue-500 dark:text-blue-400 mr-2">&lt;</span>
                Contact Information
                <span className="text-blue-500 dark:text-blue-400 ml-2">/&gt;</span>
              </h3>

              <ul className="space-y-6 mb-8 flex-1">
                <li className="flex">
                  <div className="mr-4 p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Email
                    </span>
                    <div className="flex items-center justify-between">
                      <a
                        href="mailto:maigadrisking@gmail.com"
                        className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        maigadrisking@gmail.com
                      </a>
                      <button
                        onClick={copyEmail}
                        className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 p-1 rounded-md transition-colors"
                        aria-label="Copy email"
                      >
                        {showCopied ? (
                          <FiCheckCircle className="text-green-500" />
                        ) : (
                          <FiClipboard />
                        )}
                      </button>
                    </div>
                    {showCopied && (
                      <span className="text-xs text-green-600 dark:text-green-400 mt-1">
                        Copied to clipboard!
                      </span>
                    )}
                  </div>
                </li>

                <li className="flex">
                  <div className="mr-4 p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <FiMapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Location
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      Budapest, Hungary
                    </span>
                  </div>
                </li>

                <li className="flex">
                  <div className="mr-4 p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <FiPhone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Available For
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-blue-600 dark:text-blue-400">
                        freelance
                      </code>{" "}
                      and{" "}
                      <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-green-600 dark:text-green-400">
                        full-time
                      </code>{" "}
                      opportunities
                    </span>
                  </div>
                </li>
              </ul>

              <div>
                <h4 className="text-lg font-semibold mb-4">Connect With Me</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/IdrissaMaiga"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 transition-colors"
                    aria-label="GitHub"
                  >
                    <FiGithub className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/idrissa-maiga-16581b245/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <FiLinkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="mailto:maigadrisking@gmail.com"
                    className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 transition-colors"
                    aria-label="Email"
                  >
                    <FiMail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-3"
          >
            <div className="card p-6 h-full relative overflow-hidden">
              {/* Code-like decorative elements */}
              <div className="absolute top-2 right-6 text-gray-300 dark:text-gray-700 font-mono text-xs">
                {"function sendMessage() {"}
              </div>
              <div className="absolute bottom-2 right-6 text-gray-300 dark:text-gray-700 font-mono text-xs">
                {"}"}
              </div>

              <h3 className="text-xl font-bold mb-6 flex items-center">
                <span className="text-blue-500 dark:text-blue-400 mr-2">&lt;</span>
                Send a Message
                <span className="text-blue-500 dark:text-blue-400 ml-2">/&gt;</span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      <span className="flex items-center">
                        <FiUser className="mr-2" />{" "}
                        <span className="font-mono">
                          name<span className="text-red-500">*</span>:
                        </span>
                      </span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors font-mono"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      <span className="flex items-center">
                        <FiMail className="mr-2" />{" "}
                        <span className="font-mono">
                          email<span className="text-red-500">*</span>:
                        </span>
                      </span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors font-mono"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    <span className="flex items-center">
                      <span className="font-mono text-blue-500 dark:text-blue-400 mr-2">
                        const
                      </span>{" "}
                      <span className="font-mono">subject:</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors font-mono"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    <span className="flex items-center">
                      <FiMessageSquare className="mr-2" />{" "}
                      <span className="font-mono">
                        message<span className="text-red-500">*</span>:
                      </span>
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute top-0 left-0 p-3 font-mono text-gray-400 text-xs">
                      {"/*"}
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors resize-none font-mono pl-16 pt-10"
                      placeholder="Hello Idrissa, I'd like to discuss..."
                      required
                    />
                    <div className="absolute bottom-3 right-3 font-mono text-gray-400 text-xs">
                      {"*/"}
                    </div>
                  </div>
                </div>

                {submitStatus && (
                  <div
                    className={`p-4 rounded-lg text-sm flex items-start ${
                      submitStatus.success
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {submitStatus.success ? (
                      <FiCheckCircle className="mr-2 mt-0.5 flex-shrink-0" />
                    ) : (
                      <FiAlertCircle className="mr-2 mt-0.5 flex-shrink-0" />
                    )}
                    <span className="font-mono">{submitStatus.message}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="btn btn-primary w-full sm:w-auto flex justify-center items-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <FiLoader className="animate-spin mr-2" />
                        <span className="font-mono">Processing...</span>
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <FiSend className="mr-2" />{" "}
                        <span className="font-mono">sendMessage()</span>
                      </span>
                    )}
                  </button>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                    <span className="text-red-500">*</span> required fields
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}