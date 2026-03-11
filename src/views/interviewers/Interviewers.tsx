import { useState, useMemo } from "react";
import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  LuUsers,
  LuUserCheck,
  LuTrendingUp,
  LuStar,
  LuSearch,
  LuUpload,
  LuUserPlus,
  LuLayoutGrid,
  LuLayoutList,
  LuBriefcase,
  LuMapPin,
  LuMail,
} from "react-icons/lu";
import CardComponent from "../../components/ui/CardComponent";
import ButtonComponent from "../../components/ui/ButtonComponent";
import { InputComponent } from "../../components/ui/InputComponent";
import SelectComponent from "../../components/ui/SelectComponent";
import TableComponent from "../../components/ui/TableComponent";

type InterviewerStatus = "Active" | "On Leave";
type Availability = "Available" | "In Interview" | "Unavailable";

interface Interviewer {
  key: string;
  name: string;
  initials: string;
  email: string;
  role: string;
  department: string;
  status: InterviewerStatus;
  location: string;
  totalInterviews: number;
  successRate: string;
  rating: number;
  availability: Availability;
}

const STATUS_CONFIG: Record<InterviewerStatus, { color: string; bg: string }> =
  {
    Active: { color: "#52c41a", bg: "#52c41a18" },
    "On Leave": { color: "#faad14", bg: "#faad1418" },
  };

const AVAILABILITY_CONFIG: Record<Availability, { color: string; bg: string }> =
  {
    Available: { color: "#52c41a", bg: "#52c41a18" },
    "In Interview": { color: "#1677ff", bg: "#1677ff18" },
    Unavailable: { color: "#ff4d4f", bg: "#ff4d4f18" },
  };

const AVATAR_COLORS = [
  "#3b82f6",
  "#f59e0b",
  "#10b981",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
];

const interviewers: Interviewer[] = [
  {
    key: "1",
    name: "David Lee",
    initials: "DL",
    email: "david.lee@hireflow.com",
    role: "Engineering Lead",
    department: "Engineering",
    status: "Active",
    location: "San Francisco, CA",
    totalInterviews: 142,
    successRate: "78%",
    rating: 4.8,
    availability: "In Interview",
  },
  {
    key: "2",
    name: "Anna Smith",
    initials: "AS",
    email: "anna.smith@hireflow.com",
    role: "VP of Product",
    department: "Product",
    status: "Active",
    location: "New York, NY",
    totalInterviews: 98,
    successRate: "82%",
    rating: 4.6,
    availability: "Available",
  },
  {
    key: "3",
    name: "Chris Taylor",
    initials: "CT",
    email: "chris.taylor@hireflow.com",
    role: "Design Manager",
    department: "Design",
    status: "On Leave",
    location: "Austin, TX",
    totalInterviews: 67,
    successRate: "71%",
    rating: 4.3,
    availability: "Unavailable",
  },
  {
    key: "4",
    name: "Rachel Kim",
    initials: "RK",
    email: "rachel.kim@hireflow.com",
    role: "Senior Data Scientist",
    department: "Engineering",
    status: "Active",
    location: "Seattle, WA",
    totalInterviews: 53,
    successRate: "85%",
    rating: 4.9,
    availability: "Available",
  },
  {
    key: "5",
    name: "Mark Johnson",
    initials: "MJ",
    email: "mark.johnson@hireflow.com",
    role: "Backend Architect",
    department: "Engineering",
    status: "Active",
    location: "San Francisco, CA",
    totalInterviews: 121,
    successRate: "76%",
    rating: 4.5,
    availability: "In Interview",
  },
  {
    key: "6",
    name: "Sophie Grant",
    initials: "SG",
    email: "sophie.grant@hireflow.com",
    role: "HR Business Partner",
    department: "HR",
    status: "Active",
    location: "Chicago, IL",
    totalInterviews: 89,
    successRate: "80%",
    rating: 4.7,
    availability: "Available",
  },
  {
    key: "7",
    name: "James Patel",
    initials: "JP",
    email: "james.patel@hireflow.com",
    role: "Marketing Director",
    department: "Marketing",
    status: "Active",
    location: "New York, NY",
    totalInterviews: 34,
    successRate: "68%",
    rating: 4.1,
    availability: "Available",
  },
  {
    key: "8",
    name: "Linda Wu",
    initials: "LW",
    email: "linda.wu@hireflow.com",
    role: "QA Lead",
    department: "Engineering",
    status: "On Leave",
    location: "Boston, MA",
    totalInterviews: 45,
    successRate: "73%",
    rating: 4.4,
    availability: "Unavailable",
  },
];

const departmentOptions = [
  { label: "All Departments", value: "" },
  { label: "Engineering", value: "Engineering" },
  { label: "Product", value: "Product" },
  { label: "Design", value: "Design" },
  { label: "HR", value: "HR" },
  { label: "Marketing", value: "Marketing" },
];

const statusOptions = [
  { label: "All Status", value: "" },
  { label: "Active", value: "Active" },
  { label: "On Leave", value: "On Leave" },
];

const stats = [
  { label: "Total Interviewers", value: "24", icon: <LuUsers size={18} /> },
  { label: "Active", value: "21", icon: <LuUserCheck size={18} /> },
  { label: "Success Rate", value: "77%", icon: <LuTrendingUp size={18} /> },
  { label: "Avg Rating", value: "4.5", icon: <LuStar size={18} /> },
];

const StatusTag = ({ status }: { status: InterviewerStatus }) => {
  const config = STATUS_CONFIG[status];
  return (
    <Tag style={{ background: config.bg, border: "none", color: config.color }}>
      {status}
    </Tag>
  );
};

const AvailabilityDot = ({ availability }: { availability: Availability }) => {
  const config = AVAILABILITY_CONFIG[availability];
  return (
    <span className="flex items-center gap-1.5 text-xs">
      <span
        className="w-1.5 h-1.5 rounded-full inline-block"
        style={{ background: config.color }}
      />
      <span style={{ color: config.color }}>{availability}</span>
    </span>
  );
};

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <span className="flex items-center gap-1 text-xs">
      <LuStar size={12} className="text-yellow-500 fill-yellow-500" />
      <span className="text-white font-medium">{rating}</span>
    </span>
  );
};

const columns: ColumnsType<Interviewer> = [
  {
    title: "Interviewer",
    key: "interviewer",
    render: (_, record, index) => (
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
          style={{ background: AVATAR_COLORS[index % AVATAR_COLORS.length] }}
        >
          {record.initials}
        </div>
        <div>
          <p className="text-white text-sm font-medium leading-tight">
            {record.name}
          </p>
          <p className="text-dark-gray text-xs">{record.email}</p>
        </div>
      </div>
    ),
  },
  {
    title: "Role",
    key: "role",
    render: (_, record) => (
      <div>
        <p className="text-white text-sm">{record.role}</p>
        <p className="text-dark-gray text-xs">{record.department}</p>
      </div>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: InterviewerStatus) => <StatusTag status={status} />,
  },
  {
    title: "Interviews",
    dataIndex: "totalInterviews",
    key: "totalInterviews",
    render: (val: number) => (
      <span className="text-white font-semibold">{val}</span>
    ),
  },
  {
    title: "Success Rate",
    dataIndex: "successRate",
    key: "successRate",
  },
  {
    title: "Rating",
    dataIndex: "rating",
    key: "rating",
    render: (rating: number) => <RatingStars rating={rating} />,
  },
  {
    title: "Availability",
    dataIndex: "availability",
    key: "availability",
    render: (availability: Availability) => (
      <AvailabilityDot availability={availability} />
    ),
  },
];

const Interviewers = () => {
  const [view, setView] = useState<"grid" | "table">("table");
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = useMemo(() => {
    return interviewers.filter((i) => {
      const matchesSearch =
        !search ||
        i.name.toLowerCase().includes(search.toLowerCase()) ||
        i.email.toLowerCase().includes(search.toLowerCase());
      const matchesDept =
        !departmentFilter || i.department === departmentFilter;
      const matchesStatus = !statusFilter || i.status === statusFilter;
      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [search, departmentFilter, statusFilter]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Interviewers</h1>
          <p className="text-dark-gray text-sm">Manage your interview panel</p>
        </div>
        <div className="flex items-center gap-3">
          <ButtonComponent type="default" icon={<LuUpload size={16} />}>
            Import
          </ButtonComponent>
          <ButtonComponent icon={<LuUserPlus size={16} />}>
            Add Interviewer
          </ButtonComponent>
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

      <div className="flex items-center gap-3 mb-5">
        <InputComponent
          placeholder="Search interviewers..."
          prefix={<LuSearch size={16} className="text-dark-gray" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          containerClassName="max-w-[260px]"
          allowClear
        />
        <SelectComponent
          placeholder="Department"
          options={departmentOptions}
          value={departmentFilter || undefined}
          onChange={(val) => setDepartmentFilter(val || "")}
          allowClear
          containerClassName="max-w-[180px]"
        />
        <SelectComponent
          placeholder="Status"
          options={statusOptions}
          value={statusFilter || undefined}
          onChange={(val) => setStatusFilter(val || "")}
          allowClear
          containerClassName="max-w-[170px]"
        />
        <div className="ml-auto flex items-center border border-white/10 rounded-lg overflow-hidden">
          <button
            onClick={() => setView("grid")}
            className={`p-2.5 transition-colors ${view === "grid" ? "bg-white/10 text-white" : "text-dark-gray hover:text-white"}`}
          >
            <LuLayoutGrid size={16} />
          </button>
          <button
            onClick={() => setView("table")}
            className={`p-2.5 transition-colors ${view === "table" ? "bg-white/10 text-white" : "text-dark-gray hover:text-white"}`}
          >
            <LuLayoutList size={16} />
          </button>
        </div>
      </div>

      {view === "table" ? (
        <TableComponent<Interviewer>
          columns={columns}
          dataSource={filtered}
          pageSize={6}
          size="small"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((interviewer, index) => (
            <CardComponent key={interviewer.key} padding="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
                  style={{
                    background: AVATAR_COLORS[index % AVATAR_COLORS.length],
                  }}
                >
                  {interviewer.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-white text-sm font-semibold truncate">
                    {interviewer.name}
                  </p>
                  <p className="text-dark-gray text-xs truncate">
                    {interviewer.email}
                  </p>
                </div>
                <StatusTag status={interviewer.status} />
              </div>

              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs mb-4">
                <div>
                  <p className="text-dark-gray mb-0.5 flex items-center gap-1">
                    <LuBriefcase size={11} /> Role
                  </p>
                  <p className="text-white">{interviewer.role}</p>
                </div>
                <div>
                  <p className="text-dark-gray mb-0.5 flex items-center gap-1">
                    <LuMapPin size={11} /> Location
                  </p>
                  <p className="text-white">{interviewer.location}</p>
                </div>
                <div>
                  <p className="text-dark-gray mb-0.5 flex items-center gap-1">
                    <LuMail size={11} /> Department
                  </p>
                  <p className="text-white">{interviewer.department}</p>
                </div>
                <div>
                  <p className="text-dark-gray mb-0.5">Availability</p>
                  <AvailabilityDot availability={interviewer.availability} />
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-dark-gray">
                    <span className="text-white font-semibold">
                      {interviewer.totalInterviews}
                    </span>{" "}
                    interviews
                  </span>
                  <span className="text-dark-gray">
                    <span className="text-white font-semibold">
                      {interviewer.successRate}
                    </span>{" "}
                    success
                  </span>
                </div>
                <RatingStars rating={interviewer.rating} />
              </div>
            </CardComponent>
          ))}
        </div>
      )}
    </div>
  );
};

export default Interviewers;
