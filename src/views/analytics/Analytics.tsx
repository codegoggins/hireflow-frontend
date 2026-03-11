import type { ReactNode } from "react";
import {
  LuTrendingUp,
  LuTrendingDown,
  LuUsers,
  LuClock,
  LuMapPin,
  LuBuilding2,
  LuStar,
  LuTarget,
  LuCalendarCheck,
  LuArrowUpRight,
  LuArrowDownRight,
  LuUserCheck,
} from "react-icons/lu";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
} from "recharts";
import CardComponent from "../../components/ui/CardComponent";

const hiringTrendData = [
  { month: "Jul", hires: 8, applications: 45 },
  { month: "Aug", hires: 12, applications: 62 },
  { month: "Sep", hires: 10, applications: 55 },
  { month: "Oct", hires: 15, applications: 78 },
  { month: "Nov", hires: 18, applications: 85 },
  { month: "Dec", hires: 14, applications: 70 },
  { month: "Jan", hires: 22, applications: 95 },
  { month: "Feb", hires: 19, applications: 88 },
  { month: "Mar", hires: 25, applications: 110 },
];

const locationData = [
  { name: "San Francisco", hires: 42, trend: "+12%" },
  { name: "New York", hires: 35, trend: "+8%" },
  { name: "Austin", hires: 28, trend: "+18%" },
  { name: "Seattle", hires: 22, trend: "+5%" },
  { name: "Chicago", hires: 18, trend: "-3%" },
  { name: "Remote", hires: 38, trend: "+25%" },
];

const topInterviewers = [
  { name: "Sarah Chen", dept: "Engineering", rating: 4.9, interviews: 48 },
  { name: "Mark Johnson", dept: "Product", rating: 4.8, interviews: 42 },
  { name: "Lisa Wang", dept: "Design", rating: 4.8, interviews: 38 },
  { name: "James Patel", dept: "Engineering", rating: 4.7, interviews: 35 },
  { name: "Emily Davis", dept: "Marketing", rating: 4.7, interviews: 31 },
];

const departmentPerformance = [
  { dept: "Engineering", hireRate: 78, openRoles: 8, avgDays: 22 },
  { dept: "Product", hireRate: 82, openRoles: 3, avgDays: 18 },
  { dept: "Design", hireRate: 85, openRoles: 4, avgDays: 15 },
  { dept: "Marketing", hireRate: 74, openRoles: 5, avgDays: 20 },
  { dept: "HR", hireRate: 88, openRoles: 2, avgDays: 12 },
];

const radarData = [
  { subject: "Engineering", A: 78 },
  { subject: "Product", A: 82 },
  { subject: "Design", A: 85 },
  { subject: "Marketing", A: 74 },
  { subject: "HR", A: 88 },
  { subject: "Support", A: 70 },
];

const pipelineData = [
  { name: "Applied", value: 420, color: "#123139" },
  { name: "Screening", value: 280, color: "#1a5c45" },
  { name: "Interview", value: 145, color: "#268d62" },
  { name: "Offer", value: 52, color: "#43b17e" },
  { name: "Hired", value: 38, color: "#6fcf97" },
];

const interviewTimeData = [
  { stage: "Phone Screen", avgMin: 28 },
  { stage: "Technical", avgMin: 52 },
  { stage: "System Design", avgMin: 48 },
  { stage: "Behavioral", avgMin: 35 },
  { stage: "Final Round", avgMin: 42 },
];

interface StatCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  trend?: string;
  trendUp?: boolean;
}

const StatCard = ({ label, value, icon, trend, trendUp }: StatCardProps) => (
  <CardComponent padding="p-5" className="flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-white bg-gradient-green">
        {icon}
      </div>
      {trend && (
        <span
          className={`flex items-center gap-1 text-xs font-medium ${trendUp ? "text-completed" : "text-error"}`}
        >
          {trendUp ? (
            <LuArrowUpRight size={12} />
          ) : (
            <LuArrowDownRight size={12} />
          )}
          {trend}
        </span>
      )}
    </div>
    <div>
      <p className="text-dark-gray text-xs">{label}</p>
      <p className="text-white text-xl font-bold mt-1">{value}</p>
    </div>
  </CardComponent>
);

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-main-black px-3 py-2 text-xs shadow-xl">
      <p className="text-dark-gray mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="text-white font-medium">
          <span style={{ color: p.color }}>●</span> {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

const Analytics = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Analytics</h1>
        <p className="text-dark-gray text-sm">Hiring metrics and insights</p>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-5">
        <StatCard
          label="Total Hires"
          value="143"
          icon={<LuUserCheck size={18} />}
          trend="+18%"
          trendUp
        />
        <StatCard
          label="Open Positions"
          value="24"
          icon={<LuTarget size={18} />}
          trend="+4%"
          trendUp
        />
        <StatCard
          label="Avg Time to Hire"
          value="18 days"
          icon={<LuClock size={18} />}
          trend="-12%"
          trendUp
        />
        <StatCard
          label="Interviews This Month"
          value="86"
          icon={<LuCalendarCheck size={18} />}
          trend="+22%"
          trendUp
        />
        <StatCard
          label="Offer Acceptance"
          value="73%"
          icon={<LuTrendingUp size={18} />}
          trend="-2%"
          trendUp={false}
        />
      </div>

      <div className="grid grid-cols-12 gap-4 mb-4">
        <CardComponent padding="p-5" className="col-span-8">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-white text-sm font-semibold">
                Hiring Trends
              </h3>
              <p className="text-dark-gray text-xs mt-0.5">
                Applications vs hires over time
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary-green" />
                <span className="text-dark-gray">Hires</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-dark-green" />
                <span className="text-dark-gray">Applications</span>
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={hiringTrendData}>
              <defs>
                <linearGradient id="gradHires" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#268d62" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#268d62" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradApps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#123139" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#123139" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#767676", fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#767676", fontSize: 11 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="applications"
                stroke="#123139"
                strokeWidth={2}
                fill="url(#gradApps)"
                name="Applications"
              />
              <Area
                type="monotone"
                dataKey="hires"
                stroke="#268d62"
                strokeWidth={2}
                fill="url(#gradHires)"
                name="Hires"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardComponent>

        <CardComponent padding="p-5" className="col-span-4">
          <h3 className="text-white text-sm font-semibold mb-1">
            Hiring Pipeline
          </h3>
          <p className="text-dark-gray text-xs mb-4">
            Candidate funnel breakdown
          </p>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={pipelineData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={65}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {pipelineData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-white/10 bg-main-black px-3 py-2 text-xs shadow-xl">
                      <p className="text-white font-medium">
                        {d.name}: {d.value}
                      </p>
                    </div>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {pipelineData.map((stage) => (
              <div
                key={stage.name}
                className="flex items-center justify-between text-xs"
              >
                <span className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: stage.color }}
                  />
                  <span className="text-dark-gray">{stage.name}</span>
                </span>
                <span className="text-white font-medium">{stage.value}</span>
              </div>
            ))}
          </div>
        </CardComponent>
      </div>

      <div className="grid grid-cols-12 gap-4 mb-4">
        <CardComponent padding="p-5" className="col-span-5">
          <div className="flex items-center gap-2 mb-4">
            <LuStar size={14} className="text-primary-green" />
            <h3 className="text-white text-sm font-semibold">
              Top Interviewers
            </h3>
          </div>
          <div className="space-y-3">
            {topInterviewers.map((person, i) => (
              <div
                key={person.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-dark-gray text-xs w-4 text-right">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-white text-sm font-medium">
                      {person.name}
                    </p>
                    <p className="text-dark-gray text-[11px]">{person.dept}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-dark-gray text-xs">
                    {person.interviews} interviews
                  </span>
                  <span className="flex items-center gap-1 text-xs">
                    <LuStar size={11} className="text-primary-green" />
                    <span className="text-white font-semibold">
                      {person.rating}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardComponent>

        <CardComponent padding="p-5" className="col-span-4">
          <div className="flex items-center gap-2 mb-4">
            <LuBuilding2 size={14} className="text-primary-green" />
            <h3 className="text-white text-sm font-semibold">
              Department Performance
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <RadarChart data={radarData} outerRadius={70}>
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "#767676", fontSize: 10 }}
              />
              <Radar
                name="Hire Rate"
                dataKey="A"
                stroke="#268d62"
                fill="#268d62"
                fillOpacity={0.15}
                strokeWidth={2}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div className="rounded-lg border border-white/10 bg-main-black px-3 py-2 text-xs shadow-xl">
                      <p className="text-white font-medium">
                        Hire Rate: {payload[0].value}%
                      </p>
                    </div>
                  );
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </CardComponent>

        <CardComponent padding="p-5" className="col-span-3">
          <div className="flex items-center gap-2 mb-4">
            <LuMapPin size={14} className="text-primary-green" />
            <h3 className="text-white text-sm font-semibold">Top Locations</h3>
          </div>
          <div className="space-y-3">
            {locationData.map((loc) => (
              <div key={loc.name} className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm">{loc.name}</p>
                  <p className="text-dark-gray text-[11px]">
                    {loc.hires} hires
                  </p>
                </div>
                <span
                  className={`flex items-center gap-0.5 text-xs font-medium ${loc.trend.startsWith("+") ? "text-completed" : "text-error"}`}
                >
                  {loc.trend.startsWith("+") ? (
                    <LuTrendingUp size={11} />
                  ) : (
                    <LuTrendingDown size={11} />
                  )}
                  {loc.trend}
                </span>
              </div>
            ))}
          </div>
        </CardComponent>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <CardComponent padding="p-5" className="col-span-5">
          <div className="flex items-center gap-2 mb-4">
            <LuClock size={14} className="text-primary-green" />
            <h3 className="text-white text-sm font-semibold">
              Avg Interview Duration
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={interviewTimeData} layout="vertical" barSize={16}>
              <CartesianGrid
                stroke="rgba(255,255,255,0.04)"
                horizontal={false}
              />
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#767676", fontSize: 11 }}
                unit=" min"
              />
              <YAxis
                type="category"
                dataKey="stage"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#767676", fontSize: 11 }}
                width={90}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div className="rounded-lg border border-white/10 bg-main-black px-3 py-2 text-xs shadow-xl">
                      <p className="text-white font-medium">
                        {payload[0].payload.stage}: {payload[0].value} min
                      </p>
                    </div>
                  );
                }}
              />
              <Bar dataKey="avgMin" radius={[0, 6, 6, 0]}>
                {interviewTimeData.map((_, i) => (
                  <Cell key={i} fill={`rgba(38, 141, 98, ${0.4 + i * 0.15})`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardComponent>

        <CardComponent padding="p-5" className="col-span-7">
          <div className="flex items-center gap-2 mb-4">
            <LuUsers size={14} className="text-primary-green" />
            <h3 className="text-white text-sm font-semibold">
              Hiring by Location
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={locationData} barSize={32}>
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#268d62" stopOpacity={1} />
                  <stop offset="100%" stopColor="#123139" stopOpacity={1} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#767676", fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#767676", fontSize: 11 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="hires"
                fill="url(#barGrad)"
                radius={[6, 6, 0, 0]}
                name="Hires"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardComponent>
      </div>
    </div>
  );
};

export default Analytics;
