import React, { useEffect } from 'react';
import { FileText, Scale, DollarSign, ShieldCheck, AlertCircle, Clock, UserX, FileCheck, Clipboard, Mail } from 'lucide-react';

const TermsAndConditions = () => {
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
  const lastUpdated = "November 21, 2025";

  const sections = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "General Terms",
      content: [
        {
          subtitle: "Acceptance of Terms",
          text: "By accessing and using our laboratory services, you accept and agree to be bound by these Terms and Conditions. These terms apply to all visitors, users, and others who access or use our services including website, mobile application, and physical laboratory centers."
        },
        {
          subtitle: "Eligibility",
          text: "You must be at least 18 years of age to use our services independently. Minors may use our services only with the involvement and consent of a parent or legal guardian who agrees to be bound by these Terms and Conditions."
        },
        {
          subtitle: "Modifications",
          text: "We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on our website. Your continued use of the services after such modifications constitutes your acceptance of the updated terms."
        }
      ]
    },
    {
      icon: <Clipboard className="w-6 h-6" />,
      title: "Service Description",
      content: [
        {
          subtitle: "Laboratory Services",
          text: "We provide diagnostic laboratory testing services including but not limited to blood tests, urine analysis, imaging services, pathology, microbiology, biochemistry, and specialized diagnostic tests. All tests are performed by qualified professionals in accredited facilities."
        },
        {
          subtitle: "Service Availability",
          text: "Services are available at our laboratory centers and through home collection services where applicable. Operating hours and available services may vary by location. We reserve the right to modify, suspend, or discontinue any service at any time without prior notice."
        },
        {
          subtitle: "Prescription Requirements",
          text: "Certain tests require a valid prescription from a registered medical practitioner. We reserve the right to refuse service if proper documentation is not provided or if we determine the requested test is not medically appropriate."
        }
      ]
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Pricing & Payment",
      content: [
        {
          subtitle: "Service Charges",
          text: "All prices displayed on our website, app, or centers are in Indian Rupees (INR) and include applicable taxes unless otherwise stated. Prices are subject to change without prior notice. The price applicable at the time of booking/payment will be charged."
        },
        {
          subtitle: "Payment Methods",
          text: "We accept multiple payment methods including credit/debit cards, net banking, UPI, digital wallets, and cash (for home collection and walk-in services). Payment must be made in full before or at the time of sample collection unless credit arrangements have been pre-approved."
        },
        {
          subtitle: "Package Deals & Discounts",
          text: "Special packages and promotional discounts are subject to specific terms and conditions. Discounts cannot be combined unless explicitly stated. We reserve the right to modify or withdraw promotional offers at any time."
        },
        {
          subtitle: "Third-Party Payments",
          text: "For payments through third-party gateways, you agree to their terms of service. We are not responsible for any charges, fees, or issues arising from third-party payment processors."
        }
      ]
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Appointment & Scheduling",
      content: [
        {
          subtitle: "Booking Confirmation",
          text: "Appointments are confirmed only upon receipt of payment (full or partial as per policy) and confirmation via email or SMS. Booking slots are subject to availability and allocated on a first-come, first-served basis."
        },
        {
          subtitle: "Cancellation & Rescheduling",
          text: "Appointments may be cancelled or rescheduled up to 4 hours before the scheduled time without charges. Cancellations made less than 4 hours before or no-shows will incur a cancellation fee of 25% of the total amount. Refunds will be processed within 7-10 business days."
        },
        {
          subtitle: "Walk-in Services",
          text: "Walk-in services are available at most centers but may involve waiting times. Priority is given to pre-booked appointments. We recommend booking in advance to avoid delays."
        },
        {
          subtitle: "Home Collection",
          text: "Home collection services are subject to availability in your area and additional charges may apply. The user must ensure that an adult is present at the collection address. Multiple failed collection attempts may result in additional charges or cancellation."
        }
      ]
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "Sample Collection & Testing",
      content: [
        {
          subtitle: "Pre-Test Requirements",
          text: "Users must follow all pre-test instructions including fasting, medication restrictions, and preparation guidelines provided at the time of booking. Failure to follow instructions may affect test results and we will not be liable for inaccurate results due to improper preparation."
        },
        {
          subtitle: "Sample Quality",
          text: "We reserve the right to reject samples that are insufficient, improperly collected, or contaminated. In such cases, users may be required to provide a fresh sample. Additional charges may apply for repeat collections."
        },
        {
          subtitle: "Testing Accuracy",
          text: "While we maintain the highest quality standards, laboratory testing has inherent limitations. Results should be interpreted by qualified healthcare professionals. We are not liable for clinical decisions made based on test results."
        },
        {
          subtitle: "Turnaround Time",
          text: "Estimated report delivery times are provided at the time of booking. While we strive to meet these timelines, delays may occur due to technical, logistical, or other unforeseen circumstances. We are not liable for any consequences arising from delayed results."
        }
      ]
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Reports & Results",
      content: [
        {
          subtitle: "Report Access",
          text: "Test reports will be made available through your online account, mobile app, or can be collected from the laboratory. We will notify you via email or SMS when reports are ready. Physical reports can be collected during business hours with valid identification."
        },
        {
          subtitle: "Report Sharing",
          text: "Reports will be shared only with the registered user or authorized individuals as specified by the user. For sharing with healthcare providers, explicit consent is required. We maintain strict confidentiality of all medical information."
        },
        {
          subtitle: "Critical Results",
          text: "In case of critical or abnormal results that require immediate attention, we will attempt to contact you or your designated healthcare provider. However, it is the user's responsibility to check and review their results promptly."
        },
        {
          subtitle: "Report Retention",
          text: "Digital reports remain accessible in your account for 5 years from the date of generation. Physical reports are stored as per regulatory requirements. Users are advised to maintain their own copies of all reports."
        }
      ]
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "Warranties & Disclaimers",
      content: [
        {
          subtitle: "Service Warranty",
          text: "We warrant that our services will be performed with reasonable care and skill in accordance with industry standards and applicable regulations. However, we make no warranty regarding the accuracy of specific test results or their suitability for any particular purpose."
        },
        {
          subtitle: "No Medical Advice",
          text: "Our services are limited to laboratory testing and reporting. We do not provide medical advice, diagnosis, or treatment recommendations. Users should consult qualified healthcare professionals for interpretation of results and medical guidance."
        },
        {
          subtitle: "Disclaimer of Warranties",
          text: "Except as expressly stated, our services are provided 'as is' without warranties of any kind, either express or implied. We disclaim all warranties including merchantability, fitness for a particular purpose, and non-infringement."
        },
        {
          subtitle: "External Links",
          text: "Our website may contain links to third-party websites or services. We are not responsible for the content, accuracy, or practices of these external sites. Use of third-party websites is at your own risk."
        }
      ]
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Limitation of Liability",
      content: [
        {
          subtitle: "Direct Damages",
          text: "Our total liability for any claim arising from our services shall not exceed the amount paid by you for the specific service giving rise to the claim. This limitation applies regardless of the form of action, whether in contract, tort, or otherwise."
        },
        {
          subtitle: "Indirect Damages",
          text: "We shall not be liable for any indirect, incidental, special, consequential, or punitive damages including loss of profits, data, or business opportunities arising from your use of our services, even if we have been advised of the possibility of such damages."
        },
        {
          subtitle: "Force Majeure",
          text: "We shall not be liable for any failure or delay in performing our obligations due to circumstances beyond our reasonable control including natural disasters, government actions, strikes, wars, pandemics, technical failures, or other force majeure events."
        },
        {
          subtitle: "User Conduct",
          text: "We are not liable for any damages arising from your violation of these Terms and Conditions, your use of our services in a manner not authorized, or your provision of inaccurate or misleading information."
        }
      ]
    },
    {
      icon: <UserX className="w-6 h-6" />,
      title: "Indemnification",
      content: [
        {
          subtitle: "User Indemnity",
          text: "You agree to indemnify, defend, and hold harmless our laboratory, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of our services, violation of these terms, or infringement of any third-party rights."
        },
        {
          subtitle: "Third-Party Claims",
          text: "You agree to indemnify us against any third-party claims arising from your actions or omissions, including claims related to the accuracy of information you provide, your failure to follow pre-test instructions, or your misuse of test reports."
        }
      ]
    }
  ];

  const importantNotes = [
    {
      title: "Confidentiality",
      text: "All medical information is kept strictly confidential in accordance with applicable privacy laws and medical ethics."
    },
    {
      title: "Data Protection",
      text: "Your personal and medical data is protected with industry-standard security measures. Refer to our Privacy Policy for details."
    },
    {
      title: "Quality Assurance",
      text: "Our laboratory maintains accreditation from national and international quality standards organizations."
    },
    {
      title: "Emergency Situations",
      text: "Laboratory services are not suitable for emergency medical situations. Contact emergency services for urgent medical care."
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 via-white to-cyan-50">
      {/* Header Section */}
      <div className="bg-linear-to-r from-teal-600 to-cyan-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Scale className="w-16 h-16 md:w-20 md:h-20" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">
            Terms & Conditions
          </h1>
          <p className="text-center text-teal-100 text-lg md:text-xl max-w-2xl mx-auto">
            Legal agreement governing the use of our laboratory services
          </p>
          <p className="text-center text-teal-200 text-sm mt-4">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Welcome to Our Laboratory Services
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            These Terms and Conditions ("Terms") constitute a legally binding agreement between you (the "User" or "you") 
            and our Laboratory Services (the "Laboratory," "we," "us," or "our"). These Terms govern your access to and 
            use of our laboratory services, including our website, mobile applications, physical centers, and all related 
            services.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Please read these Terms carefully before using our services. By accessing or using any part of our services, 
            you acknowledge that you have read, understood, and agree to be bound by these Terms and all applicable laws 
            and regulations.
          </p>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-lg">
            <p className="text-amber-800 font-semibold">
              Important: If you do not agree with any part of these Terms, you must not use our services. 
              Your continued use of our services constitutes acceptance of these Terms and any future modifications.
            </p>
          </div>
        </div>

        {/* Terms Sections */}
        {sections.map((section, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600">
                {section.icon}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 pt-2">
                {section.title}
              </h2>
            </div>
            
            <div className="space-y-6">
              {section.content.map((item, idx) => (
                <div key={idx} className="border-l-4 border-teal-500 pl-4 md:pl-6">
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

        {/* Important Notes */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Important Notes
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {importantNotes.map((note, index) => (
              <div key={index} className="bg-teal-50 border border-teal-200 rounded-lg p-5">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-teal-600" />
                  {note.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{note.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Governing Law */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Governing Law & Jurisdiction
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Applicable Law</h3>
              <p className="text-gray-600 leading-relaxed">
                These Terms and Conditions shall be governed by and construed in accordance with the laws of India, 
                without regard to its conflict of law provisions. You agree to submit to the exclusive jurisdiction 
                of the courts located in Ahmedabad, Gujarat for the resolution of any disputes.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Dispute Resolution</h3>
              <p className="text-gray-600 leading-relaxed">
                Any dispute, controversy, or claim arising out of or relating to these Terms shall first be attempted 
                to be resolved through good faith negotiations between the parties. If the dispute cannot be resolved 
                through negotiation within 30 days, it shall be subject to arbitration under the Arbitration and 
                Conciliation Act, 1996.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Severability</h3>
              <p className="text-gray-600 leading-relaxed">
                If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining 
                provisions shall continue in full force and effect. The invalid provision shall be modified to the 
                minimum extent necessary to make it valid and enforceable.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Waiver</h3>
              <p className="text-gray-600 leading-relaxed">
                Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such 
                right or provision. Any waiver of any provision of these Terms will be effective only if in writing 
                and signed by our authorized representative.
              </p>
            </div>
          </div>
        </div>

        {/* Entire Agreement */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Entire Agreement
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            These Terms and Conditions, together with our Privacy Policy and any other policies or guidelines posted 
            on our website, constitute the entire agreement between you and our Laboratory regarding the use of our 
            services and supersede all prior or contemporaneous communications and proposals, whether oral or written.
          </p>
          <p className="text-gray-600 leading-relaxed">
            No amendment to these Terms shall be effective unless made in writing and posted on our website or 
            communicated to you through other official channels.
          </p>
        </div>

        {/* Acknowledgment */}
        <div className="mt-8 bg-green-50 border-l-4 border-green-500 rounded-lg p-6">
          <h3 className="text-lg font-bold text-green-800 mb-3">
            User Acknowledgment
          </h3>
          <p className="text-gray-700 leading-relaxed mb-3">
            By clicking "I Agree," accessing our services, or submitting any information through our platform, 
            you acknowledge and confirm that:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">✓</span>
              <span>You have read and understood these Terms and Conditions in their entirety</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">✓</span>
              <span>You agree to be legally bound by these Terms and all applicable policies</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">✓</span>
              <span>You have the legal capacity to enter into this binding agreement</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">✓</span>
              <span>You will comply with all applicable laws and regulations while using our services</span>
            </li>
          </ul>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>© 2025 Laboratory Services. All rights reserved.</p>
          <p className="mt-2">
            For the best experience, please review our{' '}
            <span className="text-teal-600 font-medium">Privacy Policy</span> and{' '}
            <span className="text-teal-600 font-medium">User Policy</span> as well.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;