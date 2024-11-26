"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, CheckCircle, Clock, Users, Star } from 'lucide-react'
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import swal from "sweetalert"; // Import SweetAlert
const images = [
  "/images/LandingPage/1M.webp",
  "/images/LandingPage/2M.webp",
  "/images/LandingPage/3M.webp",
  // Add more images as needed
];
import TestimonialCarousel from "../../Testimonial";
import ic from "ic0";
const ledger = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai");

export default function Component() {
  const [openIndex, setOpenIndex] = useState(null);
  const [email, setEmail] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const generateRandomCode = () => {
    return Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit number
  };
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };
  const steps = [
    {
      name: "Expert Team",
      description:
        "Lawyers and technology experts passionate about legal innovation.",
      icon: (
        <Users />
      ),
    },
    {
      name: "Learning Community",
      description:
        "Connect with professionals, students, and enthusiasts of digital law.",
      icon: (
        <svg
          className="w-8 h-8 text-white-700"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
    },
    {
      name: "Commitment to Excellence",
      description:
        "We offer high-quality training tailored to the needs of the market.",
      icon: (
        <Star />
      ),
    },
  ];
  const roadmapItems = [
    { date: 'Course 1', title: 'Introduction to Digital Law', description: 'Community Building', status: 'completed' },
    { date: 'Course 2', title: 'Personal Data Protection', description: 'Laying the foundation', status: 'completed' },
    { date: 'Course 3', title: 'Contracts in the Digital Environment', description: 'Taggr, DSCVR, start to release the Dapp & NFTs', status: 'inProgress' },
    { date: 'Course 4', title: 'Digital Intellectual Property Law', description: 'Get your ICP Protector merch', status: 'upcoming' },
    { date: 'Course 5', title: 'Cryptocurrencies and Fintech', description: 'A super helpful & cool feature', status: 'upcoming' },
  ];
  const benefits = [
    {
      id: 1,
      title: "Flexibility",
      description: "Study at your own pace and from anywhere.",
    },
    {
      id: 2,
      title: "Expert Professors",
      description: "Learn from the best professionals in the field.",
    },
    {
      id: 3,
      title: "Networking",
      description: "Connect with a community of professionals and enthusiasts.",
    },
    {
      id: 4,
      title: "Continuous Updates",
      description: "Stay at the forefront of legal technological innovation.",
    },
  ];
  const faqs = [
    {
      question: "Why invest in real estate with Codeta?",
      answer: `
        Codeta provides accessible real estate investments starting from just 1 square meter.
        Our unique model allows investors to benefit from stable and appreciating assets with annual returns
        of 9% for property appreciation and 7.5% for rental income.`,
    },
    {
      question: "What services does Codeta offer?",
      answer: `
        We manage the identification, acquisition, and development of high-potential properties. Our services
        also include financial management, ensuring our investors get maximum returns while minimizing risks.`,
    },
    {
      question: "How does Codeta ensure transparency?",
      answer: `
        Through our app, investors have access to real-time updates on their investment status, returns,
        and other key metrics, ensuring a transparent and fluid communication experience.`,
    },
    {
      question: "What are the benefits of real estate investment in Mexico?",
      answer: `
        The Mexican real estate market has shown steady growth, with projected increases of up to 8% by 2030.
        Investing with Codeta allows you to benefit from this stable, appreciating market with protections against inflation.`,
    },
  ];

  const featuredSnippets = [
    {
      title: "React Hooks Collection",
      description: "A set of custom React hooks for common use cases",
      language: "JavaScript",
      price: 0.5,
    },
    {
      title: "Python Data Structures",
      description: "Efficient implementations of various data structures",
      language: "Python",
      price: 0.75,
    },
    {
      title: "Vue.js State Management",
      description: "A lightweight state management solution for Vue.js",
      language: "JavaScript",
      price: 0.6,
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true); // Start loader

    try {
      const randomCode = generateRandomCode(); // Generate random 4-digit code
      const response = await ledger.call(
        "createContact",
        "",
        randomCode.toString(),
        formData.name,
        formData.email,
        formData.message,
        formData.title
      );
      console.log("contact Response:", response);
      if (response) {
        swal(
          "Success!",
          "Your form has been submitted successfully.",
          "success"
        );
        // Clear form fields after the alert
        setFormData({
          name: "",
          email: "",
          title: "",
          message: "",
        });
      }
    } catch (e) {
      console.log("Error making contact:", e);
    } finally {
      setLoading(false); // Stop loader
      console.log("Contact form finished");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup logic here
    console.log("Signed up with email:", email);
    setEmail("");
  };

  return (
    <main className="isolate">
      {/* Hero section */}
      <div className="relative pt-14">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="py-24 sm:py-32 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mx-auto max-w-5xl text-center"
            >
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Techno-Legal Awareness with CODETA
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Your Bridge to the Future of Law. Get Ready for Change!
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/market"
                  className="rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-transform"
                >
                  Explore Our Programs
                </motion.a>
                <Link
                  to="/aboutus"
                  className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition-colors"
                >
                  Learn More <span aria-hidden="true">→</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* How It Works section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-gradient-to-b from-white to-gray-50 py-24 sm:py-32"
        id="how-it-works"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold text-indigo-600 uppercase tracking-wider">
              LEARN WITH US
            </h2>
            <p className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Who Are We?
            </p>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Start your journey into the world of digital law and innovation with Codeta. Follow these simple steps to explore a high-demand, future-ready field.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                className="flex flex-col items-center text-center p-8 bg-white shadow-xl rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md mb-4 transform transition-transform duration-300 hover:rotate-12 hover:scale-110">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-300 hover:text-indigo-600">
                  {step.name}
                </h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      {/* Featured Snippets section */}


      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-gradient-to-br from-blue-50 to-indigo-100"
        id="features"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-xl font-bold text-indigo-600 tracking-wide uppercase">
              Discover Codeta
            </h2>
            <p className="mt-4 text-5xl font-extrabold text-gray-900 leading-tight">
              Why Is It Important to Learn About Techno-Legal Topics?
            </p>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              Discover how the intersection of technology and law shapes the future. Embrace the skills needed to navigate legal challenges in the digital age, unlock career opportunities, and stay ahead in an ever-evolving landscape.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-stretch justify-center gap-8">
            {[
              {
                title: "Digital Law in Evolution",
                content:
                  "Digital technologies are transforming the legal landscape at an accelerated pace.",
                gradient: "from-green-400 to-blue-500",
              },
              {
                title: "Career Opportunities",
                content:
                  "Professionals with techno-legal knowledge are in high demand.",
                gradient: "from-purple-400 to-indigo-600",
              },
              {
                title: "Understanding the Legal Impact",
                content:
                  "Navigate the challenges and opportunities of the digital world with confidence.",
                gradient: "from-yellow-400 to-red-500",
              },
              {
                title: "Stay at the Vanguard",
                content:
                  "Adapt to technological innovation and its legal implications.",
                gradient: "from-blue-400 to-indigo-500",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                className={`flex flex-col items-center p-8 text-center rounded-xl shadow-lg transform transition-transform hover:scale-105 bg-gradient-to-r ${item.gradient}`}
              >
                {/* <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md">
                  {item.icon}
                </div> */}
                <h3 className="text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-white leading-relaxed">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      <main className="container mx-auto px-4 py-16 relative z-10 mt-28 md:-mt-32">
        <motion.div
          className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold mb-6 text-blue-700 mt-10">
              Our Training Programs
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Empowering professionals with the knowledge to navigate the intersection of law and technology.
            </p>
          </div>

          {/* Process Steps */}
          <motion.div
            className="grid sm:grid-cols-2 md:grid-cols-2 gap-10 px-40 mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
          >
            {[
              {
                icon: "⚖️",
                title: "Advanced Digital Law",
                description:
                  "Delve into the legal framework of technology and cyberspace.",
              },
              {
                icon: "🛡️",
                title: "Compliance and Cybersecurity",
                description:
                  "Protect your organization from cyber and legal risks.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out"
              >
                <div className="text-3xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="grid sm:grid-cols-2 md:grid-cols-2 gap-10 px-40"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
          >
            {[

              {
                icon: "🤖",
                title: "Artificial Intelligence and Law",
                description:
                  "Understand the impact of AI on the legal system and its applications.",
              },
              {
                icon: "⛓️",
                title: "Blockchain and Smart Contracts",
                description:
                  "Explore new disruptive technologies and their legal implications.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </main>

      <div className="overflow-hidden py-12 sm:py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-95">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <section className="py-6">
            <div className="container mx-auto px-4">
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-white dark:bg-orange-700"></div>
                <div className="space-y-12">
                  {roadmapItems.map((item, index) => (
                    <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                          <h3 className="text-2xl font-semibold mb-2 text-blue-700 dark:text-orange-400">{item.title}</h3>

                        </div>
                      </div>
                      <div className="w-8 h-8 absolute left-1/2 transform -translate-x-1/2 -translate-y-4 flex items-center justify-center">
                        <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8 text-right'}`}>
                        <div className="text-xl font-semibold text-white">{item.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* FAQ section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        id="faq"
        className="mx-auto my-32 max-w-7xl px-6 lg:px-8 py-16 bg-indigo-200  rounded-lg shadow-xl"
      >
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold leading-10 tracking-tight text-black text-center mb-12">
            Benefits of studying with CODETA
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.id} className="flex items-start gap-6">
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-20 bg-[#E6E6FA] flex items-center justify-center clip-path-chevron">
                    <span className="text-2xl font-bold">{benefit.id}</span>
                  </div>
                </div>
                <div className="pt-2">
                  <h2 className="text-xl md:text-2xl font-semibold mb-2">
                    {benefit.title}
                  </h2>
                  <p className="text-gray-600 text-lg">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      <TestimonialCarousel />
    </main>
  );
}
