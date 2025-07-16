"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "@/components/logo";

const DisclaimerPage = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.3 },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white shadow-sm border-b"
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href="/"
              className="flex items-center text-blue-900 hover:text-blue-700"
            >
              <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold text-sm mr-2">
                <Logo className="w-6 h-6" />
              </div>
              <span className="text-lg font-semibold">NyayaMitra</span>
            </Link>
          </motion.div>
        </div>
      </motion.header>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-4 py-12"
      >
        <div className="prose prose-blue max-w-none">
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold text-blue-900 mb-8"
          >
            Legal Disclaimer
          </motion.h1>

          <motion.p variants={itemVariants} className="text-gray-600 mb-8">
            <strong>Last updated:</strong>{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </motion.p>

          <div className="space-y-8">
            <motion.section
              variants={sectionVariants}
              className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg"
            >
              <h2 className="text-xl font-semibold text-orange-900 mb-3">
                ⚠️ Important Notice
              </h2>
              <p className="text-orange-800 font-medium">
                NyayaMitra is an AI-powered legal information platform and NOT a
                substitute for professional legal advice. Always consult with a
                qualified attorney for specific legal matters.
              </p>
            </motion.section>

            {[
              {
                title: "1. Nature of Information Provided",
                content: (
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      NyayaMitra provides general legal information and
                      educational content about Indian laws. The information
                      provided through our platform:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>
                        <strong>Is for informational purposes only</strong> and
                        does not constitute legal advice
                      </li>
                      <li>
                        <strong>
                          Is not tailored to your specific situation
                        </strong>{" "}
                        or jurisdiction
                      </li>
                      <li>
                        <strong>Should not be relied upon</strong> as a
                        substitute for consultation with a qualified attorney
                      </li>
                      <li>
                        <strong>May not reflect the most current</strong> legal
                        developments or changes in law
                      </li>
                      <li>
                        <strong>
                          Does not create an attorney-client relationship
                        </strong>{" "}
                        between you and NyayaMitra
                      </li>
                    </ul>
                  </div>
                ),
              },
              {
                title: "2. AI Technology Limitations",
                content: (
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Our AI system, while advanced, has inherent limitations:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>
                        <strong>
                          May provide incomplete or inaccurate information
                        </strong>{" "}
                        despite our best efforts
                      </li>
                      <li>
                        <strong>Cannot understand complex legal nuances</strong>{" "}
                        that require human judgment
                      </li>
                      <li>
                        <strong>May misinterpret your questions</strong> or
                        provide responses that don't address your specific needs
                      </li>
                      <li>
                        <strong>Cannot predict case outcomes</strong> or
                        guarantee legal success
                      </li>
                      <li>
                        <strong>Is trained on general legal information</strong>{" "}
                        and may not account for regional variations in law
                      </li>
                    </ul>
                  </div>
                ),
              },
              {
                title: "3. No Attorney-Client Relationship",
                content: (
                  <p className="text-gray-700">
                    Use of NyayaMitra does not create an attorney-client
                    relationship between you and NyayaMitra or any of its
                    partners. No confidential, attorney-client privileged
                    relationship is formed by using our services. Any
                    information you share may not be protected by
                    attorney-client privilege.
                  </p>
                ),
              },
              {
                title: "4. Jurisdictional Limitations",
                content: (
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      NyayaMitra primarily focuses on Indian law, but:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>
                        Laws vary significantly between states and territories
                        in India
                      </li>
                      <li>
                        Local regulations and ordinances may not be covered
                      </li>
                      <li>
                        We cannot provide advice on international legal matters
                      </li>
                      <li>
                        Specialized areas of law may require expert consultation
                      </li>
                    </ul>
                  </div>
                ),
              },
              {
                title: "5. Time-Sensitive Legal Matters",
                content: (
                  <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                    <h3 className="text-lg font-semibold text-red-900 mb-2">
                      🚨 Emergency Legal Situations
                    </h3>
                    <p className="text-red-800">
                      NyayaMitra is NOT suitable for emergency legal situations.
                      If you are facing:
                    </p>
                    <ul className="list-disc list-inside text-red-800 mt-2 space-y-1">
                      <li>Immediate threat to personal safety</li>
                      <li>Arrest or police custody</li>
                      <li>Court deadlines or urgent filings</li>
                      <li>Time-sensitive legal procedures</li>
                    </ul>
                    <p className="text-red-800 font-medium mt-3">
                      Please contact local authorities, emergency services, or
                      seek immediate legal counsel.
                    </p>
                  </div>
                ),
              },
              {
                title: "6. Accuracy and Reliability",
                content: (
                  <p className="text-gray-700">
                    While we strive to provide accurate and up-to-date
                    information, we cannot guarantee the accuracy, completeness,
                    or reliability of the information provided. Laws change
                    frequently, and court interpretations may vary. Always
                    verify information with current legal sources or qualified
                    attorneys.
                  </p>
                ),
              },
              {
                title: "7. Third-Party Referrals",
                content: (
                  <p className="text-gray-700">
                    When we provide referrals to lawyers, legal aid
                    organizations, or other service providers, we do not endorse
                    or guarantee their services. We are not responsible for the
                    quality, competence, or actions of any referred parties. You
                    should independently verify their credentials and
                    suitability for your needs.
                  </p>
                ),
              },
              {
                title: "8. Document Review Limitations",
                content: (
                  <div>
                    <p className="text-gray-700">
                      Our document summarization feature provides general
                      summaries only. We cannot:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 mt-3">
                      <li>Provide legal analysis of complex documents</li>
                      <li>
                        Advise on the legal implications of signing documents
                      </li>
                      <li>Identify all potential legal issues in documents</li>
                      <li>
                        Replace professional document review by qualified
                        attorneys
                      </li>
                    </ul>
                  </div>
                ),
              },
              {
                title: "9. Use at Your Own Risk",
                content: (
                  <p className="text-gray-700">
                    You use NyayaMitra entirely at your own risk. We disclaim
                    all liability for any decisions made, actions taken, or
                    actions not taken based on information obtained through our
                    platform. You should always consult with qualified legal
                    professionals before making important legal decisions.
                  </p>
                ),
              },
              {
                title: "10. When to Seek Professional Legal Help",
                content: (
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">
                      You should consult a lawyer when:
                    </h3>
                    <ul className="list-disc list-inside text-blue-800 space-y-1">
                      <li>Facing criminal charges or police investigation</li>
                      <li>Involved in litigation or court proceedings</li>
                      <li>
                        Dealing with significant financial transactions or
                        contracts
                      </li>
                      <li>
                        Facing family law matters (divorce, custody, etc.)
                      </li>
                      <li>
                        Handling property disputes or real estate transactions
                      </li>
                      <li>
                        Dealing with employment issues or workplace harassment
                      </li>
                      <li>
                        Planning estates or dealing with inheritance matters
                      </li>
                      <li>Starting or running a business</li>
                      <li>
                        Any situation where legal consequences could be
                        significant
                      </li>
                    </ul>
                  </div>
                ),
              },
              {
                title: "11. Contact and Support",
                content: (
                  <div>
                    <p className="text-gray-700 mb-4">
                      If you have questions about this disclaimer or need
                      clarification about our services:
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">
                        <strong>Email:</strong> support@nyayamitra.org
                        <br />
                        <strong>Phone:</strong> 1800-123-4567
                        <br />
                        <strong>Legal Helpline:</strong> For urgent legal aid
                        referrals
                        <br />
                        <strong>Website:</strong> www.nyayamitra.org
                      </p>
                    </div>
                  </div>
                ),
              },
            ].map((section, index) => (
              <motion.section
                key={index}
                variants={sectionVariants}
                className="space-y-4"
              >
                <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                  {section.title}
                </h2>
                {section.content}
              </motion.section>
            ))}

            <motion.section
              variants={sectionVariants}
              className="bg-gray-100 p-6 rounded-lg"
            >
              <p className="text-gray-800 text-center font-medium">
                By using NyayaMitra, you acknowledge that you have read,
                understood, and agree to this disclaimer.
              </p>
            </motion.section>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        variants={footerVariants}
        initial="hidden"
        animate="visible"
        className="bg-gray-50 border-t mt-16"
      >
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/"
                className="text-blue-900 hover:text-blue-700 mb-4 md:mb-0"
              >
                ← Back to NyayaMitra
              </Link>
            </motion.div>
            <div className="flex space-x-6 text-sm text-gray-600">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link href="/privacy-policy" className="hover:text-blue-900">
                  Privacy Policy
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link href="/terms-of-service" className="hover:text-blue-900">
                  Terms of Service
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link href="/disclaimer" className="font-medium text-blue-900">
                  Disclaimer
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default DisclaimerPage;
