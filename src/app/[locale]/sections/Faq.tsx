/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from 'react';

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How to become a cleaner in Theo?",
      answer: "You can become a cleaner by signing up on our website and completing the application process. Once your application is approved, you will be able to start serving as a cleaner.",
    },
    {
      question: "Is there a fee to become a cleaner?",
      answer: "There is no fee to become a cleaner in Theo. However, you will need to pay a small fee for background checks and other associated costs.",
    },
    {
      question: "How do I apply to become a cleaner?",
      answer: "To apply to become a cleaner, you will need to register on our website and complete the application process. Once your application is submitted, one of our staff members will review it and let you know if it has been approved.",
    },
    {
      question: "Can I customize the cleaner profile?",
      answer: "Yes, you can customize your cleaner profile on our website. You can update your profile picture, add a bio, and specify your cleaning services and experience.",
    },
  ];
  return (
    <>
      <div className="max-w-6xl py-16 mx-auto flex flex-col items-center justify-center px-4 md:px-0">
        <p className="text-indigo-600 text-sm font-medium">FAQ&apos;s</p>
        <h1 className="text-3xl font-semibold text-center">Looking for answer?</h1>
        <p className="text-sm text-slate-500 mt-2 pb-8 text-center">
          Find answers to common questions about our services, pricing, and more.
        </p>
        {faqs.map((faq, index: any) => (
          <div className="border-b border-slate-200 py-4 cursor-pointer w-full" key={index} onClick={() => setOpenIndex(openIndex === index ? null : index)}>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium">
                {faq.question}
              </h3>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${openIndex === index ? "rotate-180" : ""} transition-all duration-500 ease-in-out`}>
                <path d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2" stroke="#1D293D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className={`text-sm text-slate-500 transition-all duration-500 ease-in-out max-w-md ${openIndex === index ? "opacity-100 max-h-75 translate-y-0 pt-4" : "opacity-0 max-h-0 -translate-y-2"}`} >
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Faq;