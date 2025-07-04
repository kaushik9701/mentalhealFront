import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { markOnboardingComplete } from "../../Redux/store/userThunk";
import { Step1Intro } from "./intro";
import { Step2Choice } from "./choices";
import { Step3Details } from "./details";

export function OnboardingFlow({ ob: setShowOnboarding }) {
  const dispatch = useDispatch();
  const onboardingComplete = useSelector(state => state.user.onboardingComplete);
  const [step, setStep] = useState(1);
  const containerRef = useRef(null); // ✅ Ref for scroll container

  // ✅ Scroll to top when step changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step]);

  if (onboardingComplete === undefined || onboardingComplete) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 pt-6 md:pt-0">
      <div className="relative w-full max-w-2xl mx-4 h-[75vh] max-h-[600px]">
        {/* Progress Bar */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2.5 bg-gray-800 z-10">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ width: "0%" }}
              animate={{
                width: step === 1 ? "33%" : step === 2 ? "66%" : "100%",
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Onboarding Content */}
        <div
          ref={containerRef} // ✅ Attach scroll ref here
          className="relative z-10 bg-gradient-to-b from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl border border-purple-700/30 shadow-2xl p-6 md:p-8 h-full overflow-y-auto"
        >
          <AnimatePresence mode="wait">
            {step === 1 && (
              <Step1Intro key="step1" onNext={() => setStep(2)} />
            )}
            {step === 2 && (
              <Step2Choice key="step2" onSelect={() => setStep(3)} />
            )}
            {step === 3 && (
              <Step3Details
                key="step3"
                onFinish={() => {
                  dispatch(markOnboardingComplete());
                  setShowOnboarding(false);
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
