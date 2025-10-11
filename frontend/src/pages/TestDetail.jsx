import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const testsData = [
    {
        id: 1,
        name: 'Thyroid Stimulating Hormone (TSH)',
        description: 'Measures the amount of TSH in your blood to check for thyroid problems.',
        price: '$50',
        details: {
            overview: "The TSH test is a blood test that measures the amount of thyroid-stimulating hormone (TSH) in your blood. The thyroid is a small, butterfly-shaped gland located at the base of your neck. Your thyroid gland makes hormones that control the way your body uses energy. TSH is produced by the pituitary gland, a pea-sized organ located at the base of the brain. When thyroid levels in your body are low, the pituitary gland makes more TSH. When thyroid levels are high, the pituitary gland makes less TSH.",
            components: ["Thyroid Stimulating Hormone (TSH)"],
            prerequisites: "No special preparation is needed for a TSH test. Some medications can interfere with the test, so tell your doctor about any medicines you are taking.",
            faqs: [
                { q: "Why do I need a TSH test?", a: "A TSH test is used to check for thyroid problems. It may be ordered if you have symptoms of an overactive or underactive thyroid." },
                { q: "What do the results mean?", a: "Your doctor will interpret your results based on your symptoms, age, and medical history. Generally, high TSH levels indicate hypothyroidism (underactive thyroid), while low TSH levels indicate hyperthyroidism (overactive thyroid)." }
            ]
        }
    },
    {
        id: 2,
        name: 'Complete Blood Count (CBC)',
        description: 'Evaluates your overall health and detects a wide range of disorders.',
        price: '$40',
        details: {
            overview: "A complete blood count (CBC) is a blood test used to evaluate your overall health and detect a wide range of disorders, including anemia, infection and leukemia. A CBC test measures several components and features of your blood, including red blood cells, white blood cells, hemoglobin, hematocrit and platelets.",
            components: ["Red Blood Cells", "White Blood Cells", "Hemoglobin", "Hematocrit", "Platelets"],
            prerequisites: "A CBC test does not require any special preparation. You can eat and drink normally before the test.",
            faqs: [
                { q: "What can a CBC detect?", a: "It can help detect a variety of conditions such as infections, anemia, diseases of the immune system, and blood cancers." },
                { q: "How is the test performed?", a: "A small sample of blood is drawn from a vein in your arm." }
            ]
        }
    },
    {
        id: 3,
        name: 'Lipid Panel',
        description: 'Measures fats and fatty substances used as a source of energy in your body.',
        price: '$65',
        details: {
            overview: "A lipid panel is a blood test that measures the amount of certain fat molecules called lipids in your blood. It measures cholesterol and triglycerides. This test helps monitor and screen for your risk of cardiovascular disease.",
            components: ["Total Cholesterol", "LDL Cholesterol", "HDL Cholesterol", "Triglycerides"],
            prerequisites: "You may need to fast for 9-12 hours before the test. Only water is permitted.",
            faqs: [
                { q: "Why is a lipid panel important?", a: "It helps assess your risk of developing cardiovascular diseases like heart disease, heart attack, and stroke." },
                { q: "What are LDL and HDL cholesterol?", a: "LDL is often called 'bad' cholesterol because high levels can lead to plaque buildup in your arteries. HDL is 'good' cholesterol because it helps remove excess cholesterol from your body." }
            ]
        }
    }
];

const TestDetail = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('overview');
    const navigate=useNavigate()

    if (!id) {
        return <div className="p-8 text-center">Loading test details...</div>;
    }

    const testDetails = testsData[id].details;
    const test = testsData[id];

    const handleClick = () => { navigate("/contactus") }

    return (
        <div className="bg-white">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-6">
                    <button
                        onClick={() => navigate("/", { state: { scrollToHealthPackages: true } })}
                        className="flex items-center text-black hover:text-gray-900 font-medium"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
                        </svg>
                        Back
                    </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg">
                        <h1 className="text-3xl font-bold text-black mb-2">{test.name}</h1>
                        <p className="text-gray-600 mb-6">{test.description}</p>

                        <div className="border-b border-gray-200 mb-6">
                            <nav className="-mb-px flex overflow-x-auto space-x-8" aria-label="Tabs">
                                <button onClick={() => setActiveTab('overview')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-[#AA1626] text-[#AA1626]' : 'border-transparent text-black hover:text-black hover:border-gray-300'}`}>Overview</button>
                                <button onClick={() => setActiveTab('components')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'components' ? 'border-[#AA1626] text-[#AA1626]' : 'border-transparent text-black hover:text-black hover:border-gray-300'}`}>Test Components</button>
                                <button onClick={() => setActiveTab('prerequisites')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'prerequisites' ? 'border-[#AA1626] text-[#AA1626]' : 'border-transparent text-black hover:text-black hover:border-gray-300'}`}>Prerequisites</button>
                                <button onClick={() => setActiveTab('faqs')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'faqs' ? 'border-[#AA1626] text-[#AA1626]' : 'border-transparent text-black hover:text-black hover:border-gray-300'}`}>FAQs</button>
                            </nav>
                        </div>

                        <div>
                            {activeTab === 'overview' && <p className="text-black leading-relaxed">{testDetails.overview}</p>}
                            {activeTab === 'components' && (
                                <ul className="list-disc list-inside text-black space-y-2">
                                    {testDetails.components.map(c => <li key={c}>{c}</li>)}
                                </ul>
                            )}
                            {activeTab === 'prerequisites' && <p className="text-black leading-relaxed">{testDetails.prerequisites}</p>}
                            {activeTab === 'faqs' && (
                                <div className="space-y-4">
                                    {testDetails.faqs.map(faq => (
                                        <div key={faq.q} className="p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-semibold text-black">{faq.q}</h4>
                                            <p className="text-black mt-1">{faq.a}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-lg sticky top-12">
                            <div className="flex justify-between items-baseline mb-4">
                                <h2 className="text-xl font-bold text-black">Price</h2>
                                <span className="text-3xl font-bold text-red-600">{test.price}</span>
                            </div>
                            <p className="text-sm text-black mb-6">Includes all taxes and fees.</p>
                            <button
                                onClick={handleClick}
                                className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                                Contact Us
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestDetail;

