"use client";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout_session", {
      method: "POST",
      headers: {
        origin: "http://localhost:3000",
      },
    });

    const checkoutSessionJson = await checkoutSession.json();

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#F5E4EB] to-[#FAD2DF]">
      <Head>
        <title>FlashForge Pro</title>
        <meta name="description" content="Craft Flashcards With Ease"></meta>
      </Head>

      <main className="container mx-auto px-4 pt-20">
      <motion.section
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="text-center my-20"
>
  <h1
    className="text-4xl md:text-6xl font-bold text-[#6A1B4D] mb-6"
    style={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 0.3)" }}
  >
    Welcome to FlashForge Pro
  </h1>
  <Typography
    variant="h5"
    sx={{
      fontSize: { xs: "1.25rem", md: "1.5rem" }, // Adjust font size for mobile
      color: "#8d3a6e",
      fontWeight: "600",
      textShadow: "1px 1px 8px rgba(0, 0, 0, 0.3)",
      mb: 5,
    }}
  >
    Your Ultimate AI-Powered Flashcard Companion
  </Typography>
  <SignedOut>
    <motion.a
      href="/sign-up"
      className="bg-[#7e285e] hover:bg-[#68234e] text-white font-bold py-3 px-8 md:py-4 md:px-10 rounded-full text-lg md:text-xl transition duration-300 ease-in-out transform hover:scale-105 inline-block"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Create flashcards for free
    </motion.a>
  </SignedOut>
  <SignedIn>
    <motion.a
      href="/generate"
      className="bg-[#7e285e] hover:bg-[#68234e] text-white font-bold py-3 px-8 md:py-4 md:px-10 rounded-full text-lg md:text-xl transition duration-300 ease-in-out transform hover:scale-105 inline-block"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Create flashcards for free
    </motion.a>
  </SignedIn>
</motion.section>

        <section className="my-32">
          <h1 className="text-4xl font-bold text-center text-[#6A1B4D]  mb-16">
            Key Features
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              {
                title: " AI-Generated Flashcards",
                description:
                  " Instantly create personalized flashcards based on the topics you provide. Our AI ensures each card is relevant and tailored to your learning needs.",
                icon: "📝",
              },
              {
                title: "Interactive Learning Experience",
                description:
                  " Engage with flashcards through quizzes and adaptive learning techniques that test your knowledge and reinforce key concepts.",
                icon: "🧠",
              },
              {
                title: "Customizable Study Sessions",
                description:
                  " Set your own study pace with customizable session lengths, difficulty levels, and learning goals. Track your progress and adjust as needed.",
                icon: "⚙️",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 ease-in-out"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-[#6A1B4D] mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="my-32 relative">
          <div className="absolute inset-0 bg-[#6A1B4D] transform -skew-y-6 z-0"></div>
          <div className="relative z-10 py-20">
            <h2 className="text-4xl font-bold text-center text-white mb-16">
              How It Works
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12">
              {[
                { step: "1", text: "Input your study material" },
                { step: "2", text: "AI generates flashcards" },
                { step: "3", text: "Review and learn" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-3xl font-bold text-[#6A1B4D] mb-4">
                    {item.step}
                  </div>
                  <p className="text-white text-xl">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="my-32">
          <h1 className="text-4xl font-bold text-center text-[#6A1B4D]  mb-16">
            Pricing
          </h1>
          <div className="flex flex-col lg:flex-row justify-center gap-4">
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-[#F2DCE2] p-10 rounded-2xl shadow-2xl hover:shadow-3xl transition duration-300 ease-in-out border border-[#6A1B4D]">
                <h3 className="text-3xl font-bold text-[#6A1B4D] mb-3 text-center">
                  Basic
                </h3>
                <p className="text-2xl font-semibold text-[#6A1B4D] mb-6 text-center">
                  $0.00 / Month
                </p>

                <p className="text-[#6A1B4D] mb-4">
                  <span className="text-[#6A1B4D] mr-2">&#10003;</span> Create
                  Limited Flashcards
                </p>
                <p className="text-[#6A1B4D] mb-4">
                  <span className="text-[#6A1B4D] mr-2">&#10003;</span> Basic
                  Storage Access
                </p>
                <p className="text-[#6A1B4D] mb-4">
                  <span className="text-[#6A1B4D] mr-2">&#10003;</span> Single
                  Device Access
                </p>
                <p className="text-[#6A1B4D] mb-8">
                  <span className="text-[#6A1B4D] mr-2">&#10003;</span> Basic
                  Analytics
                </p>
                <motion.button
                  className= "w-full bg-[#7e285e] hover:bg-[#68234e] text-[13px] md:text-lg text-white font-bold py-3 px-8 md:py-4 md:px-10 rounded-full transition duration-300 ease-in-out transform hover:scale-105 inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {" "}
                  <motion.a href="/generate">
                    Create Flashcards for Free
                  </motion.a>
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-[#F2DCE2] p-10 rounded-2xl shadow-2xl hover:shadow-3xl transition duration-300 ease-in-out border border-[#6A1B4D]">
                <h3 className="text-3xl font-bold text-[#6A1B4D] mb-3 text-center">
                  Premium
                </h3>
                <p className="text-2xl font-semibold text-[#6A1B4D] mb-6 text-center">
                  $05.00 / Month
                </p>

                <p className="text-[#6A1B4D] mb-4">
                  <span className="text-[#6A1B4D] mr-2">&#10003;</span> Create
                  Unlimited Flashcards
                </p>
                <p className="text-[#6A1B4D] mb-4">
                  <span className="text-[#6A1B4D] mr-2">&#10003;</span>{" "}
                  Unlimited Storage Access
                </p>
                <p className="text-[#6A1B4D] mb-4">
                  <span className="text-[#6A1B4D] mr-2">&#10003;</span> Multi
                  Device Access
                </p>
                <p className="text-[#6A1B4D] mb-8">
                  <span className="text-[#6A1B4D] mr-2">&#10003;</span> Advanced
                  Analytics
                </p>
                <motion.button
                  onClick={handleSubmit}
                  className="w-full bg-[#7e285e] hover:bg-[#68234e] text-[13px] md:text-lg text-white font-bold py-3 px-8 md:py-4 md:px-10 rounded-full transition duration-300 ease-in-out transform hover:scale-105 inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Choose Premium Plan
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="bg-[#6A1B4D] text-white py-6 mt-16">
  <div className="container mx-auto px-4 text-center">
    <div className="flex flex-col md:flex-row justify-center items-center md:justify-between">
      <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} FlashForge Pro. All rights reserved.</p>
      <div className="flex space-x-6">
        <a
          href="https://www.linkedin.com/in/maheeenasad/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-[#FAD2DF] transition duration-300 p-2 rounded-full bg-white"
        >
          <Linkedin className="w-6 h-6 text-[#6A1B4D]" />
        </a>
        <a
          href="https://github.com/Maheeenasad"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-[#FAD2DF] transition duration-300 p-2 rounded-full bg-white"
        >
          <Github className="w-6 h-6 text-[#6A1B4D]" />
        </a>
        <a
          href="mailto:maheenasad19@gmail.com"
          className="hover:bg-[#FAD2DF] transition duration-300 p-2 rounded-full bg-white"
        >
          <Mail className="w-6 h-6 text-[#6A1B4D]" />
        </a>
      </div>
    </div>
  </div>
</footer>


    </div>
  );
}