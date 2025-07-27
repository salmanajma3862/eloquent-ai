import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

const PrivacyPolicyPage: React.FC = () => {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94] as const
            }
        }
    };

    return (
        <div className="min-h-screen bg-black">
            <Navigation variant="landing" />
            
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="text-center mb-12">
                    <div className="flex items-center justify-center mb-6">
                        <div className="bg-blue-600/20 p-4 rounded-2xl border border-blue-600/30">
                            <FaShieldAlt className="text-3xl text-blue-400" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Your privacy is important to us. This policy explains how we collect, use, and protect your information.
                    </p>
                </motion.div>

                {/* Back Button */}
                <motion.div variants={itemVariants} className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors duration-300"
                    >
                        <FaArrowLeft className="text-sm" />
                        <span>Back</span>
                    </button>
                </motion.div>

                {/* Content */}
                <motion.div
                    variants={itemVariants}
                    className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-700/50 shadow-xl p-8"
                >
                    <div className="prose prose-invert prose-zinc max-w-none">
                        <div className="space-y-8 text-zinc-200 leading-relaxed">

                            {/* Introduction */}
                            <div className="text-center pb-6 border-b border-zinc-700">
                                <p className="text-sm text-zinc-400 mb-2">Last updated July 27, 2025</p>
                            </div>

                            {/* Introduction Section */}
                            <div>
                                <p className="mb-6 text-lg">
                                    This Privacy Notice for <strong className="text-zinc-100">Eloquent AI</strong> ("we," "us," or "our"), describes how and why we might access, collect, store, use, and/or share ("process") your personal information when you use our services ("Services"), including when you:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4 mb-6">
                                    <li>Visit our website at <a href="https://eloquent-ai.vercel.app" className="text-blue-400 hover:text-blue-300 underline">https://eloquent-ai.vercel.app</a> or any website of ours that links to this Privacy Notice</li>
                                    <li>Use Eloquent AI - A platform where you can practice your English for IELTS speaking test</li>
                                    <li>Engage with us in other related ways, including any sales, marketing, or events</li>
                                </ul>
                                <p className="mb-4">
                                    <strong className="text-zinc-100">Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <a href="mailto:businesscontact422@gmail.com" className="text-blue-400 hover:text-blue-300 underline">businesscontact422@gmail.com</a>.
                                </p>
                            </div>


                            {/* Summary Section */}
                            <div>
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">SUMMARY OF KEY POINTS</h2>
                                <p className="mb-6">
                                    This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.
                                </p>

                                <div className="space-y-4">
                                    <div>
                                        <p className="font-semibold text-zinc-100 mb-2">What personal information do we process?</p>
                                        <p>When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.</p>
                                    </div>

                                    <div>
                                        <p className="font-semibold text-zinc-100 mb-2">Do we process any sensitive personal information?</p>
                                        <p>Some of the information may be considered "special" or "sensitive" in certain jurisdictions, for example your racial or ethnic origins, sexual orientation, and religious beliefs. <strong className="text-zinc-100">We do not process sensitive personal information.</strong></p>
                                    </div>

                                    <div>
                                        <p className="font-semibold text-zinc-100 mb-2">Do we collect any information from third parties?</p>
                                        <p><strong className="text-zinc-100">We do not collect any information from third parties.</strong></p>
                                    </div>

                                    <div>
                                        <p className="font-semibold text-zinc-100 mb-2">How do we process your information?</p>
                                        <p>We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</p>
                                    </div>

                                    <div>
                                        <p className="font-semibold text-zinc-100 mb-2">In what situations and with which parties do we share personal information?</p>
                                        <p>We may share information in specific situations and with specific third parties.</p>
                                    </div>

                                    <div>
                                        <p className="font-semibold text-zinc-100 mb-2">How do we keep your information safe?</p>
                                        <p>We have adequate organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.</p>
                                    </div>

                                    <div>
                                        <p className="font-semibold text-zinc-100 mb-2">What are your rights?</p>
                                        <p>Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.</p>
                                    </div>

                                    <div>
                                        <p className="font-semibold text-zinc-100 mb-2">How do you exercise your rights?</p>
                                        <p>The easiest way to exercise your rights is by submitting a data subject access request, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.</p>
                                    </div>
                                </div>
                            </div>


                            {/* Table of Contents */}
                            <div>
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">TABLE OF CONTENTS</h2>
                                <ol className="list-decimal list-inside space-y-2 ml-4">
                                    <li><a href="#section1" className="text-blue-400 hover:text-blue-300 underline">WHAT INFORMATION DO WE COLLECT?</a></li>
                                    <li><a href="#section2" className="text-blue-400 hover:text-blue-300 underline">HOW DO WE PROCESS YOUR INFORMATION?</a></li>
                                    <li><a href="#section3" className="text-blue-400 hover:text-blue-300 underline">WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?</a></li>
                                    <li><a href="#section4" className="text-blue-400 hover:text-blue-300 underline">WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a></li>
                                    <li><a href="#section5" className="text-blue-400 hover:text-blue-300 underline">DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?</a></li>
                                    <li><a href="#section6" className="text-blue-400 hover:text-blue-300 underline">HOW DO WE HANDLE YOUR SOCIAL LOGINS?</a></li>
                                    <li><a href="#section7" className="text-blue-400 hover:text-blue-300 underline">HOW LONG DO WE KEEP YOUR INFORMATION?</a></li>
                                    <li><a href="#section8" className="text-blue-400 hover:text-blue-300 underline">HOW DO WE KEEP YOUR INFORMATION SAFE?</a></li>
                                    <li><a href="#section9" className="text-blue-400 hover:text-blue-300 underline">WHAT ARE YOUR PRIVACY RIGHTS?</a></li>
                                    <li><a href="#section10" className="text-blue-400 hover:text-blue-300 underline">CONTROLS FOR DO-NOT-TRACK FEATURES</a></li>
                                    <li><a href="#section11" className="text-blue-400 hover:text-blue-300 underline">DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</a></li>
                                    <li><a href="#section12" className="text-blue-400 hover:text-blue-300 underline">DO OTHER REGIONS HAVE SPECIFIC PRIVACY RIGHTS?</a></li>
                                    <li><a href="#section13" className="text-blue-400 hover:text-blue-300 underline">DO WE MAKE UPDATES TO THIS NOTICE?</a></li>
                                    <li><a href="#section14" className="text-blue-400 hover:text-blue-300 underline">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a></li>
                                    <li><a href="#section15" className="text-blue-400 hover:text-blue-300 underline">HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</a></li>
                                </ol>
                            </div>


                            {/* Section 1 */}
                            <div id="section1">
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">1. WHAT INFORMATION DO WE COLLECT?</h2>

                                <h3 className="text-xl font-semibold text-zinc-100 mb-3">Personal information you disclose to us</h3>
                                <p className="mb-4 font-medium text-zinc-300">In Short: We collect personal information that you provide to us.</p>

                                <p className="mb-4">
                                    We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
                                </p>

                                <p className="mb-3 font-semibold text-zinc-100">Personal Information Provided by You.</p>
                                <p className="mb-3">The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:</p>
                                <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                                    <li>Names</li>
                                    <li>Passwords</li>
                                    <li>Email addresses</li>
                                </ul>

                                <p className="mb-4 font-semibold text-zinc-100">Sensitive Information.</p>
                                <p className="mb-4">We do not process sensitive information.</p>

                                <p className="mb-3 font-semibold text-zinc-100">Payment Data.</p>
                                <p className="mb-4">
                                    We may collect data necessary to process your payment if you choose to make purchases, such as your payment instrument number, and the security code associated with your payment instrument. All payment data is handled and stored by Paddle. You may find their privacy notice <a href="https://www.paddle.com/legal/privacy" className="text-blue-400 hover:text-blue-300 underline">here</a>.
                                </p>

                                <p className="mb-3 font-semibold text-zinc-100">Social Media Login Data.</p>
                                <p className="mb-4">
                                    We may provide you with the option to register with us using your existing social media account details, like your Facebook, X, or other social media account. If you choose to register in this way, we will collect certain profile information about you from the social media provider, as described in the section called "HOW DO WE HANDLE YOUR SOCIAL LOGINS?" below.
                                </p>

                                <p className="mb-4">
                                    All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
                                </p>

                                <h3 className="text-xl font-semibold text-zinc-100 mb-3">Google API</h3>
                                <p className="mb-4">
                                    Our use of information received from Google APIs will adhere to Google API Services User Data Policy, including the Limited Use requirements.
                                </p>
                            </div>


                            {/* Section 2 */}
                            <div id="section2">
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
                                <p className="mb-4 font-medium text-zinc-300">In Short: We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.</p>

                                <p className="mb-4">
                                    We process the personal information for the following purposes listed below. We may also process your information for other purposes only with your prior explicit consent.
                                </p>

                                <p className="mb-3">We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                                    <li><strong className="text-zinc-100">To facilitate account creation and authentication and otherwise manage user accounts.</strong> We may process your information so you can create and log in to your account, as well as keep your account in working order.</li>
                                    <li><strong className="text-zinc-100">To request feedback.</strong> We may process your information when necessary to request feedback and to contact you about your use of our Services.</li>
                                    <li><strong className="text-zinc-100">To send you marketing and promotional communications.</strong> We may process the personal information you send to us for our marketing purposes, if this is in accordance with your marketing preferences. You can opt out of our marketing emails at any time.</li>
                                    <li><strong className="text-zinc-100">To protect our Services.</strong> We may process your information as part of our efforts to keep our Services safe and secure, including fraud monitoring and prevention.</li>
                                    <li><strong className="text-zinc-100">To identify usage trends.</strong> We may process information about how you use our Services to better understand how they are being used so we can improve them.</li>
                                    <li><strong className="text-zinc-100">To save or protect an individual's vital interest.</strong> We may process your information when necessary to save or protect an individual's vital interest, such as to prevent harm.</li>
                                </ul>
                            </div>


                            {/* Section 3 */}
                            <div id="section3">
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</h2>
                                <p className="mb-4 font-medium text-zinc-300">In Short: We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with laws, to provide you with services to enter into or fulfill our contractual obligations, to protect your rights, or to fulfill our legitimate business interests.</p>

                                <p className="mb-4 font-semibold text-zinc-100">If you are located in the EU or UK, this section applies to you.</p>

                                <p className="mb-4">
                                    The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on in order to process your personal information. As such, we may rely on the following legal bases to process your personal information:
                                </p>

                                <ul className="list-disc list-inside space-y-3 ml-4 mb-6">
                                    <li>
                                        <strong className="text-zinc-100">Consent.</strong> We may process your information if you have given us permission (i.e., consent) to use your personal information for a specific purpose. You can withdraw your consent at any time.
                                    </li>
                                    <li>
                                        <strong className="text-zinc-100">Legitimate Interests.</strong> We may process your information when we believe it is reasonably necessary to achieve our legitimate business interests and those interests do not outweigh your interests and fundamental rights and freedoms. For example, we may process your personal information for some of the purposes described in order to:
                                        <ul className="list-disc list-inside space-y-1 ml-6 mt-2">
                                            <li>Send users information about special offers and discounts on our products and services</li>
                                            <li>Analyze how our Services are used so we can improve them to engage and retain users</li>
                                            <li>Diagnose problems and/or prevent fraudulent activities</li>
                                            <li>Understand how our users use our products and services so we can improve user experience</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <strong className="text-zinc-100">Legal Obligations.</strong> We may process your information where we believe it is necessary for compliance with our legal obligations, such as to cooperate with a law enforcement body or regulatory agency, exercise or defend our legal rights, or disclose your information as evidence in litigation in which we are involved.
                                    </li>
                                    <li>
                                        <strong className="text-zinc-100">Vital Interests.</strong> We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third party, such as situations involving potential threats to the safety of any person.
                                    </li>
                                </ul>

                                <p className="mb-4 font-semibold text-zinc-100">If you are located in Canada, this section applies to you.</p>

                                <p className="mb-4">
                                    We may process your information if you have given us specific permission (i.e., express consent) to use your personal information for a specific purpose, or in situations where your permission can be inferred (i.e., implied consent). You can withdraw your consent at any time.
                                </p>

                                <p className="mb-3">In some exceptional cases, we may be legally permitted under applicable law to process your information without your consent, including, for example:</p>
                                <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                                    <li>If collection is clearly in the interests of an individual and consent cannot be obtained in a timely way</li>
                                    <li>For investigations and fraud detection and prevention</li>
                                    <li>For business transactions provided certain conditions are met</li>
                                    <li>If it is contained in a witness statement and the collection is necessary to assess, process, or settle an insurance claim</li>
                                    <li>For identifying injured, ill, or deceased persons and communicating with next of kin</li>
                                    <li>If we have reasonable grounds to believe an individual has been, is, or may be victim of financial abuse</li>
                                    <li>If it is reasonable to expect collection and use with consent would compromise the availability or the accuracy of the information and the collection is reasonable for purposes related to investigating a breach of an agreement or a contravention of the laws of Canada or a province</li>
                                    <li>If disclosure is required to comply with a subpoena, warrant, court order, or rules of the court relating to the production of records</li>
                                    <li>If it was produced by an individual in the course of their employment, business, or profession and the collection is consistent with the purposes for which the information was produced</li>
                                    <li>If the collection is solely for journalistic, artistic, or literary purposes</li>
                                    <li>If the information is publicly available and is specified by the regulations</li>
                                </ul>
                                <p className="mb-4">We may disclose de-identified information for approved research or statistics projects, subject to ethics oversight and confidentiality commitments.</p>
                            </div>


                            {/* Section 4 */}
                            <div id="section4">
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
                                <p className="mb-4 font-medium text-zinc-300">In Short: We may share information in specific situations described in this section and/or with the following third parties.</p>

                                <p className="mb-3">We may need to share your personal information in the following situations:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                                    <li><strong className="text-zinc-100">Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                                </ul>
                            </div>


                            {/* Section 5 */}
                            <div id="section5">
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">5. DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?</h2>
                                <p className="mb-4 font-medium text-zinc-300">In Short: We offer products, features, or tools powered by artificial intelligence, machine learning, or similar technologies.</p>

                                <p className="mb-4">
                                    As part of our Services, we offer products, features, or tools powered by artificial intelligence, machine learning, or similar technologies (collectively, "AI Products"). These tools are designed to enhance your experience and provide you with innovative solutions. The terms in this Privacy Notice govern your use of the AI Products within our Services.
                                </p>

                                <h3 className="text-xl font-semibold text-zinc-100 mb-3">Use of AI Technologies</h3>
                                <p className="mb-4">
                                    We provide the AI Products through third-party service providers ("AI Service Providers"), including Anthropic, Amazon Web Services (AWS) AI, Deepgram and ElevenLabs. As outlined in this Privacy Notice, your input, output, and personal information will be shared with and processed by these AI Service Providers to enable your use of our AI Products for purposes outlined in "WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?" You must not use the AI Products in any way that violates the terms or policies of any AI Service Provider.
                                </p>

                                <h3 className="text-xl font-semibold text-zinc-100 mb-3">Our AI Products</h3>
                                <p className="mb-4">Our AI Products are designed for the following functions:</p>
                                <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                                    <li>AI applications</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-zinc-100 mb-3">How We Process Your Data Using AI</h3>
                                <p className="mb-4">
                                    All personal information processed using our AI Products is handled in line with our Privacy Notice and our agreement with third parties. This ensures high security and safeguards your personal information throughout the process, giving you peace of mind about your data's safety.
                                </p>
                            </div>


                            {/* Section 6 */}
                            <div id="section6">
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">6. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</h2>
                                <p className="mb-4 font-medium text-zinc-300">In Short: If you choose to register or log in to our Services using a social media account, we may have access to certain information about you.</p>

                                <p className="mb-4">
                                    Our Services offer you the ability to register and log in using your third-party social media account details (like your Facebook or X logins). Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile information we receive may vary depending on the social media provider concerned, but will often include your name, email address, friends list, and profile picture, as well as other information you choose to make public on such a social media platform.
                                </p>

                                <p className="mb-4">
                                    We will use the information we receive only for the purposes that are described in this Privacy Notice or that are otherwise made clear to you on the relevant Services. Please note that we do not control, and are not responsible for, other uses of your personal information by your third-party social media provider. We recommend that you review their privacy notice to understand how they collect, use, and share your personal information, and how you can set your privacy preferences on their sites and apps.
                                </p>
                            </div>


                            {/* Section 7 */}
                            <div id="section7">
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">7. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
                                <p className="mb-4 font-medium text-zinc-300">In Short: We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.</p>

                                <p className="mb-4">
                                    We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.
                                </p>

                                <p className="mb-4">
                                    When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
                                </p>
                            </div>


                            {/* Section 8 */}
                            <div id="section8">
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">8. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
                                <p className="mb-4 font-medium text-zinc-300">In Short: We aim to protect your personal information through a system of organizational and technical security measures.</p>

                                <p className="mb-4">
                                    We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.
                                </p>
                            </div>


                            {/* Section 9 */}
                            <div id="section9">
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">9. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
                                <p className="mb-4 font-medium text-zinc-300">In Short: Depending on your state of residence in the US or in some regions, such as the European Economic Area (EEA), United Kingdom (UK), Switzerland, and Canada, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.</p>

                                <p className="mb-4">
                                    In some regions (like the EEA, UK, Switzerland, and Canada), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; (iv) if applicable, to data portability; and (v) not to be subject to automated decision-making. If a decision that produces legal or similarly significant effects is made solely by automated means, we will inform you, explain the main factors, and offer a simple way to request human review. In certain circumstances, you may also have the right to object to the processing of your personal information. You can make such a request by contacting us by using the contact details provided in the section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?" below.
                                </p>

                                <p className="mb-4">We will consider and act upon any request in accordance with applicable data protection laws.</p>

                                <p className="mb-4">If you are located in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your Member State data protection authority or UK data protection authority.</p>

                                <p className="mb-4">If you are located in Switzerland, you may contact the Federal Data Protection and Information Commissioner.</p>

                                <p className="mb-4">
                                    <strong className="text-zinc-100">Withdrawing your consent:</strong> If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?" below.
                                </p>

                                <p className="mb-4">
                                    However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.
                                </p>

                                <p className="mb-4">
                                    <strong className="text-zinc-100">Opting out of marketing and promotional communications:</strong> You can unsubscribe from our marketing and promotional communications at any time by clicking on the unsubscribe link in the emails that we send, or by contacting us using the details provided in the section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?" below. You will then be removed from the marketing lists. However, we may still communicate with you — for example, to send you service-related messages that are necessary for the administration and use of your account, to respond to service requests, or for other non-marketing purposes.
                                </p>

                                <h3 className="text-xl font-semibold text-zinc-100 mb-3">Account Information</h3>
                                <p className="mb-3">If you would at any time like to review or change the information in your account or terminate your account, you can:</p>
                                <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                                    <li>Contact us using the contact information provided.</li>
                                </ul>
                                <p className="mb-4">
                                    Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.
                                </p>

                                <p className="mb-4">
                                    If you have questions or comments about your privacy rights, you may email us at <a href="mailto:businesscontact422@gmail.com" className="text-blue-400 hover:text-blue-300 underline">businesscontact422@gmail.com</a>.
                                </p>
                            </div>


                            {/* Section 10 */}
                            <div id="section10">
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">10. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
                                <p className="mb-4">
                                    Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Notice.
                                </p>

                                <p className="mb-4">
                                    California law requires us to let you know how we respond to web browser DNT signals. Because there currently is not an industry or legal standard for recognizing or honoring DNT signals, we do not respond to them at this time.
                                </p>
                            </div>


                            {/* Section 11 */}
                            <div id="section11">
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">11. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h2>
                                <p className="mb-4 font-medium text-zinc-300">In Short: If you are a resident of California, Colorado, Connecticut, Delaware, Florida, Indiana, Iowa, Kentucky, Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Rhode Island, Tennessee, Texas, Utah, or Virginia, you may have the right to request access to and receive details about the personal information we maintain about you and how we have processed it, correct inaccuracies, get a copy of, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law. More information is provided below.</p>

                                <h3 className="text-xl font-semibold text-zinc-100 mb-3">Categories of Personal Information We Collect</h3>
                                <p className="mb-4">
                                    The table below shows the categories of personal information we have collected in the past twelve (12) months. The table includes illustrative examples of each category and does not reflect the personal information we collect from you. For a comprehensive inventory of all personal information we process, please refer to the section "WHAT INFORMATION DO WE COLLECT?"
                                </p>

                                <div className="space-y-4 mb-6">
                                    <div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700/30">
                                        <h4 className="font-semibold text-zinc-100 mb-2">A. Identifiers</h4>
                                        <p className="text-sm text-zinc-300 mb-2">Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address, and account name</p>
                                        <p className="text-sm font-semibold text-red-400">NO</p>
                                    </div>

                                    <div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700/30">
                                        <h4 className="font-semibold text-zinc-100 mb-2">B. Personal information as defined in the California Customer Records statute</h4>
                                        <p className="text-sm text-zinc-300 mb-2">Name, contact information, education, employment, employment history, and financial information</p>
                                        <p className="text-sm font-semibold text-red-400">NO</p>
                                    </div>

                                    <div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700/30">
                                        <h4 className="font-semibold text-zinc-100 mb-2">C. Protected classification characteristics under state or federal law</h4>
                                        <p className="text-sm text-zinc-300 mb-2">Gender, age, date of birth, race and ethnicity, national origin, marital status, and other demographic data</p>
                                        <p className="text-sm font-semibold text-red-400">NO</p>
                                    </div>

                                    <div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700/30">
                                        <h4 className="font-semibold text-zinc-100 mb-2">D. Commercial information</h4>
                                        <p className="text-sm text-zinc-300 mb-2">Transaction information, purchase history, financial details, and payment information</p>
                                        <p className="text-sm font-semibold text-red-400">NO</p>
                                    </div>

                                    <div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700/30">
                                        <h4 className="font-semibold text-zinc-100 mb-2">E. Biometric information</h4>
                                        <p className="text-sm text-zinc-300 mb-2">Fingerprints and voiceprints</p>
                                        <p className="text-sm font-semibold text-red-400">NO</p>
                                    </div>

                                    <div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700/30">
                                        <h4 className="font-semibold text-zinc-100 mb-2">F. Internet or other similar network activity</h4>
                                        <p className="text-sm text-zinc-300 mb-2">Browsing history, search history, online behavior, interest data, and interactions with our and other websites, applications, systems, and advertisements</p>
                                        <p className="text-sm font-semibold text-red-400">NO</p>
                                    </div>

                                    <div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700/30">
                                        <h4 className="font-semibold text-zinc-100 mb-2">G. Geolocation data</h4>
                                        <p className="text-sm text-zinc-300 mb-2">Device location</p>
                                        <p className="text-sm font-semibold text-red-400">NO</p>
                                    </div>

                                    <div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700/30">
                                        <h4 className="font-semibold text-zinc-100 mb-2">H. Audio, electronic, sensory, or similar information</h4>
                                        <p className="text-sm text-zinc-300 mb-2">Images and audio, video or call recordings created in connection with our business activities</p>
                                        <p className="text-sm font-semibold text-red-400">NO</p>
                                    </div>

                                    <div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700/30">
                                        <h4 className="font-semibold text-zinc-100 mb-2">I. Professional or employment-related information</h4>
                                        <p className="text-sm text-zinc-300 mb-2">Business contact details in order to provide you our Services at a business level or job title, work history, and professional qualifications if you apply for a job with us</p>
                                        <p className="text-sm font-semibold text-red-400">NO</p>
                                    </div>

                                    <div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700/30">
                                        <h4 className="font-semibold text-zinc-100 mb-2">J. Education Information</h4>
                                        <p className="text-sm text-zinc-300 mb-2">Student records and directory information</p>
                                        <p className="text-sm font-semibold text-red-400">NO</p>
                                    </div>

                                    <div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700/30">
                                        <h4 className="font-semibold text-zinc-100 mb-2">K. Inferences drawn from collected personal information</h4>
                                        <p className="text-sm text-zinc-300 mb-2">Inferences drawn from any of the collected personal information listed above to create a profile or summary about, for example, an individual's preferences and characteristics</p>
                                        <p className="text-sm font-semibold text-red-400">NO</p>
                                    </div>

                                    <div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700/30">
                                        <h4 className="font-semibold text-zinc-100 mb-2">L. Sensitive personal Information</h4>
                                        <p className="text-sm text-zinc-300 mb-2"></p>
                                        <p className="text-sm font-semibold text-red-400">NO</p>
                                    </div>
                                </div>

                                <p className="mb-4">We may also collect other personal information outside of these categories through instances where you interact with us in person, online, or by phone or mail in the context of:</p>
                                <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                                    <li>Receiving help through our customer support channels;</li>
                                    <li>Participation in customer surveys or contests; and</li>
                                    <li>Facilitation in the delivery of our Services and to respond to your inquiries.</li>
                                </ul>
                                <p className="mb-4">We will use and retain the collected personal information as needed to provide the Services or for: Category H - 1 year</p>

                                <h3 className="text-xl font-semibold text-zinc-100 mb-3">Sources of Personal Information</h3>
                                <p className="mb-4">Learn more about the sources of personal information we collect in "WHAT INFORMATION DO WE COLLECT?"</p>

                                <h3 className="text-xl font-semibold text-zinc-100 mb-3">How We Use and Share Personal Information</h3>
                                <p className="mb-4">Learn more about how we use your personal information in the section, "HOW DO WE PROCESS YOUR INFORMATION?"</p>

                                <h3 className="text-xl font-semibold text-zinc-100 mb-3">Will your information be shared with anyone else?</h3>
                                <p className="mb-4">
                                    We may disclose your personal information with our service providers pursuant to a written contract between us and each service provider. Learn more about how we disclose personal information to in the section, "WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?"
                                </p>

                                <p className="mb-4">
                                    We may use your personal information for our own business purposes, such as for undertaking internal research for technological development and demonstration. This is not considered to be "selling" of your personal information.
                                </p>

                                <p className="mb-4">
                                    We have not disclosed, sold, or shared any personal information to third parties for a business or commercial purpose in the preceding twelve (12) months. We will not sell or share personal information in the future belonging to website visitors, users, and other consumers.
                                </p>
                                <h3 className="text-xl font-semibold text-zinc-100 mb-3">Your Rights</h3>
                                <p className="mb-3">You have rights under certain US state data protection laws. However, these rights are not absolute, and in certain cases, we may decline your request as permitted by law. These rights include:</p>
                                <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                                    <li>Right to know whether or not we are processing your personal data</li>
                                    <li>Right to access your personal data</li>
                                    <li>Right to correct inaccuracies in your personal data</li>
                                    <li>Right to request the deletion of your personal data</li>
                                    <li>Right to obtain a copy of the personal data you previously shared with us</li>
                                    <li>Right to non-discrimination for exercising your rights</li>
                                    <li>Right to opt out of the processing of your personal data if it is used for targeted advertising (or sharing as defined under California's privacy law), the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects ("profiling")</li>
                                </ul>

                                <p className="mb-3">Depending upon the state where you live, you may also have the following rights:</p>
                                <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                                    <li>Right to access the categories of personal data being processed (as permitted by applicable law, including the privacy law in Minnesota)</li>
                                    <li>Right to obtain a list of the categories of third parties to which we have disclosed personal data (as permitted by applicable law, including the privacy law in California, Delaware, and Maryland)</li>
                                    <li>Right to obtain a list of specific third parties to which we have disclosed personal data (as permitted by applicable law, including the privacy law in Minnesota and Oregon)</li>
                                    <li>Right to review, understand, question, and correct how personal data has been profiled (as permitted by applicable law, including the privacy law in Minnesota)</li>
                                    <li>Right to limit use and disclosure of sensitive personal data (as permitted by applicable law, including the privacy law in California)</li>
                                    <li>Right to opt out of the collection of sensitive data and personal data collected through the operation of a voice or facial recognition feature (as permitted by applicable law, including the privacy law in Florida)</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-zinc-100 mb-3">How to Exercise Your Rights</h3>
                                <p className="mb-4">
                                    To exercise these rights, you can contact us by submitting a data subject access request, by emailing us at <a href="mailto:businesscontact422@gmail.com" className="text-blue-400 hover:text-blue-300 underline">businesscontact422@gmail.com</a>, or by referring to the contact details at the bottom of this document.
                                </p>

                                <p className="mb-4">We will honor your opt-out preferences if you enact the Global Privacy Control (GPC) opt-out signal on your browser.</p>

                                <p className="mb-4">
                                    Under certain US state data protection laws, you can designate an authorized agent to make a request on your behalf. We may deny a request from an authorized agent that does not submit proof that they have been validly authorized to act on your behalf in accordance with applicable laws.
                                </p>

                                <h3 className="text-xl font-semibold text-zinc-100 mb-3">Request Verification</h3>
                                <p className="mb-4">
                                    Upon receiving your request, we will need to verify your identity to determine you are the same person about whom we have the information in our system. We will only use personal information provided in your request to verify your identity or authority to make the request. However, if we cannot verify your identity from the information already maintained by us, we may request that you provide additional information for the purposes of verifying your identity and for security or fraud-prevention purposes.
                                </p>

                                <p className="mb-4">
                                    If you submit the request through an authorized agent, we may need to collect additional information to verify your identity before processing your request and the agent will need to provide a written and signed permission from you to submit such request on your behalf.
                                </p>

                                <h3 className="text-xl font-semibold text-zinc-100 mb-3">Appeals</h3>
                                <p className="mb-4">
                                    Under certain US state data protection laws, if we decline to take action regarding your request, you may appeal our decision by emailing us at <a href="mailto:businesscontact422@gmail.com" className="text-blue-400 hover:text-blue-300 underline">businesscontact422@gmail.com</a>. We will inform you in writing of any action taken or not taken in response to the appeal, including a written explanation of the reasons for the decisions. If your appeal is denied, you may submit a complaint to your state attorney general.
                                </p>

                                <h3 className="text-xl font-semibold text-zinc-100 mb-3">California "Shine The Light" Law</h3>
                                <p className="mb-4">
                                    California Civil Code Section 1798.83, also known as the "Shine The Light" law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us by using the contact details provided in the section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?"
                                </p>
                            </div>


                            {/* Section 12 */}
                            <div id="section12">
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">12. DO OTHER REGIONS HAVE SPECIFIC PRIVACY RIGHTS?</h2>
                                <p className="mb-4 font-medium text-zinc-300">In Short: You may have additional rights based on the country you reside in.</p>

                                <h3 className="text-xl font-semibold text-zinc-100 mb-3">Australia and New Zealand</h3>
                                <p className="mb-4">
                                    We collect and process your personal information under the obligations and conditions set by Australia's Privacy Act 1988 and New Zealand's Privacy Act 2020 (Privacy Act).
                                </p>

                                <p className="mb-4">
                                    This Privacy Notice satisfies the notice requirements defined in both Privacy Acts, in particular: what personal information we collect from you, from which sources, for which purposes, and other recipients of your personal information.
                                </p>

                                <p className="mb-3">If you do not wish to provide the personal information necessary to fulfill their applicable purpose, it may affect our ability to provide our services, in particular:</p>
                                <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                                    <li>offer you the products or services that you want</li>
                                    <li>respond to or help with your requests</li>
                                    <li>manage your account with us</li>
                                    <li>confirm your identity and protect your account</li>
                                </ul>
                                <p className="mb-4">
                                    At any time, you have the right to request access to or correction of your personal information. You can make such a request by contacting us by using the contact details provided in the section "HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?"
                                </p>

                                <p className="mb-4">
                                    If you believe we are unlawfully processing your personal information, you have the right to submit a complaint about a breach of the Australian Privacy Principles to the Office of the Australian Information Commissioner and a breach of New Zealand's Privacy Principles to the Office of New Zealand Privacy Commissioner.
                                </p>

                                <h3 className="text-xl font-semibold text-zinc-100 mb-3">Republic of South Africa</h3>
                                <p className="mb-4">
                                    At any time, you have the right to request access to or correction of your personal information. You can make such a request by contacting us by using the contact details provided in the section "HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?"
                                </p>

                                <p className="mb-4">If you are unsatisfied with the manner in which we address any complaint with regard to our processing of personal information, you can contact the office of the regulator, the details of which are:</p>

                                <div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700/30 mb-4">
                                    <h4 className="font-semibold text-zinc-100 mb-2">The Information Regulator (South Africa)</h4>
                                    <p className="text-sm text-zinc-300">General enquiries: <a href="mailto:enquiries@inforegulator.org.za" className="text-blue-400 hover:text-blue-300 underline">enquiries@inforegulator.org.za</a></p>
                                    <p className="text-sm text-zinc-300">Complaints (complete POPIA/PAIA form 5): <a href="mailto:PAIAComplaints@inforegulator.org.za" className="text-blue-400 hover:text-blue-300 underline">PAIAComplaints@inforegulator.org.za</a> & <a href="mailto:POPIAComplaints@inforegulator.org.za" className="text-blue-400 hover:text-blue-300 underline">POPIAComplaints@inforegulator.org.za</a></p>
                                </div>
                            </div>


                            {/* Section 13 */}
                            <div id="section13">
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">13. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
                                <p className="mb-4 font-medium text-zinc-300">In Short: Yes, we will update this notice as necessary to stay compliant with relevant laws.</p>

                                <p className="mb-4">
                                    We may update this Privacy Notice from time to time. The updated version will be indicated by an updated "Revised" date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this Privacy Notice frequently to be informed of how we are protecting your information.
                                </p>
                            </div>


                            {/* Section 14 */}
                            <div id="section14">
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">14. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
                                <p className="mb-4">
                                    If you have questions or comments about this notice, you may email us at <a href="mailto:businesscontact422@gmail.com" className="text-blue-400 hover:text-blue-300 underline">businesscontact422@gmail.com</a> or contact us by post at:
                                </p>

                                <div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700/30 mb-4">
                                    <p className="text-zinc-300">eloquent AI</p>
                                    <p className="text-zinc-300">lodhran</p>
                                    <p className="text-zinc-300">lodhran</p>
                                    <p className="text-zinc-300">lodhran, punjab 59659</p>
                                    <p className="text-zinc-300">Pakistan</p>
                                </div>
                            </div>


                            {/* Section 15 */}
                            <div id="section15">
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4">15. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2>
                                <p className="mb-4">
                                    Based on the applicable laws of your country or state of residence in the US, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law. To request to review, update, or delete your personal information, please fill out and submit a data subject access request.
                                </p>
                            </div>

                            <div className="pt-6 border-t border-zinc-700">
                                <p className="text-sm text-zinc-400">
                                    Last updated: July 27, 2025
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default PrivacyPolicyPage;
