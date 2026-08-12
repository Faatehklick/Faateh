import React from "react";
import { CheckCircle2, Lock } from "lucide-react";

interface SidebarProps {
  step: 1 | 2 | 3 | 4;
  setStep: (step: 1 | 2 | 3 | 4) => void;
  isStepValid: (stepNum: number) => boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ step, setStep, isStepValid }) => {
  const steps = [
    { num: 1 as const, title: "Hotel Information", desc: "Basic hotel details" },
    { num: 2 as const, title: "Photos & Media", desc: "Cover & gallery photos" },
    { num: 3 as const, title: "Hotel Details", desc: "Policies & amenities" },
    { num: 4 as const, title: "Submission", desc: "Review & finish" },
  ];

  const isStepUnlocked = (targetNum: number): boolean => {
    if (targetNum === 1) return true;
    if (typeof isStepValid !== "function") return true;

    for (let i = 1; i < targetNum; i++) {
      if (!isStepValid(i)) return false;
    }
    return true;
  };

  return (
    <div className="bg-blue-900 p-6 text-white flex flex-col justify-between">
      <div>
        <h1 className="text-lg font-bold mb-1">Become a Host</h1>
        <p className="text-xs text-blue-200/70 mb-8">
          Register your hotel in 4 easy steps
        </p>

        <div className="space-y-4">
          {steps.map((s) => {
            const isActive = step === s.num;
            const isPassed = step > s.num;
            const isUnlocked = isStepUnlocked(s.num);

            return (
              <button
                key={s.num}
                type="button"
                onClick={() => isUnlocked && setStep(s.num)}
                disabled={!isUnlocked}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between ${
                  isActive
                    ? "bg-white/15 border border-white/20 text-white font-semibold shadow-sm"
                    : isUnlocked
                    ? "opacity-80 hover:opacity-100 hover:bg-white/5 cursor-pointer"
                    : "opacity-40 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      isActive
                        ? "bg-blue-400 text-blue-950"
                        : isPassed
                        ? "bg-blue-500/30 text-blue-200"
                        : "bg-white/10 text-white/60"
                    }`}
                  >
                    {isPassed ? <CheckCircle2 size={16} /> : s.num}
                  </div>
                  <div>
                    <p className="text-xs font-medium">{s.title}</p>
                    <p className="text-[10px] text-blue-100/60">{s.desc}</p>
                  </div>
                </div>

                {!isUnlocked && <Lock size={14} className="text-white/40" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;