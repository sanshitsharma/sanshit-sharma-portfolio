'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  ChevronDown, Download, Terminal, ChevronRight, 
  Trophy, BookOpen, Fingerprint, Award, FileText, Lightbulb, ExternalLink
} from 'lucide-react';
import AnimatedBackground from './components/AnimatedBackground';

// Complete Resume Data Structure
const resumeData = {
  basics: {
    name: "Sanshit Sharma",
    title: "Senior GenAI Platform Engineer",
    location: "Milpitas, CA 95035",
    email: "sanshit.sharma@gmail.com",
    phone: "408-250-5749",
    links:[
      "linkedin.com/in/sanshitsharma"
    ],
    summary: "GenAI software engineer with 12+ years building distributed systems at AWS, Cisco, and Qualcomm. Currently building Amazon Bedrock's core infrastructure; Model Migration, Model Evaluation and ML pipelines serving thousands of enterprise customers. Combines deep systems expertise with AI-assisted development practices to accelerate delivery velocity while maintaining production-grade quality. Shipped multiple AWS re:Invent launches (2023, 2025). Patent holder."
  },
  impactMetrics:[
    { metric: "4w→2d", context: "Reduced model onboarding time from 4 weeks to 2 days" },
    { metric: "80%", context: "Reduced MTTR via AI root cause analysis using few-shot learning" },
    { metric: "77%", context: "Container image reduction (3GB → 700MB) for production pipelines" }
  ],
  experience:[
    {
      company: "Amazon Web Services (AWS)",
      role: "Software Development Engineer II",
      dates: "March 2022 - Present",
      location: "San Francisco Bay Area",
      bullets:[
        "Bedrock Model Migration Service (re:Invent 2025)",
        "• Designed generic prompt extraction framework using JSON schemas to parse any InvokeModel payload, eliminating hardcoded model-specific parsers. Reduced time to onboard new models from 4 weeks to 2 days.",
        "• Owned end-to-end workflow orchestration—designed and implemented Step Functions & Lambda definitions and integrations across the 3-stage migration workflow",
        "• Defined AppSec-approved IAM policy templates enabling one-click execution role creation. Required deep cross-service expertise to define least-privilege permissions that protect customer accounts while ensuring runtime reliability.",
        "Model Migration Ops Tool",
        "• Proactively designed and built a greenfield AI-powered Ops Tool, consolidating job telemetry across 3 service accounts from Step Functions, Lambdas, and CloudWatch into a unified debugging interface",
        "• Implemented AI-driven root cause analysis: Users click \"Analyze with AI\" to send error logs to a model with a custom few-shot learning prompt, identifying primary failure causes and tertiary issues. Reduced MTTR by 80%",
        "RAI Assessments Production Pipeline",
        "• Transformed research package into production pipeline across 12 AWS regions. Led 2 L4 engineers building CI/CD with integration tests",
        "• Achieved 77% container image reduction (3GB → 700MB) and 80% build time improvement (~10 min → <2 min)",
        "RFT Evaluation Framework",
        "• Designed and implemented an end-to-end evaluation framework for Model Customization's flywheel in 1.5 weeks. Leveraged AI-assisted development (Kiro) to rapidly prototype and iterate on CDK infrastructure, state machine definitions, and Lambda handlers",
        "Bedrock Model Evaluation (re:Invent 2023)",
        "• Designed and developed the control plane and APIs for model evaluations, enabling scalable evaluation processes for foundation models on Bedrock"
      ]
    },
    {
      company: "Cisco Systems",
      role: "Senior Software Engineer",
      dates: "May 2015 - March 2022",
      location: "San Jose, California",
      bullets:[
        "• Technical lead for Crosswork Change Automation—designed cloud-deployable application for closed-loop automation in network data centers leveraging streaming telemetry for real-time device monitoring (Patent granted)",
        "• Delivered REST microservice application for change automation supporting pre/post checks with automatic rollback",
        "• Developed key modules for streaming telemetry in Cisco devices (C, C++, Python); presented at Cisco Live 2016",
        "• Created Cython interface wrapping C++ DME libraries for Python telemetry; integrated with Splunk and Elasticsearch"
      ]
    },
    {
      company: "Qualcomm Technologies Inc.",
      role: "Software Development Engineer",
      dates: "January 2013 - May 2015",
      location: "San Diego, California",
      bullets:[
        "• Software development in C/C++ for mobile device modems across cellular protocols (GSM, LTE, Voice Over LTE)",
        "• Led software commercialization for customers in North America and Asia Pacific"
      ]
    }
  ],
  skills:[
    { group: "Languages", items:["Java", "Python", "GoLang"] },
    { group: "AWS & AI/ML", items:["Bedrock", "SageMaker", "Lambda", "Step Functions", "CDK", "CloudWatch", "DynamoDB", "S3"] },
    { group: "Infrastructure", items:["Distributed Systems", "State Machines", "CI/CD Pipelines", "Microservices"] },
    { group: "Data & Messaging", items:["Kafka", "gRPC", "REST APIs", "PostgreSQL"] },
    { group: "Development", items:["AI-assisted development (Kiro, Claude Code, Wasabi)", "Rapid prototyping", "Test-driven development"] }
  ],
  education:[
    { institution: "University of Cincinnati, Ohio", degree: "M.S., Computer Science", dates: "November 2012", gpa: "3.82" },
    { institution: "MANIT, Bhopal, India", degree: "B.Tech, Computer Science and Engineering", dates: "May 2008", gpa: null }
  ],
  patents:[
    {
      title: "Continuous Monitoring of Network Devices During Maintenance",
      details: "US Patent Application US20200358648A1, Cisco Technology Inc., Filed October 2019",
      link: "https://patents.google.com/patent/US20200358648A1/en"
    }
  ],
  publications:[
    {
      title: "T-Hex: True Hexagonal Regular Topology Formation in Large Scale Wireless Sensor Networks",
      details: "IEEE MASS 2012",
      link: "https://ieeexplore.ieee.org/document/6493538"
    }
  ],
  awards:[
    "Multiple re:Invent launches on Amazon Bedrock (2023, 2025) — AWS's flagship GenAI platform",
    "Certified Amazon Security Guardian: Helped multiple teams build secure architecture. Engagement from design to delivery.",
    "Five Cisco Connected Recognition awards for project contributions",
    "Two Qualcomm Star Awards for GSM/TDS modem development and SGLTE commercialization"
  ]
};

export default function Portfolio() {
  const[showSplash, setShowSplash] = useState(true);
  const[openExpIndex, setOpenExpIndex] = useState<number | null>(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1800);
    return () => clearTimeout(timer);
  },[]);

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="relative min-h-screen font-sans selection:bg-cyan-500/30">
      <AnimatedBackground />

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-cyan-400 origin-left z-50"
        style={{ scaleX }}
      />

      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative flex items-center justify-center w-24 h-24 mb-8 rounded-2xl bg-white/5 border border-white/10 shadow-[0_0_40px_rgba(103,232,249,0.2)]"
            >
              <Terminal className="w-10 h-10 text-cyan-400" />
            </motion.div>
            <div className="w-48 h-1 overflow-hidden rounded-full bg-white/10">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                className="w-full h-full bg-cyan-400"
              />
            </div>
            <p className="mt-4 text-sm tracking-widest text-slate-400 uppercase">Initializing OS...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-5xl px-6 py-24 mx-auto space-y-32">
        
        {/* HERO SECTION */}
        <section className="relative flex flex-col items-start pt-12 md:pt-24 min-h-[70vh] justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <div className="inline-flex items-center px-3 py-1 mb-6 space-x-2 text-sm border rounded-full text-cyan-400 border-cyan-400/30 bg-cyan-400/10 backdrop-blur-md">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-cyan-400"></span>
                <span className="relative inline-flex w-2 h-2 rounded-full bg-cyan-500"></span>
              </span>
              <span>Available for next challenge</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
              {resumeData.basics.name}
            </h1>
            <h2 className="mt-4 text-2xl font-light text-slate-300 md:text-4xl bg-clip-text">
              {resumeData.basics.title}
            </h2>
            <p className="max-w-2xl mt-8 text-lg leading-relaxed text-slate-400">
              {resumeData.basics.summary}
            </p>

            <div className="flex flex-col gap-4 mt-10 sm:flex-row">
              <a href="#experience" className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-black transition-all rounded-lg bg-cyan-400 hover:bg-cyan-300 hover:scale-105 active:scale-95">
                View Experience
                <ChevronDown className="w-4 h-4 ml-2" />
              </a>
              <button onClick={handleDownload} className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white transition-all border rounded-lg bg-white/5 border-white/10 hover:bg-white/10 hover:scale-105 active:scale-95 backdrop-blur-sm">
                Download Resume
                <Download className="w-4 h-4 ml-2" />
              </button>
            </div>
          </motion.div>
        </section>

        {/* IMPACT HIGHLIGHTS */}
        <section className="relative z-10">
          <motion.div 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="grid grid-cols-1 gap-4 md:grid-cols-3"
          >
            {resumeData.impactMetrics.map((item, i) => (
              <div key={i} className="p-6 transition-all rounded-xl glass-card hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(103,232,249,0.15)] group">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 to-blue-600 mb-2 group-hover:scale-110 origin-left transition-transform">
                  {item.metric}
                </div>
                <p className="text-sm text-slate-400">{item.context}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* EXPERIENCE TIMELINE */}
        <section id="experience" className="relative z-10 space-y-8 scroll-mt-24">
          <div className="flex items-center gap-3 mb-12">
            <Fingerprint className="w-8 h-8 text-cyan-400" />
            <h3 className="text-3xl font-bold text-white">Experience</h3>
          </div>

          <div className="space-y-4">
            {resumeData.experience.map((job, idx) => (
              <div key={idx} className="overflow-hidden transition-all border rounded-xl glass-card">
                <button
                  onClick={() => setOpenExpIndex(openExpIndex === idx ? null : idx)}
                  className="flex flex-col items-start w-full p-6 text-left sm:flex-row sm:items-center sm:justify-between hover:bg-white/5"
                >
                  <div>
                    <h4 className="text-xl font-bold text-white">{job.company}</h4>
                    <p className="text-cyan-400">{job.role}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-2 sm:mt-0">
                    <span className="text-sm text-slate-500">{job.dates}</span>
                    <motion.div animate={{ rotate: openExpIndex === idx ? 180 : 0 }}>
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {openExpIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-white/10"
                    >
                      <ul className="p-6 space-y-3">
                        {job.bullets.map((bullet, bIdx) => {
                          const isHighlight = bullet.includes('re:Invent') || bullet.includes('Reduced MTTR') || bullet.includes('Patent granted');
                          return (
                            <li key={bIdx} className="flex items-start gap-3">
                              <ChevronRight className={`w-5 h-5 mt-0.5 shrink-0 ${isHighlight ? 'text-cyan-400' : 'text-slate-600'}`} />
                              <span className={`text-sm leading-relaxed ${isHighlight ? 'text-slate-200 font-medium' : 'text-slate-400'}`}>
                                {bullet}
                              </span>
                            </li>
                          )
                        })}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS ARSENAL */}
        <section className="relative z-10 space-y-8">
           <div className="flex items-center gap-3 mb-8">
            <Terminal className="w-8 h-8 text-cyan-400" />
            <h3 className="text-3xl font-bold text-white">Technical Arsenal</h3>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resumeData.skills.map((skillGroup, i) => (
              <div key={i} className="p-6 border rounded-xl glass-card">
                <h4 className="mb-4 text-lg font-medium text-white">{skillGroup.group}</h4>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, j) => (
                    <span key={j} className="px-3 py-1 text-xs border rounded-md text-slate-300 border-white/10 bg-white/5">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RESEARCH & INTELLECTUAL PROPERTY */}
        <section className="relative z-10 space-y-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            
            {/* Patents */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-cyan-400" />
                <h3 className="text-3xl font-bold text-white">Patents</h3>
              </div>
              {resumeData.patents.map((patent, i) => (
                <a key={i} href={patent.link} target="_blank" rel="noopener noreferrer" className="block p-6 transition-all border rounded-xl glass-card hover:border-cyan-400/50 hover:bg-white/10 group">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="font-bold text-white transition-colors group-hover:text-cyan-400">&quot;{patent.title}&quot;</h4>
                    <ExternalLink className="w-5 h-5 transition-colors shrink-0 text-slate-500 group-hover:text-cyan-400" />
                  </div>
                  <p className="mt-3 text-sm text-slate-400">{patent.details}</p>
                </a>
              ))}
            </div>

            {/* Publications */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-cyan-400" />
                <h3 className="text-3xl font-bold text-white">Publications</h3>
              </div>
              {resumeData.publications.map((pub, i) => (
                <a key={i} href={pub.link} target="_blank" rel="noopener noreferrer" className="block p-6 transition-all border rounded-xl glass-card hover:border-cyan-400/50 hover:bg-white/10 group">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="font-bold text-white transition-colors group-hover:text-cyan-400">&quot;{pub.title}&quot;</h4>
                    <ExternalLink className="w-5 h-5 transition-colors shrink-0 text-slate-500 group-hover:text-cyan-400" />
                  </div>
                  <p className="mt-3 text-sm text-slate-400">{pub.details}</p>
                </a>
              ))}
            </div>

          </div>
        </section>

        {/* ACCOLADES & FOUNDATION */}
        <section className="relative z-10 grid grid-cols-1 gap-12 pb-24 md:grid-cols-2">
          
          <div className="space-y-12">
            {/* Education */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-cyan-400" />
                <h3 className="text-2xl font-bold text-white">Education</h3>
              </div>
              <div className="space-y-4">
                {resumeData.education.map((edu, i) => (
                  <div key={i} className="p-5 border rounded-xl glass-card">
                    <h4 className="font-bold text-white">{edu.institution}</h4>
                    <div className="flex justify-between mt-2 text-sm text-slate-400">
                      <span>{edu.degree}</span>
                      <div className="space-x-4">
                        {edu.gpa && <span className="text-cyan-400">GPA: {edu.gpa}</span>}
                        <span>{edu.dates}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-12">
            {/* Awards */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Trophy className="w-6 h-6 text-cyan-400" />
                <h3 className="text-2xl font-bold text-white">Achievements</h3>
              </div>
              <div className="space-y-3">
                {resumeData.awards.map((award, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 border rounded-lg glass-card text-slate-300 hover:bg-white/5 transition-colors">
                    <Award className="w-5 h-5 shrink-0 text-yellow-500/70" />
                    <span className="text-sm">{award}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact / Links */}
            <div className="p-6 border bg-cyan-900/10 border-cyan-400/20 rounded-xl">
              <h4 className="mb-4 text-lg font-bold text-white">Connect</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <p>{resumeData.basics.email}</p>
                <p>{resumeData.basics.phone}</p>
                <p>{resumeData.basics.location}</p>
                <div className="pt-4 space-y-2">
                  {resumeData.basics.links.map((link, i) => (
                    <a key={i} href={`https://${link}`} target="_blank" rel="noopener noreferrer" className="block text-cyan-400 hover:underline">
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}