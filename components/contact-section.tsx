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

  // Form submit handler
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

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Server returned non-JSON response: ${await response.text()}`);
      }

      const data = await response.json();
      console.log("Response from server:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSubmitStatus({
        success: true,
        message: data.message || "Message sent successfully! I'll get back to you soon.",
      });

      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);

      const errorMessage =
        error instanceof Error
          ? error.message.includes("non-JSON response")
            ? "Server error. Please try again later or contact me directly at maigadrisking@gmail.com"
            : error.message
          : "Failed to send message. Please try again later.";

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
    <section
      id="contact"
      className="py-12 sm:py-16 lg:py-20 relative safe-area-inset"
    >
      {/* Code-like decorative elements */}
      <div className="absolute top-8 sm:top-12 left-4 sm:left-12 text-gray-200 dark:text-gray-800 text-opacity-20 dark:text-opacity-20 font-mono text-xs hidden sm:block">
        &lt;section id="contact"&gt;
      </div>
      <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-12 text-gray-200 dark:text-gray-800 text-opacity-20 dark:text-opacity-20 font-mono text-xs hidden sm:block">
        &lt;/section&gt;
      </div>

      {/* Decorative elements */}
      <div className="blur-circle blur-secondary w-64 h-64 sm:w-96 sm:h-96 top-1/4 -left-32 sm:-left-48 opacity-20 sm:opacity-30"></div>
      <div className="blur-circle blur-primary w-64 h-64 sm:w-96 sm:h-96 -bottom-32 sm:-bottom-48 right-1/4 opacity-20 sm:opacity-30"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-8 sm:mb-12 text-center"
        >
          <span className="px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-medium">
            &lt;get_in_touch /&gt;
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">
            Contact Me
          </h2>
          <p className="max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Have a project in mind or want to discuss opportunities? I'm just a message away.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">
          {/* Contact information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-2"
          >
            <div className="card p-4 sm:p-6 h-full flex flex-col">
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center">
                <span className="text-blue-500 dark:text-blue-400 mr-1 sm:mr-2 text-base sm:text-lg">
                  &lt;
                </span>
                Contact Information
                <span className="text-blue-500 dark:text-blue-400 ml-1 sm:ml-2 text-base sm:text-lg">
                  /&gt;
                </span>
              </h3>

              <ul className="space-y-4 sm:space-y-6 mb-6 sm:mb-8 flex-1 text-sm sm:text-base">
                <li className="flex">
                  <div className="mr-3 sm:mr-4 p-2 sm:p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <FiMail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="block text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Email
                    </span>
                    <div className="flex items-center justify-between">
                      <a
                        href="mailto:maigadrisking@gmail.com"
                        className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors touch-friendly"
                      >
                        maigadrisking@gmail.com
                      </a>
                      <button
                        onClick={copyEmail}
                        className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 p-1 rounded-md transition-colors touch-friendly"
                        aria-label="Copy email"
                      >
                        {showCopied ? (
                          <FiCheckCircle className="text-green-500 w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <FiClipboard className="w-4 h-4 sm:w-5 sm:h-5" />
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
                  <div className="mr-3 sm:mr-4 p-2 sm:p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <FiMapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="block text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Location
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      Budapest, Hungary
                    </span>
                  </div>
                </li>

                <li className="flex">
                  <div className="mr-3 sm:mr-4 p-2 sm:p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <FiPhone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="block text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Phone
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      +36 301 377 080
                    </span>
                  </div>
                </li>
              </ul>

              <div>
                <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                  Connect With Me
                </h4>
                <div className="flex space-x-3 sm:space-x-4">
                  <a
                    href="https://github.com/IdrissaMaiga"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 sm:p-3 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 transition-colors touch-friendly"
                    aria-label="GitHub"
                  >
                    <FiGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/idrissa-maiga-16581b245/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 sm:p-3 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 transition-colors touch-friendly"
                    aria-label="LinkedIn"
                  >
                    <FiLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a
                    href="mailto:maigadrisking@gmail.com"
                    className="p-2 sm:p-3 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 transition-colors touch-friendly"
                    aria-label="Email"
                  >
                    <FiMail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-3"
          >
            <div className="card p-4 sm:p-6 h-full relative overflow-hidden">
              {/* Code-like decorative elements */}
              <div className="absolute top-1 sm:top-2 right-4 sm:right-6 text-gray-300 dark:text-gray-700 font-mono text-xs">
                {"function sendMessage() {"}
              </div>
              <div className="absolute bottom-1 sm:bottom-2 right-4 sm:right-6 text-gray-300 dark:text-gray-700 font-mono text-xs">
                {"}"}
              </div>

              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center">
                <span className="text-blue-500 dark:text-blue-400 mr-1 sm:mr-2 text-base sm:text-lg">
                  &lt;
                </span>
                Send a Message
                <span className="text-blue-500 dark:text-blue-400 ml-1 sm:ml-2 text-base sm:text-lg">
                  /&gt;
                </span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2"
                    >
                      <span className="flex items-center">
                        <FiUser className="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />{" "}
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
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors font-mono text-sm sm:text-base touch-friendly"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2"
                    >
                      <span className="flex items-center">
                        <FiMail className="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />{" "}
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
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors font-mono text-sm sm:text-base touch-friendly"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2"
                  >
                    <span className="flex items-center">
                      <span className="font-mono text-blue-500 dark:text-blue-400 mr-1 sm:mr-2">
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
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors font-mono text-sm sm:text-base touch-friendly"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2"
                  >
                    <span className="flex items-center">
                      <FiMessageSquare className="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />{" "}
                      <span className="font-mono">
                        message<span className="text-red-500">*</span>:
                      </span>
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute top-0 left-0 p-2 sm:p-3 font-mono text-gray-400 text-xs">
                      {"/*"}
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors resize-none font-mono pl-12 sm:pl-16 pt-8 sm:pt-10 text-sm sm:text-base touch-friendly"
                      placeholder="Hello Idrissa, I'd like to discuss..."
                      required
                    />
                    <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 font-mono text-gray-400 text-xs">
                      {"*/"}
                    </div>
                  </div>
                </div>

                {submitStatus && (
                  <div
                    className={`p-3 sm:p-4 rounded-lg text-xs sm:text-sm flex items-start ${
                      submitStatus.success
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {submitStatus.success ? (
                      <FiCheckCircle className="mr-1 sm:mr-2 mt-0.5 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <FiAlertCircle className="mr-1 sm:mr-2 mt-0.5 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                    <span className="font-mono">{submitStatus.message}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="btn btn-primary w-full sm:w-auto flex justify-center items-center px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base touch-friendly"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <FiLoader className="animate-spin mr-1 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="font-mono">Processing...</span>
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <FiSend className="mr-1 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5" />{" "}
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