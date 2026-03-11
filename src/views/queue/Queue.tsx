import { useState, useEffect } from "react";
import { Tag } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuUsers,
  LuClock4,
  LuCircleCheck,
  LuTriangleAlert,
  LuPhone,
  LuSkipForward,
  LuChevronRight,
  LuBriefcase,
  LuMapPin,
  LuUser,
  LuTimer,
  LuVideo,
  LuCalendarDays,
} from "react-icons/lu";
import CardComponent from "../../components/ui/CardComponent";
import ButtonComponent from "../../components/ui/ButtonComponent";

interface QueueCandidate {
  key: string;
  name: string;
  initials: string;
  role: string;
  time: string;
  interviewer: string;
  platform: string;
  location: string;
  duration: string;
  description: string;
  status: "waiting" | "in-progress" | "completed" | "delayed";
}

const AVATAR_COLORS = [
  "#3b82f6",
  "#f59e0b",
  "#10b981",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
];

const queueData: QueueCandidate[] = [
  {
    key: "1",
    name: "Sarah Johnson",
    initials: "SJ",
    role: "Frontend Developer",
    time: "09:00 AM",
    interviewer: "David Lee",
    platform: "Zoom",
    location: "Remote",
    duration: "45 min",
    description:
      "Technical round focusing on React, TypeScript, and system design patterns.",
    status: "in-progress",
  },
  {
    key: "2",
    name: "Mike Chen",
    initials: "MC",
    role: "Product Manager",
    time: "10:00 AM",
    interviewer: "Anna Smith",
    platform: "Google Meet",
    location: "Remote",
    duration: "60 min",
    description: "Culture fit and product vision discussion with leadership.",
    status: "waiting",
  },
  {
    key: "3",
    name: "Emma Wilson",
    initials: "EW",
    role: "UX Designer",
    time: "11:00 AM",
    interviewer: "Chris Taylor",
    platform: "On-site",
    location: "New York, NY",
    duration: "30 min",
    description: "Portfolio review and design challenge walkthrough.",
    status: "waiting",
  },
  {
    key: "4",
    name: "Alex Rodriguez",
    initials: "AR",
    role: "Data Scientist",
    time: "12:00 PM",
    interviewer: "Rachel Kim",
    platform: "Zoom",
    location: "Remote",
    duration: "60 min",
    description: "Machine learning case study and coding assessment.",
    status: "waiting",
  },
  {
    key: "5",
    name: "Jessica Lee",
    initials: "JL",
    role: "Backend Developer",
    time: "01:30 PM",
    interviewer: "Mark Johnson",
    platform: "On-site",
    location: "San Francisco, CA",
    duration: "45 min",
    description: "System design round and API architecture discussion.",
    status: "delayed",
  },
  {
    key: "6",
    name: "David Park",
    initials: "DP",
    role: "Frontend Developer",
    time: "02:00 PM",
    interviewer: "David Lee",
    platform: "Google Meet",
    location: "Remote",
    duration: "45 min",
    description: "Final round — behavioural and team fit evaluation.",
    status: "waiting",
  },
  {
    key: "7",
    name: "Priya Sharma",
    initials: "PS",
    role: "Product Manager",
    time: "02:30 PM",
    interviewer: "Anna Smith",
    platform: "Zoom",
    location: "Remote",
    duration: "60 min",
    description: "Strategy case study and stakeholder management discussion.",
    status: "waiting",
  },
  {
    key: "8",
    name: "Tom Bradley",
    initials: "TB",
    role: "DevOps Engineer",
    time: "03:00 PM",
    interviewer: "Chris Taylor",
    platform: "Zoom",
    location: "Remote",
    duration: "45 min",
    description: "CI/CD pipeline design and cloud infrastructure discussion.",
    status: "waiting",
  },
  {
    key: "9",
    name: "Nina Patel",
    initials: "NP",
    role: "QA Engineer",
    time: "03:30 PM",
    interviewer: "Rachel Kim",
    platform: "On-site",
    location: "New York, NY",
    duration: "30 min",
    description: "Test automation framework and quality strategy review.",
    status: "waiting",
  },
  {
    key: "10",
    name: "Ryan Murphy",
    initials: "RM",
    role: "Data Scientist",
    time: "04:00 PM",
    interviewer: "Mark Johnson",
    platform: "Google Meet",
    location: "Remote",
    duration: "60 min",
    description: "Deep learning model evaluation and research presentation.",
    status: "waiting",
  },
  {
    key: "11",
    name: "Olivia Tan",
    initials: "OT",
    role: "UX Designer",
    time: "04:30 PM",
    interviewer: "David Lee",
    platform: "Zoom",
    location: "Remote",
    duration: "45 min",
    description: "Design systems and accessibility standards discussion.",
    status: "waiting",
  },
];

const stats = [
  { label: "In Queue", value: "4", icon: <LuUsers size={18} /> },
  { label: "Avg Wait Time", value: "18 min", icon: <LuClock4 size={18} /> },
  {
    label: "Completed Today",
    value: "7",
    icon: <LuCircleCheck size={18} />,
  },
  { label: "Delays", value: "1", icon: <LuTriangleAlert size={18} /> },
];

const formatTime = (totalSeconds: number) => {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return {
    minutes: String(mins).padStart(2, "0"),
    seconds: String(secs).padStart(2, "0"),
  };
};

const PulsatingTimer = ({ seconds }: { seconds: number }) => {
  const { minutes, seconds: secs } = formatTime(seconds);
  const progress = Math.min((seconds / 2700) * 100, 100);
  const radius = 80;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-55 h-55 mx-auto">
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(38,141,98,0.12) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-3 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(67,177,126,0.1) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
      />

      <svg
        className="absolute inset-0"
        width="220"
        height="220"
        viewBox="0 0 220 220"
      >
        <circle
          cx="110"
          cy="110"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx="110"
          cy="110"
          r={radius}
          fill="none"
          stroke="url(#timerGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 110 110)"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#123139" />
            <stop offset="100%" stopColor="#6fcf97" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-10 text-center">
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-white text-4xl font-bold tracking-tight">
            {minutes}
          </span>
          <motion.span
            className="text-dark-gray text-2xl font-light mx-0.5"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            :
          </motion.span>
          <span className="text-white text-4xl font-bold tracking-tight">
            {secs}
          </span>
        </div>
        <p className="text-dark-gray text-[11px] mt-1 tracking-wide uppercase">
          Elapsed
        </p>
      </div>
    </div>
  );
};

const Queue = () => {
  const [elapsedSeconds, setElapsedSeconds] = useState(1247);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const current = queueData[currentIndex];
  const waiting = queueData.filter(
    (c) => c.status === "waiting" || c.status === "delayed",
  );
  const nextUp = waiting[0];

  const handleComplete = () => {
    if (currentIndex < queueData.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setElapsedSeconds(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < queueData.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setElapsedSeconds(0);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Queue</h1>
          <p className="text-dark-gray text-sm">
            Interview queue management for today
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <CardComponent
            key={stat.label}
            padding="px-5 py-3"
            className="flex flex-col items-start gap-2"
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-white bg-gradient-green">
              {stat.icon}
            </div>
            <p className="text-dark-gray text-xs mb-2">{stat.label}</p>
            <p className="text-white text-[1.6rem] font-bold leading-tight ml-1">
              {stat.value}
            </p>
          </CardComponent>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-5 h-[calc(100vh-21.875rem)]">
        <div className="col-span-2 flex flex-col gap-3 overflow-y-auto pr-1 custom-scrollbar">
          <p className="text-dark-gray text-xs uppercase tracking-wider mb-1">
            Waiting · {waiting.length} candidates
          </p>

          <AnimatePresence>
            {waiting.map((candidate, index) => (
              <motion.div
                key={candidate.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <CardComponent padding="p-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
                      style={{
                        background:
                          AVATAR_COLORS[
                            (Number(candidate.key) - 1) % AVATAR_COLORS.length
                          ],
                      }}
                    >
                      {candidate.initials}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-white text-sm font-semibold truncate">
                          {candidate.name}
                        </p>
                        {candidate.status === "delayed" && (
                          <Tag
                            style={{
                              background: "#ff4d4f18",
                              border: "none",
                              color: "#ff4d4f",
                              fontSize: 10,
                              lineHeight: "18px",
                            }}
                          >
                            Delayed
                          </Tag>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-dark-gray text-xs">
                        <span className="flex items-center gap-1">
                          <LuBriefcase size={12} />
                          {candidate.role}
                        </span>
                        <span className="flex items-center gap-1">
                          <LuClock4 size={12} />
                          {candidate.time}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-auth-green hover:bg-white/5 transition-colors"
                        title="Call candidate"
                      >
                        <LuPhone size={14} />
                      </button>
                      <button
                        className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-dark-gray hover:text-white hover:bg-white/5 transition-colors"
                        title="Skip candidate"
                      >
                        <LuSkipForward size={14} />
                      </button>
                    </div>
                  </div>
                </CardComponent>
              </motion.div>
            ))}
          </AnimatePresence>

          {waiting.length === 0 && (
            <CardComponent padding="p-8" className="text-center">
              <LuCircleCheck
                size={32}
                className="mx-auto text-auth-green mb-2"
              />
              <p className="text-dark-gray text-sm">
                All interviews completed!
              </p>
            </CardComponent>
          )}
        </div>

        <div className="col-span-3 flex flex-col gap-4">
          <p className="text-dark-gray text-xs uppercase tracking-wider">
            Currently In Progress
          </p>

          <CardComponent padding="p-0" className="flex-1 flex flex-col">
            <div className="flex flex-1 min-h-0">
              <div className="w-65 shrink-0 flex flex-col items-center justify-center gap-5 px-6 py-8 relative">
                <div className="absolute right-0 top-6 bottom-6 w-px bg-white/5" />
                <PulsatingTimer seconds={elapsedSeconds} />

                <div className="flex items-center gap-3 w-full">
                  <ButtonComponent
                    onClick={handleComplete}
                    className="flex-1"
                    icon={<LuCircleCheck size={15} />}
                  >
                    Complete
                  </ButtonComponent>
                  <ButtonComponent
                    type="default"
                    onClick={handleNext}
                    className="flex-1"
                    icon={<LuChevronRight size={15} />}
                  >
                    Next
                  </ButtonComponent>
                </div>
              </div>

              <div className="flex-1 flex flex-col p-6 overflow-y-auto custom-scrollbar">
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
                    style={{
                      background:
                        AVATAR_COLORS[
                          (Number(current.key) - 1) % AVATAR_COLORS.length
                        ],
                    }}
                  >
                    {current.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-base font-semibold">
                      {current.name}
                    </h3>
                    <p className="text-dark-gray text-xs">{current.role}</p>
                  </div>
                  <Tag
                    style={{
                      background: "#faad1418",
                      border: "none",
                      color: "#faad14",
                    }}
                  >
                    In Progress
                  </Tag>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="rounded-lg bg-white/3 border border-white/5 px-3.5 py-2.5">
                    <p className="text-dark-gray text-[11px] mb-1 flex items-center gap-1.5">
                      <LuCalendarDays size={11} /> Time
                    </p>
                    <p className="text-white text-sm font-medium">
                      {current.time}
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/3 border border-white/5 px-3.5 py-2.5">
                    <p className="text-dark-gray text-[11px] mb-1 flex items-center gap-1.5">
                      <LuTimer size={11} /> Duration
                    </p>
                    <p className="text-white text-sm font-medium">
                      {current.duration}
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/3 border border-white/5 px-3.5 py-2.5">
                    <p className="text-dark-gray text-[11px] mb-1 flex items-center gap-1.5">
                      <LuUser size={11} /> Interviewer
                    </p>
                    <p className="text-white text-sm font-medium">
                      {current.interviewer}
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/3 border border-white/5 px-3.5 py-2.5">
                    <p className="text-dark-gray text-[11px] mb-1 flex items-center gap-1.5">
                      {current.platform === "On-site" ? (
                        <LuMapPin size={11} />
                      ) : (
                        <LuVideo size={11} />
                      )}{" "}
                      Platform
                    </p>
                    <p className="text-white text-sm font-medium">
                      {current.platform}
                      {current.platform === "On-site" &&
                        ` · ${current.location}`}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-dark-gray text-[11px] mb-1.5">
                    Description
                  </p>
                  <p className="text-white/60 text-xs leading-relaxed">
                    {current.description}
                  </p>
                </div>
              </div>
            </div>
          </CardComponent>

          {nextUp && (
            <CardComponent padding="px-5 py-4">
              <p className="text-dark-gray text-[11px] uppercase tracking-wider mb-3">
                Up Next
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
                  style={{
                    background:
                      AVATAR_COLORS[
                        (Number(nextUp.key) - 1) % AVATAR_COLORS.length
                      ],
                  }}
                >
                  {nextUp.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium">
                    {nextUp.name}
                  </p>
                  <p className="text-dark-gray text-xs">
                    {nextUp.role} · {nextUp.time}
                  </p>
                </div>
                <span className="text-dark-gray text-xs flex items-center gap-1">
                  <LuTimer size={12} />
                  {nextUp.duration}
                </span>
              </div>
            </CardComponent>
          )}
        </div>
      </div>
    </div>
  );
};

export default Queue;
