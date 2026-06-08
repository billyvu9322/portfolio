"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { durationLabel, formatMonths, monthsBetween } from "@/lib/duration";
import { MatrixRain } from "@/components/TerminalComp/effects";
import {
  CHATI_INTERN_START,
  CHATI_INTERN_END,
  CHATI_JR_START,
  PROMINDS_START,
} from "@/lib/portfolio-data";

const Experience: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Reference date: placeholder during SSR + hydration (keeps markup identical),
  // real wall-clock once mounted so live "· Present" durations stay current.
  const reference = isLoaded ? new Date() : CHATI_JR_START;
  const duration = {
    chatiTotal: durationLabel(CHATI_INTERN_START, reference),
    chatiIntern: formatMonths(
      monthsBetween(CHATI_INTERN_START, CHATI_INTERN_END),
    ),
    chatiJr: durationLabel(CHATI_JR_START, reference),
    promindsTotal: durationLabel(PROMINDS_START, reference),
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <MatrixRain />

      <div
        className={`relative z-10 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Terminal header */}
        <div className="space-y-8 sm:space-y-12">
          {/* Experience Section */}
          <section className="border border-green-800/30 bg-gradient-to-br from-green-900/10 to-black/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-green-900/20 hover:shadow-green-900/40 transition-all duration-500">
            <div className="flex items-center mb-4 sm:mb-6">
              <span className="text-green-400 font-mono mr-2 sm:mr-4"></span>
              <h2 className="text-lg sm:text-2xl text-green-400 font-bold font-mono tracking-wider">
                EXPERIENCE.log
              </h2>
              <div className="ml-auto">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>

            <div className="ml-3 sm:ml-6 border-l-2 border-green-800/30 pl-3 sm:pl-6 space-y-8">
              {/* CHATI */}
              <div className="border-b border-green-800/20 pb-6">
                {/* Company header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="shrink-0">
                    <Image
                      src="/images/Chati.ico"
                      alt="CHATI"
                      title="CHATI"
                      width={64}
                      height={64}
                      className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg border border-green-800/50 bg-black/40 object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-green-400 font-semibold text-base sm:text-lg font-mono">
                      Add-On Development
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      {duration.chatiTotal}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      Full-time · Nov 2021 — Present
                    </p>
                  </div>
                </div>

                {/* Nested roles with vertical timeline */}
                <ol className="relative border-l-2 border-green-800/30 ml-5 sm:ml-7 space-y-6">
                  {/* Junior Software Developer — Lead AI Engineer (current) */}
                  <li className="pl-4 sm:pl-5 relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-green-400 ring-2 ring-black shadow-[0_0_0_2px_rgba(74,222,128,0.35)]"
                    />
                    <h4 className="text-green-400 font-semibold text-sm sm:text-base font-mono">
                      Software Engineer
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      Add-On Development
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      Nov 2021 — Present · {duration.chatiJr}
                    </p>

                    <ul className="mt-3 list-disc list-outside space-y-1 text-gray-300 text-sm sm:text-base ml-4 sm:ml-5">
                      <li>
                        Designing and implementing agentic workflows for complex, production-scale systems.
                      </li>
                      <li>
                        Building multi-tenant architectures and system harnesses for scalable services.
                      </li>
                      <li>
                        Working daily across .NET, Node.js, cloud infrastructure, and CI/CD pipelines.
                      </li>
                    </ul>
                  </li>

                  {/* Software Developer Intern */}
                  <li className="pl-4 sm:pl-5 relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-black border-2 border-green-700"
                    />
                    <h4 className="text-green-400 font-semibold text-sm sm:text-base font-mono">
                      Intern .NET Developer
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      3i Company
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      Dec 2019 — Jan 2020 · {duration.chatiIntern}
                    </p>

                    <ul className="mt-3 list-disc list-outside space-y-1 text-gray-300 text-sm sm:text-base ml-4 sm:ml-5">
                      <li>
                        Assisted in developing backend services with ASP.NET and C#.
                      </li>
                      <li>
                        Learned industry-standard software development lifecycles in a professional environment.
                      </li>
                      <li>
                        Built hands-on experience with .NET backend fundamentals and delivery workflows.
                      </li>
                    </ul>
                  </li>
                </ol>
              </div>

              {/* Prominds Digital */}
              <div>
                {/* Company header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="shrink-0">
                    <Image
                      src="/images/PromindsD.png"
                      alt="Prominds Digital"
                      title="Prominds Digital"
                      width={64}
                      height={64}
                      className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg border border-green-800/50 bg-black/40 object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-green-400 font-semibold text-base sm:text-lg font-mono">
                       iCommerce
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm">
                       Freelance / Remote · {duration.promindsTotal}
                    </p>
                  </div>
                </div>

                <ul className="mt-3 list-disc list-outside space-y-1 text-gray-300 text-sm sm:text-base ml-9 sm:ml-12">
                  <li>
                     Delivering tailored e-commerce and web solutions with strong scalability and optimized UI/UX.
                  </li>
                  <li>
                     Building across Shopify Plus, Wix, React TS, and Next.js based on client needs.
                  </li>
                  <li>
                     Focusing on flexible storefront and business-site delivery for remote freelance clients.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Status footer */}
          <div className="mt-8 sm:mt-12 border-t border-green-800/30 pt-4 sm:pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-green-400/70 font-mono text-xs sm:text-sm space-y-2 sm:space-y-0">
              <span>Status: Ready for new challenges</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes matrix-fall {
          0% {
            transform: translateY(-100vh);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </div>
  );
};

export default Experience;
