import type { ReactNode } from "react";
import {
  CalendarOutlined,
  TeamOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { LuClock4, LuTrendingUp, LuUserCheck } from "react-icons/lu";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import CardComponent from "../../components/ui/CardComponent";
import TableComponent from "../../components/ui/TableComponent";

interface StatItem {
  label: string;
  value: string;
  icon: ReactNode;
}

const row1Stats: StatItem[] = [
  {
    label: "Interviews Today",
    value: "12",
    icon: <CalendarOutlined className="text-lg" />,
  },
  {
    label: "Total Candidates",
    value: "284",
    icon: <TeamOutlined className="text-lg" />,
  },
];

const row2Stats: StatItem[] = [
  {
    label: "Active Locations",
    value: "6",
    icon: <EnvironmentOutlined className="text-lg" />,
  },
  {
    label: "Avg Wait Time",
    value: "3.2 days",
    icon: <LuClock4 size={18} />,
  },
  {
    label: "Queue Efficiency",
    value: "87%",
    icon: <LuTrendingUp size={18} />,
  },
  {
    label: "Hire Rate",
    value: "24%",
    icon: <LuUserCheck size={18} />,
  },
];

const departmentData = [
  { name: "Engineering", value: 38 },
  { name: "Design", value: 16 },
  { name: "Marketing", value: 12 },
  { name: "Sales", value: 22 },
  { name: "HR", value: 8 },
  { name: "Finance", value: 10 },
];

const PIE_COLORS = [
  "#123139",
  "#1a5c45",
  "#268d62",
  "#43b17e",
  "#6fcf97",
  "#a8e6cf",
];

// --- Interviews Table ---

interface Interview {
  key: string;
  candidate: string;
  position: string;
  department: string;
  time: string;
  status: "Scheduled" | "Completed" | "In Progress" | "Cancelled";
}

const STATUS_COLOR: Record<Interview["status"], string> = {
  Scheduled: "#1677ff",
  Completed: "#52c41a",
  "In Progress": "#faad14",
  Cancelled: "#ff4d4f",
};

const interviewsData: Interview[] = [
  {
    key: "1",
    candidate: "Aarav Mehta",
    position: "Frontend Engineer",
    department: "Engineering",
    time: "09:00 AM",
    status: "Scheduled",
  },
  {
    key: "2",
    candidate: "Priya Sharma",
    position: "Product Designer",
    department: "Design",
    time: "10:30 AM",
    status: "In Progress",
  },
  {
    key: "3",
    candidate: "Ravi Kumar",
    position: "Data Analyst",
    department: "Marketing",
    time: "11:00 AM",
    status: "Completed",
  },
  {
    key: "4",
    candidate: "Sneha Gupta",
    position: "Sales Executive",
    department: "Sales",
    time: "01:00 PM",
    status: "Scheduled",
  },
  {
    key: "5",
    candidate: "Ankit Jain",
    position: "Backend Engineer",
    department: "Engineering",
    time: "02:30 PM",
    status: "Cancelled",
  },
  {
    key: "6",
    candidate: "Neha Verma",
    position: "HR Coordinator",
    department: "HR",
    time: "03:00 PM",
    status: "Scheduled",
  },
];

const interviewColumns: ColumnsType<Interview> = [
  { title: "Candidate", dataIndex: "candidate", key: "candidate" },
  { title: "Position", dataIndex: "position", key: "position" },
  { title: "Dept.", dataIndex: "department", key: "department" },
  { title: "Time", dataIndex: "time", key: "time" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: Interview["status"]) => (
      <Tag
        color={STATUS_COLOR[status]}
        style={{
          background: `${STATUS_COLOR[status]}18`,
          border: "none",
          color: STATUS_COLOR[status],
        }}
      >
        {status}
      </Tag>
    ),
  },
];

// --- Location Performance Bar Chart ---

const locationData = [
  { name: "Bangalore", candidates: 68, interviews: 45 },
  { name: "New York", candidates: 52, interviews: 34 },
  { name: "London", candidates: 40, interviews: 28 },
];

const StatCard = ({ stat }: { stat: StatItem }) => (
  <CardComponent
    padding="px-5 py-3"
    className="flex flex-col items-start gap-2"
  >
    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-[#6FCF97] text-dark-green">
      {stat.icon}
    </div>
    <p className="text-dark-gray text-xs mb-2">{stat.label}</p>
    <div>
      <p className="text-white text-[1.6rem] font-bold leading-tight ml-1">
        {stat.value}
      </p>
    </div>
  </CardComponent>
);

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
      <p className="text-dark-gray text-sm mb-6">
        Overview of your hiring pipeline
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Row 1, Col 1-2 — Welcome card */}
        <CardComponent
          padding="p-6"
          className="lg:col-span-2 border-none! flex flex-col justify-between"
          style={{
            background: "linear-gradient(135deg, #123139 0%, #268d62 100%)",
          }}
        >
          <div>
            <p className="text-white/60 text-sm mb-1">Welcome back,</p>
            <h2 className="text-white text-xl font-semibold">Nilay Singh</h2>
          </div>
          <p className="text-white/50 text-xs mt-4">
            You have <span className="text-white font-medium">5</span> tasks
            pending today
          </p>
        </CardComponent>

        {/* Row 1, Col 3-4 — 2 stat cards */}
        {row1Stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}

        {/* Row 1-2, Col 5 — Pie chart spanning 2 rows */}
        <CardComponent padding="p-5" className="lg:row-span-2 flex flex-col">
          <h3 className="text-white text-sm font-semibold mb-1">
            Interviews by Dept.
          </h3>
          <p className="text-dark-gray text-xs mb-3">Distribution overview</p>

          <div className="flex-1 min-h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={80}
                  dataKey="value"
                  stroke="none"
                  paddingAngle={3}
                >
                  {departmentData.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#0a0a0a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    fontSize: 12,
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#fff" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
            {departmentData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: PIE_COLORS[i] }}
                />
                <span className="text-dark-gray text-xs truncate">
                  {d.name}
                </span>
                <span className="text-white/70 text-xs ml-auto">{d.value}</span>
              </div>
            ))}
          </div>
        </CardComponent>

        {/* Row 2, Col 1-4 — 4 stat cards (same UI) */}
        {row2Stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      {/* Row 3 — Table + Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mt-4">
        {/* Interviews Today Table */}
        <CardComponent padding="p-5" className="lg:col-span-3">
          <h3 className="text-white text-sm font-semibold mb-1">
            Interviews Today
          </h3>
          <p className="text-dark-gray text-xs mb-4">
            Today's scheduled interviews
          </p>
          <TableComponent<Interview>
            columns={interviewColumns}
            dataSource={interviewsData}
            pageSize={5}
            size="small"
          />
        </CardComponent>

        {/* Performance by Location Bar Chart */}
        <CardComponent padding="p-5" className="lg:col-span-2 flex flex-col">
          <h3 className="text-white text-sm font-semibold mb-1">
            Performance by Location
          </h3>
          <p className="text-dark-gray text-xs mb-4">
            Candidates vs interviews per office
          </p>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={locationData}
                margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
                barGap={4}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.06)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#767676", fontSize: 11 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#767676", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "#0a0a0a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    fontSize: 12,
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#fff" }}
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                />
                <Bar
                  dataKey="candidates"
                  name="Candidates"
                  fill="#268d62"
                  radius={[4, 4, 0, 0]}
                  barSize={18}
                />
                <Bar
                  dataKey="interviews"
                  name="Interviews"
                  fill="#6fcf97"
                  radius={[4, 4, 0, 0]}
                  barSize={18}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-5 mt-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#268d62]" />
              <span className="text-dark-gray text-xs">Candidates</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#6fcf97]" />
              <span className="text-dark-gray text-xs">Interviews</span>
            </div>
          </div>
        </CardComponent>
      </div>
    </div>
  );
};

export default Dashboard;
