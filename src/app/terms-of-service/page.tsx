"use client";
import React from "react";
import Link from "next/link";
import Logo from "@/components/logo";
import { motion } from "framer-motion";

const TermsOfServicePage = () => {
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
              <motion.div
                className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold text-sm mr-2"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Logo className="w-6 h-6" />
              </motion.div>
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
            Terms of Service
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
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing or using NyayaMitra's AI-powered legal assistance
                platform ("Service"), you agree to be bound by these Terms of
                Service ("Terms"). If you do not agree to these Terms, please do
                not use our Service. These Terms apply to all users, including
                visitors, registered users, and premium subscribers.
              </p>
            </motion.section>

            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                2. Description of Service
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">NyayaMitra provides:</p>
                <motion.ul
                  className="list-disc list-inside text-gray-700 space-y-1"
                  variants={containerVariants}
                >
                  {[
                    "AI-powered legal information and guidance in multiple Indian languages",
                    "Voice-to-voice legal Q&A capabilities",
                    "Legal document summarization and explanation services",
                    "Referrals to qualified legal professionals and aid organizations",
                    "Educational content about Indian laws and legal procedures",
                  ].map((item, index) => (
                    <motion.li key={index} variants={itemVariants}>
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
                <motion.p variants={itemVariants} className="text-gray-700">
                  <strong>Important:</strong> NyayaMitra provides general legal
                  information only and does not constitute legal advice. We are
                  not a law firm and do not establish an attorney-client
                  relationship.
                </motion.p>
              </div>
            </motion.section>

            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                3. User Responsibilities and Conduct
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  By using NyayaMitra, you agree to:
                </p>
                <motion.ul
                  className="list-disc list-inside text-gray-700 space-y-1"
                  variants={containerVariants}
                >
                  {[
                    "Provide accurate and truthful information",
                    "Use the Service only for lawful purposes",
                    "Respect the intellectual property rights of others",
                    "Not attempt to reverse engineer or hack our AI systems",
                    "Not use the Service for commercial purposes without authorization",
                    "Not submit false, misleading, or harmful content",
                  ].map((item, index) => (
                    <motion.li key={index} variants={itemVariants}>
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.h3
                  variants={itemVariants}
                  className="text-lg font-medium text-gray-900 mt-6 mb-2"
                >
                  Prohibited Uses:
                </motion.h3>
                <motion.ul
                  className="list-disc list-inside text-gray-700 space-y-1"
                  variants={containerVariants}
                >
                  {[
                    "Seeking advice for illegal activities",
                    "Harassment, threats, or abusive language",
                    "Sharing confidential or privileged information of third parties",
                    "Attempting to overwhelm our systems with excessive requests",
                  ].map((item, index) => (
                    <motion.li key={index} variants={itemVariants}>
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.section>

            {/* Continue with other sections using the same pattern */}
            {[
              {
                title: "4. Limitations and Disclaimers",
                content: (
                  <motion.div
                    className="space-y-4"
                    variants={containerVariants}
                  >
                    <motion.h3
                      variants={itemVariants}
                      className="text-lg font-medium text-gray-900 mb-2"
                    >
                      4.1 No Legal Advice
                    </motion.h3>
                    <motion.p variants={itemVariants} className="text-gray-700">
                      NyayaMitra provides general legal information only. Our AI
                      responses do not constitute legal advice and should not be
                      relied upon as such. For specific legal matters, always
                      consult with a qualified attorney.
                    </motion.p>
                    <motion.h3
                      variants={itemVariants}
                      className="text-lg font-medium text-gray-900 mb-2"
                    >
                      4.2 Accuracy Limitations
                    </motion.h3>
                    <motion.p variants={itemVariants} className="text-gray-700">
                      While we strive for accuracy, laws change frequently and
                      our AI system may not reflect the most recent legal
                      developments. We do not guarantee the accuracy,
                      completeness, or timeliness of information provided.
                    </motion.p>
                    <motion.h3
                      variants={itemVariants}
                      className="text-lg font-medium text-gray-900 mb-2"
                    >
                      4.3 Emergency Situations
                    </motion.h3>
                    <motion.p variants={itemVariants} className="text-gray-700">
                      NyayaMitra is not suitable for emergency legal situations.
                      In case of urgent legal matters, contact local
                      authorities, emergency services, or seek immediate legal
                      counsel.
                    </motion.p>
                  </motion.div>
                ),
              },
              {
                title: "5. Intellectual Property Rights",
                content: (
                  <motion.div
                    className="space-y-4"
                    variants={containerVariants}
                  >
                    <motion.p variants={itemVariants} className="text-gray-700">
                      All content, features, and functionality of NyayaMitra,
                      including but not limited to text, graphics, logos,
                      software, and AI algorithms, are owned by NyayaMitra and
                      protected by copyright, trademark, and other intellectual
                      property laws.
                    </motion.p>
                    <motion.p variants={itemVariants} className="text-gray-700">
                      You retain ownership of the content you submit to our
                      Service. By submitting content, you grant us a limited
                      license to use, process, and analyze it to provide our
                      services and improve our AI capabilities.
                    </motion.p>
                  </motion.div>
                ),
              },
              {
                title: "6. Privacy and Data Protection",
                content: (
                  <motion.p variants={itemVariants} className="text-gray-700">
                    Your privacy is important to us. Our collection, use, and
                    protection of your personal information is governed by our
                    Privacy Policy, which is incorporated into these Terms by
                    reference. By using our Service, you consent to the
                    collection and use of your information as described in our
                    Privacy Policy.
                  </motion.p>
                ),
              },
              {
                title: "7. Service Availability and Modifications",
                content: (
                  <motion.div
                    className="space-y-4"
                    variants={containerVariants}
                  >
                    <motion.p variants={itemVariants} className="text-gray-700">
                      We strive to maintain continuous service availability but
                      cannot guarantee uninterrupted access. We may:
                    </motion.p>
                    <motion.ul
                      variants={containerVariants}
                      className="list-disc list-inside text-gray-700 space-y-1"
                    >
                      {[
                        "Temporarily suspend service for maintenance or updates",
                        "Modify features and functionality with notice",
                        "Discontinue certain features or the entire service",
                        "Set usage limits to ensure fair access for all users",
                      ].map((item, index) => (
                        <motion.li key={index} variants={itemVariants}>
                          {item}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                ),
              },
              {
                title: "8. Limitation of Liability",
                content: (
                  <motion.p variants={itemVariants} className="text-gray-700">
                    To the maximum extent permitted by law, NyayaMitra and its
                    affiliates shall not be liable for any indirect, incidental,
                    special, consequential, or punitive damages, including but
                    not limited to loss of profits, data, or use, arising out of
                    or relating to your use of our Service, even if we have been
                    advised of the possibility of such damages.
                  </motion.p>
                ),
              },
              {
                title: "9. Indemnification",
                content: (
                  <motion.p variants={itemVariants} className="text-gray-700">
                    You agree to indemnify, defend, and hold harmless NyayaMitra
                    and its officers, directors, employees, and agents from any
                    claims, damages, losses, liabilities, and expenses arising
                    out of your use of our Service, violation of these Terms, or
                    infringement of any third-party rights.
                  </motion.p>
                ),
              },
              {
                title: "10. Governing Law and Jurisdiction",
                content: (
                  <motion.p variants={itemVariants} className="text-gray-700">
                    These Terms are governed by the laws of India. Any disputes
                    arising under these Terms shall be subject to the exclusive
                    jurisdiction of the courts in Mumbai, Maharashtra, India.
                  </motion.p>
                ),
              },
              {
                title: "11. Termination",
                content: (
                  <motion.p variants={itemVariants} className="text-gray-700">
                    We may terminate or suspend your access to our Service
                    immediately, without prior notice, for conduct that we
                    believe violates these Terms or is harmful to other users,
                    us, or third parties, or for any other reason in our sole
                    discretion.
                  </motion.p>
                ),
              },
              {
                title: "12. Changes to Terms",
                content: (
                  <motion.p variants={itemVariants} className="text-gray-700">
                    We reserve the right to modify these Terms at any time. We
                    will notify users of any material changes via email or
                    through our Service. Your continued use of NyayaMitra after
                    such changes constitutes acceptance of the updated Terms.
                  </motion.p>
                ),
              },
              {
                title: "13. Contact Information",
                content: (
                  <>
                    <p className="text-gray-700 mb-4">
                      If you have any questions about these Terms of Service,
                      please contact us:
                    </p>
                    <motion.div
                      className="bg-gray-50 p-4 rounded-lg"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-gray-700">
                        <strong>Email:</strong> legal@nyayamitra.org
                        <br />
                        <strong>Phone:</strong> 1800-123-4567
                        <br />
                        <strong>Address:</strong> NyayaMitra Legal Tech Pvt.
                        Ltd.
                        <br />
                        Legal Technology Center, Mumbai, Maharashtra, India
                      </p>
                    </motion.div>
                  </>
                ),
              },
            ].map((section, index) => (
              <motion.section
                key={index}
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.h2
                  variants={itemVariants}
                  className="text-2xl font-semibold text-blue-900 mb-4"
                >
                  {section.title}
                </motion.h2>
                {section.content}
              </motion.section>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-gray-50 border-t mt-16"
      >
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div whileHover={{ x: -5 }} transition={{ duration: 0.2 }}>
              <Link
                href="/"
                className="text-blue-900 hover:text-blue-700 mb-4 md:mb-0"
              >
                ← Back to NyayaMitra
              </Link>
            </motion.div>
            <motion.div
              className="flex space-x-6 text-sm text-gray-600"
              variants={containerVariants}
            >
              {[
                { href: "/privacy-policy", text: "Privacy Policy" },
                {
                  href: "/terms-of-service",
                  text: "Terms of Service",
                  active: true,
                },
                { href: "/disclaimer", text: "Disclaimer" },
              ].map((link, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    className={
                      link.active
                        ? "font-medium text-blue-900"
                        : "hover:text-blue-900"
                    }
                  >
                    {link.text}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default TermsOfServicePage;
