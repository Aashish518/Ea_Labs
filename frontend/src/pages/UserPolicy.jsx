import React, { useEffect } from 'react';
import { Users, CheckCircle, XCircle, Calendar, CreditCard, FileCheck, AlertTriangle, BookOpen, Shield, Phone } from 'lucide-react';

const UserPolicy = () => {
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
  const lastUpdated = "November 21, 2025";

  const sections = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "User Registration & Account",
      content: [
        {
          subtitle: "Account Creation",
          text: "Users must provide accurate and complete information during registration including full name, contact details, date of birth, and valid identification. Each user is responsible for maintaining the confidentiality of their account credentials."
        },
        {
          subtitle: "Age Requirements",
          text: "Users must be 18 years or older to create an account. For minors, a parent or legal guardian must create and manage the account on their behalf."
        },
        {
          subtitle: "Account Security",
          text: "You are responsible for all activities that occur under your account. Notify us immediately of any unauthorized access or security breaches."
        }
      ]
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Acceptable Use",
      content: [
        {
          subtitle: "Permitted Uses",
          text: "Our services are intended for legitimate medical testing and diagnostic purposes. Users may book tests, view reports, consult with healthcare providers, and manage their health records through our platform."
        },
        {
          subtitle: "Honest Information",
          text: "Users must provide truthful and accurate medical history, symptoms, and health information. Providing false information may affect test results and diagnosis."
        },
        {
          subtitle: "Respectful Conduct",
          text: "Users must treat our staff, healthcare professionals, and other users with respect and courtesy at all times."
        }
      ]
    },
    {
      icon: <XCircle className="w-6 h-6" />,
      title: "Prohibited Activities",
      content: [
        {
          subtitle: "Fraudulent Use",
          text: "Users must not use false identities, submit fraudulent prescriptions, or attempt to obtain services through deceptive means."
        },
        {
          subtitle: "System Abuse",
          text: "Users must not attempt to hack, disrupt, or interfere with our systems, servers, or networks. Any form of automated data collection or scraping is strictly prohibited."
        },
        {
          subtitle: "Misuse of Reports",
          text: "Test reports are confidential and intended for personal medical use only. Users must not forge, alter, or misuse laboratory reports for fraudulent purposes."
        }
      ]
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Appointment & Booking Policy",
      content: [
        {
          subtitle: "Booking Procedures",
          text: "Appointments can be booked online, via mobile app, or by phone. Users will receive confirmation via email or SMS with appointment details and preparation instructions."
        },
        {
          subtitle: "Cancellation Policy",
          text: "Appointments can be cancelled up to 4 hours before the scheduled time without penalty. Late cancellations or no-shows may incur a cancellation fee."
        },
        {
          subtitle: "Rescheduling",
          text: "Users may reschedule appointments free of charge if done at least 6 hours in advance. Subject to availability of time slots."
        },
        {
          subtitle: "Sample Collection",
          text: "For home sample collection, users must ensure someone is present at the scheduled time. Multiple failed attempts may result in service charges."
        }
      ]
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Payment Terms",
      content: [
        {
          subtitle: "Payment Methods",
          text: "We accept various payment methods including credit/debit cards, UPI, net banking, digital wallets, and cash for home collection services."
        },
        {
          subtitle: "Pricing",
          text: "All prices are displayed in Indian Rupees (INR) and include applicable taxes. Prices may vary based on location and service type."
        },
        {
          subtitle: "Refund Policy",
          text: "Refunds are processed within 7-10 business days for cancelled tests (as per cancellation policy). No refunds for completed tests or late cancellations."
        },
        {
          subtitle: "Insurance Claims",
          text: "Users are responsible for verifying insurance coverage. We provide necessary documentation for insurance claims but do not guarantee reimbursement."
        }
      ]
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "Test Reports & Results",
      content: [
        {
          subtitle: "Report Delivery",
          text: "Reports are typically available within 24-48 hours for routine tests. Users will be notified via email/SMS when reports are ready for download."
        },
        {
          subtitle: "Report Access",
          text: "Reports can be accessed through the user portal, mobile app, or collected from our centers. Physical copies are available on request."
        },
        {
          subtitle: "Report Interpretation",
          text: "Reports should be interpreted by qualified healthcare professionals. We are not responsible for self-diagnosis or treatment decisions made without medical consultation."
        },
        {
          subtitle: "Report Retention",
          text: "Digital reports are available in your account for 5 years. Users are advised to download and maintain their own copies."
        }
      ]
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Limitation of Liability",
      content: [
        {
          subtitle: "Service Quality",
          text: "While we strive for accurate results, laboratory testing has inherent limitations. We are not liable for diagnostic or treatment decisions made by healthcare providers."
        },
        {
          subtitle: "Technical Issues",
          text: "We are not responsible for delays or service interruptions due to technical issues, natural disasters, or circumstances beyond our control."
        },
        {
          subtitle: "Third-Party Services",
          text: "We are not responsible for the quality or actions of third-party healthcare providers, courier services, or payment gateways."
        },
        {
          subtitle: "Maximum Liability",
          text: "Our total liability for any claims arising from our services is limited to the amount paid for the specific test or service in question."
        }
      ]
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Intellectual Property",
      content: [
        {
          subtitle: "Our Content",
          text: "All content on our website, app, and reports including text, graphics, logos, and software is our property and protected by intellectual property laws."
        },
        {
          subtitle: "User License",
          text: "Users are granted a limited, non-exclusive license to access and use our services for personal, non-commercial purposes only."
        },
        {
          subtitle: "Restrictions",
          text: "Users may not copy, modify, distribute, sell, or create derivative works from our content without written permission."
        }
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Confidentiality & Data Protection",
      content: [
        {
          subtitle: "Medical Confidentiality",
          text: "We maintain strict confidentiality of all medical information in accordance with healthcare regulations and ethical standards."
        },
        {
          subtitle: "Data Sharing",
          text: "Your test results will only be shared with your designated healthcare provider, insurance companies (with your consent), or as required by law."
        },
        {
          subtitle: "Data Security",
          text: "We implement industry-standard security measures to protect your personal and medical information from unauthorized access."
        }
      ]
    }
  ];

  const responsibilities = [
    "Arrive on time for scheduled appointments",
    "Follow pre-test preparation instructions carefully",
    "Provide accurate medical history and current medications",
    "Maintain personal hygiene during sample collection",
    "Pay for services as per agreed terms",
    "Report any adverse reactions immediately",
    "Keep login credentials secure and confidential",
    "Update contact information when changed"
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-linear-to-r from-indigo-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="w-16 h-16 md:w-20 md:h-20" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">
            User Policy
          </h1>
          <p className="text-center text-indigo-100 text-lg md:text-xl max-w-2xl mx-auto">
            Terms of service and guidelines for using our laboratory services
          </p>
          <p className="text-center text-indigo-200 text-sm mt-4">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Agreement to Terms
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Welcome to our Laboratory Services. These User Policy and Terms of Service constitute a legally binding 
            agreement between you and our laboratory. By accessing or using our services, you agree to be bound by 
            these terms.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Please read these terms carefully before using our services. If you do not agree with any part of these 
            terms, you should not use our services. Your continued use of our services constitutes acceptance of 
            these terms and any future modifications.
          </p>
        </div>

        {/* Policy Sections */}
        {sections.map((section, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                {section.icon}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 pt-2">
                {section.title}
              </h2>
            </div>
            
            <div className="space-y-6">
              {section.content.map((item, idx) => (
                <div key={idx} className="border-l-4 border-indigo-500 pl-4 md:pl-6">
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

        {/* User Responsibilities */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            User Responsibilities
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            As a user of our laboratory services, you agree to:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {responsibilities.map((item, index) => (
              <div key={index} className="flex items-start gap-3 bg-indigo-50 p-4 rounded-lg">
                <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Assurance */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Quality Assurance & Accuracy
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We are committed to providing accurate and reliable test results. Our laboratory maintains:
          </p>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 shrink-0"></span>
              <span>Accreditation from national and international quality standards organizations</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 shrink-0"></span>
              <span>Regular equipment calibration and maintenance schedules</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 shrink-0"></span>
              <span>Stringent quality control procedures and internal/external audits</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 shrink-0"></span>
              <span>Trained and certified laboratory technicians and pathologists</span>
            </li>
          </ul>
        </div>

        {/* Dispute Resolution */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Dispute Resolution
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Complaints Procedure</h3>
              <p className="text-gray-600 leading-relaxed">
                If you have any complaints or concerns about our services, please contact our customer service team 
                within 7 days of the service. We will investigate and respond to your complaint within 15 business days.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Arbitration</h3>
              <p className="text-gray-600 leading-relaxed">
                Any disputes that cannot be resolved through our complaints procedure shall be subject to arbitration 
                in accordance with the laws of India. The venue for arbitration shall be Ahmedabad, Gujarat.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Governing Law</h3>
              <p className="text-gray-600 leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of India, without regard 
                to its conflict of law provisions.
              </p>
            </div>
          </div>
        </div>

        {/* Termination */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Account Termination
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We reserve the right to terminate or suspend your account and access to our services immediately, 
            without prior notice or liability, for any reason, including but not limited to:
          </p>
          <ul className="space-y-2 text-gray-600 ml-6">
            <li className="list-disc">Breach of these User Policy terms</li>
            <li className="list-disc">Fraudulent or illegal activities</li>
            <li className="list-disc">Abusive behavior towards staff or other users</li>
            <li className="list-disc">Non-payment for services rendered</li>
            <li className="list-disc">Providing false or misleading information</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-4">
            Users may close their account at any time by contacting our customer service. Upon termination, 
            your right to use our services will immediately cease.
          </p>
        </div>

        {/* Changes to Terms */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Modifications to Terms
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We reserve the right to modify or replace these terms at any time at our sole discretion. Material 
            changes will be notified to users via email or through prominent notices on our website/app.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Your continued use of our services after any changes to these terms constitutes acceptance of those 
            changes. We encourage you to review these terms periodically for any updates.
          </p>
        </div>


        {/* Acknowledgment Banner */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-6">
          <p className="text-gray-700 leading-relaxed">
            <span className="font-semibold text-yellow-800">Acknowledgment:</span> By using our laboratory services, 
            you acknowledge that you have read, understood, and agree to be bound by these User Policy terms. 
            You also acknowledge that these terms constitute the entire agreement between you and our laboratory 
            regarding the use of our services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserPolicy;