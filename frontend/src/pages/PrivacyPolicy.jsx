import React, { useEffect } from 'react';
import { Shield, Lock, FileText, Eye, UserCheck, Server, AlertCircle, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
  const lastUpdated = "November 21, 2025";

  const sections = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          text: "We collect personal information including your name, contact details, date of birth, gender, and identification documents when you register for our laboratory services."
        },
        {
          subtitle: "Medical Information",
          text: "We collect health-related information including test results, medical history, physician referrals, and prescription details necessary for providing accurate laboratory services."
        },
        {
          subtitle: "Technical Information",
          text: "When you use our website or mobile app, we may collect IP addresses, browser type, device information, and usage data to improve our services."
        }
      ]
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Service Delivery",
          text: "We use your information to conduct laboratory tests, generate reports, and communicate results to you and your healthcare providers."
        },
        {
          subtitle: "Quality Improvement",
          text: "Your data helps us maintain quality standards, improve our testing processes, and develop new diagnostic services."
        },
        {
          subtitle: "Legal Compliance",
          text: "We process your information to comply with healthcare regulations, insurance requirements, and legal obligations."
        }
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Data Security",
      content: [
        {
          subtitle: "Encryption",
          text: "All sensitive data is encrypted both in transit and at rest using industry-standard encryption protocols."
        },
        {
          subtitle: "Access Controls",
          text: "We implement strict access controls ensuring only authorized personnel can access your information based on their role."
        },
        {
          subtitle: "Regular Audits",
          text: "Our systems undergo regular security audits and compliance checks to maintain the highest security standards."
        }
      ]
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Your Rights",
      content: [
        {
          subtitle: "Access & Correction",
          text: "You have the right to access your personal and medical information and request corrections if any data is inaccurate."
        },
        {
          subtitle: "Data Portability",
          text: "You can request a copy of your test results and medical records in a commonly used electronic format."
        },
        {
          subtitle: "Deletion Request",
          text: "You may request deletion of your personal data, subject to legal retention requirements for medical records."
        }
      ]
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: "Data Sharing",
      content: [
        {
          subtitle: "Healthcare Providers",
          text: "We share your test results with your referring physician or healthcare provider as authorized by you."
        },
        {
          subtitle: "Third-Party Service Providers",
          text: "We may share limited data with trusted partners who assist in providing our services, bound by strict confidentiality agreements."
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose information when required by law, court order, or to protect public health and safety."
        }
      ]
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "Data Retention",
      content: [
        {
          subtitle: "Medical Records",
          text: "Laboratory test results and medical records are retained as per healthcare regulations, typically for a minimum of 7-10 years."
        },
        {
          subtitle: "Personal Information",
          text: "Personal information is retained for as long as necessary to provide services and comply with legal obligations."
        },
        {
          subtitle: "Marketing Data",
          text: "If you opt-in to marketing communications, we retain your preferences until you unsubscribe."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-cyan-50">
      {/* Header Section */}
      <div className="bg-linear-to-r from-blue-600 to-cyan-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-16 h-16 md:w-20 md:h-20" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">
            Privacy Policy
          </h1>
          <p className="text-center text-blue-100 text-lg md:text-xl max-w-2xl mx-auto">
            Your privacy and data security are our top priorities. Learn how we protect your information.
          </p>
          <p className="text-center text-blue-200 text-sm mt-4">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Introduction
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Welcome to our Laboratory Services. We are committed to protecting your personal and medical information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use 
            our laboratory services, website, or mobile applications.
          </p>
          <p className="text-gray-600 leading-relaxed">
            By using our services, you agree to the collection and use of information in accordance with this policy. 
            If you do not agree with our policies and practices, please do not use our services.
          </p>
        </div>

        {/* Policy Sections */}
        {sections.map((section, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                {section.icon}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 pt-2">
                {section.title}
              </h2>
            </div>
            
            <div className="space-y-6">
              {section.content.map((item, idx) => (
                <div key={idx} className="border-l-4 border-blue-500 pl-4 md:pl-6">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                    {item.subtitle}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Cookies Policy */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Cookies and Tracking Technologies
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We use cookies and similar tracking technologies to track activity on our website and hold certain information. 
            Cookies are files with small amount of data that may include an anonymous unique identifier.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-gray-700 font-medium mb-2">Types of cookies we use:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
              <li>Essential cookies for website functionality</li>
              <li>Analytics cookies to understand user behavior</li>
              <li>Preference cookies to remember your settings</li>
              <li>Marketing cookies (only with your consent)</li>
            </ul>
          </div>
        </div>

        {/* Children's Privacy */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Children's Privacy
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our services may be used by minors under parental or guardian consent. We take additional precautions 
            to protect the privacy of children. Parents or guardians must provide consent for laboratory services 
            for individuals under 18 years of age. We do not knowingly collect personal information from children 
            without proper authorization.
          </p>
        </div>

        {/* Changes to Policy */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Changes to This Privacy Policy
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the 
            new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
          <p className="text-gray-600 leading-relaxed">
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy 
            Policy are effective when they are posted on this page.
          </p>
        </div>

        {/* Consent Banner */}
        <div className="mt-8 bg-green-50 border-l-4 border-green-500 rounded-lg p-6">
          <p className="text-gray-700 leading-relaxed">
            <span className="font-semibold text-green-800">Your Consent:</span> By using our laboratory services, 
            you acknowledge that you have read and understood this Privacy Policy and consent to the collection, 
            use, and disclosure of your information as described herein.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;