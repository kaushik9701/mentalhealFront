// 


import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { markOnboardingComplete } from "../../Redux/store/userThunk";
import { Step1Intro } from "./intro";
import { Step2Choice } from "./choices";
import { Step3Details } from "./details";



export function OnboardingFlow({ob: setShowOnboarding}) {
  const dispatch = useDispatch();
  const onboardingComplete = useSelector(state => state.user.onboardingComplete);
  const [step, setStep] = useState(1);
  const [userChoice, setUserChoice] = useState(null);
  

  console.log('onboardingComplete from Redux:', onboardingComplete);
  // Don't show onboarding if already completed
  if (onboardingComplete === undefined) return null;
  if (onboardingComplete) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg">
      <div className="relative w-full max-w-2xl mx-4">
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          {/* Cosmic Background */}
          <div className="absolute inset-0 z-0">
            {/* Stars */}
            {[...Array(150)].map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3}px`,
                  height: `${Math.random() * 3}px`,
                  opacity: Math.random() * 0.7 + 0.3,
                  animationDuration: `${Math.random() * 3 + 2}s`
                }}
              />
            ))}
            
            {/* Large Nebula */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900 rounded-full mix-blend-screen opacity-30 blur-[100px]" />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-indigo-900 rounded-full mix-blend-screen opacity-30 blur-[100px]" />
          </div>
          
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-800 z-10">
            <motion.div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ width: "0%" }}
              animate={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        
        <div className="relative z-10 bg-gradient-to-b from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl border border-purple-700/30 shadow-2xl p-6 md:p-8 overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 1 && <Step1Intro key="step1" onNext={() => setStep(2)} />}
            {step === 2 && (
              <Step2Choice 
                key="step2" 
                onSelect={(choice) => {
                  setUserChoice(choice);
                  setStep(3);
                }} 
              />
            )}
            {step === 3 && (
              <Step3Details 
                key="step3" 
                onFinish={() => {dispatch(markOnboardingComplete())
                  setShowOnboarding(false);}} 
                
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}



