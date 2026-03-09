import { useState, useMemo } from "react";
import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  LuUsers,
  LuSearch,
  LuUserCheck,
  LuClipboardList,
  LuUpload,
  LuUserPlus,
  LuLayoutGrid,
  LuLayoutList,
} from "react-icons/lu";
import CardComponent from "../../components/ui/CardComponent";
import { InputComponent } from "../../components/ui/InputComponent";
import SelectComponent from "../../components/ui/SelectComponent";
import ButtonComponent from "../../components/ui/ButtonComponent";
import TableComponent from "../../components/ui/TableComponent";

type CandidateStatus =
  | "Under Review"
  | "Hired"
  | "Interview Scheduled"
  | "Phone Screen"
  | "Technical Round";

interface Candidate {
  key: string;
  name: string;
  initials: string;
  email: string;
  mobile: string;
  role: string;
  status: CandidateStatus;
  location: string;
  appliedAt: string;
  experience: string;
  rating: number;
  salary: string;
  skills: string[];
}

const STATUS_CONFIG: Record<CandidateStatus, { color: string; bg: string }> = {
  "Under Review": { color: "#faad14", bg: "#faad1418" },
  Hired: { color: "#52c41a", bg: "#52c41a18" },
  "Interview Scheduled": { color: "#7c5cfc", bg: "#7c5cfc18" },
  "Phone Screen": { color: "#1677ff", bg: "#1677ff18" },
  "Technical Round": { color: "#e6793a", bg: "#e6793a18" },
};

const candidates: Candidate[] = [
  {
    key: "1",
    name: "Sarah Johnson",
    initials: "SJ",
    email: "sarah.johnson@email.com",
    mobile: "+1 234 567 890",
    role: "Frontend Developer",
    status: "Interview Scheduled",
    location: "New York, NY",
    appliedAt: "15/01/2024",
    experience: "3 years",
    rating: 4.5,
    salary: "$85,000",
    skills: ["React", "TypeScript", "Tailwind"],
  },
  {
    key: "2",
    name: "Mike Chen",
    initials: "MC",
    email: "mike.chen@email.com",
    mobile: "+1 345 678 901",
    role: "Product Manager",
    status: "Under Review",
    location: "San Francisco, CA",
    appliedAt: "14/01/2024",
    experience: "5 years",
    rating: 4.2,
    salary: "$120,000",
    skills: ["Agile", "Jira", "Analytics"],
  },
  {
    key: "3",
    name: "Emma Wilson",
    initials: "EW",
    email: "emma.wilson@email.com",
    mobile: "+1 456 789 012",
    role: "UX Designer",
    status: "Hired",
    location: "Austin, TX",
    appliedAt: "13/01/2024",
    experience: "4 years",
    rating: 4.8,
    salary: "$95,000",
    skills: ["Figma", "Prototyping", "Research"],
  },
  {
    key: "4",
    name: "Alex Rodriguez",
    initials: "AR",
    email: "alex.rodriguez@email.com",
    mobile: "+1 567 890 123",
    role: "Data Scientist",
    status: "Under Review",
    location: "Seattle, WA",
    appliedAt: "12/01/2024",
    experience: "6 years",
    rating: 3.8,
    salary: "$110,000",
    skills: ["Python", "ML", "SQL"],
  },
  {
    key: "5",
    name: "Jessica Lee",
    initials: "JL",
    email: "jessica.lee@email.com",
    mobile: "+1 678 901 234",
    role: "Backend Developer",
    status: "Phone Screen",
    location: "Chicago, IL",
    appliedAt: "11/01/2024",
    experience: "4 years",
    rating: 4.3,
    salary: "$90,000",
    skills: ["Node.js", "PostgreSQL", "AWS"],
  },
  {
    key: "6",
    name: "David Park",
    initials: "DP",
    email: "david.park@email.com",
    mobile: "+1 789 012 345",
    role: "Frontend Developer",
    status: "Interview Scheduled",
    location: "Boston, MA",
    appliedAt: "10/01/2024",
    experience: "2 years",
    rating: 4.0,
    salary: "$78,000",
    skills: ["Vue", "JavaScript", "CSS"],
  },
];

const AVATAR_COLORS = [
  "#3b82f6",
  "#f59e0b",
  "#10b981",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
];

const statusOptions = [
  { label: "All Status", value: "" },
  { label: "Under Review", value: "Under Review" },
  { label: "Hired", value: "Hired" },
  { label: "Interview Scheduled", value: "Interview Scheduled" },
  { label: "Phone Screen", value: "Phone Screen" },
  { label: "Technical Round", value: "Technical Round" },
];

const roleOptions = [
  { label: "All Roles", value: "" },
  { label: "Frontend Developer", value: "Frontend Developer" },
  { label: "Backend Developer", value: "Backend Developer" },
  { label: "Product Manager", value: "Product Manager" },
  { label: "UX Designer", value: "UX Designer" },
  { label: "Data Scientist", value: "Data Scientist" },
];

const locationOptions = [
  { label: "All Locations", value: "" },
  { label: "New York, NY", value: "New York, NY" },
  { label: "San Francisco, CA", value: "San Francisco, CA" },
  { label: "Austin, TX", value: "Austin, TX" },
  { label: "Seattle, WA", value: "Seattle, WA" },
  { label: "Chicago, IL", value: "Chicago, IL" },
  { label: "Boston, MA", value: "Boston, MA" },
];

const stats = [
  {
    label: "Total Candidates",
    value: "284",
    icon: <LuUsers size={18} />,
  },
  {
    label: "In Review",
    value: "64",
    icon: <LuClipboardList size={18} />,
  },
  {
    label: "Hired",
    value: "38",
    icon: <LuUserCheck size={18} />,
  },
];

const StatusTag = ({ status }: { status: CandidateStatus }) => {
  const config = STATUS_CONFIG[status];
  return (
    <Tag
      style={{
        background: config.bg,
        border: "none",
        color: config.color,
      }}
    >
      {status}
    </Tag>
  );
};

const columns: ColumnsType<Candidate> = [
  {
    title: "Candidate",
    key: "candidate",
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
    title: "Position",
    key: "position",
    render: (_, record) => (
      <div>
        <p className="text-white text-sm">{record.role}</p>
        <p className="text-dark-gray text-xs">{record.location}</p>
      </div>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: CandidateStatus) => <StatusTag status={status} />,
  },
  {
    title: "Experience",
    dataIndex: "experience",
    key: "experience",
  },
  {
    title: "Salary",
    dataIndex: "salary",
    key: "salary",
    render: (salary: string) => (
      <span className="text-white font-semibold">{salary}</span>
    ),
  },
  {
    title: "Applied",
    dataIndex: "appliedAt",
    key: "appliedAt",
  },
];

const Candidates = () => {
  const [view, setView] = useState<"grid" | "table">("table");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const filtered = useMemo(() => {
    return candidates.filter((c) => {
      const matchesSearch =
        !search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = !statusFilter || c.status === statusFilter;
      const matchesRole = !roleFilter || c.role === roleFilter;
      const matchesLocation = !locationFilter || c.location === locationFilter;
      return matchesSearch && matchesStatus && matchesRole && matchesLocation;
    });
  }, [search, statusFilter, roleFilter, locationFilter]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Candidates</h1>
          <p className="text-dark-gray text-sm">
            Manage and track all candidates
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ButtonComponent type="default" icon={<LuUpload size={16} />}>
            Import CSV
          </ButtonComponent>
          <ButtonComponent icon={<LuUserPlus size={16} />}>
            Add Candidate
          </ButtonComponent>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
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
          placeholder="Search candidates..."
          prefix={<LuSearch size={16} className="text-dark-gray" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          containerClassName="max-w-[260px]"
          allowClear
        />
        <SelectComponent
          placeholder="Status"
          options={statusOptions}
          value={statusFilter || undefined}
          onChange={(val) => setStatusFilter(val || "")}
          allowClear
          containerClassName="max-w-[180px]"
        />
        <SelectComponent
          placeholder="Role"
          options={roleOptions}
          value={roleFilter || undefined}
          onChange={(val) => setRoleFilter(val || "")}
          allowClear
          containerClassName="max-w-[180px]"
        />
        <SelectComponent
          placeholder="Location"
          options={locationOptions}
          value={locationFilter || undefined}
          onChange={(val) => setLocationFilter(val || "")}
          allowClear
          containerClassName="max-w-[180px]"
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
        <TableComponent<Candidate>
          columns={columns}
          dataSource={filtered}
          pageSize={5}
          size="small"
          rowSelection={{ type: "checkbox" }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c, index) => (
            <CardComponent key={c.key} padding="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
                  style={{
                    background: AVATAR_COLORS[index % AVATAR_COLORS.length],
                  }}
                >
                  {c.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-white text-sm font-semibold truncate">
                    {c.name}
                  </p>
                  <p className="text-dark-gray text-xs truncate">{c.email}</p>
                </div>
                <StatusTag status={c.status} />
              </div>

              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs mb-4">
                <div>
                  <p className="text-dark-gray mb-0.5">Role</p>
                  <p className="text-white">{c.role}</p>
                </div>
                <div>
                  <p className="text-dark-gray mb-0.5">Location</p>
                  <p className="text-white">{c.location}</p>
                </div>
                <div>
                  <p className="text-dark-gray mb-0.5">Experience</p>
                  <p className="text-white">{c.experience}</p>
                </div>
                <div>
                  <p className="text-dark-gray mb-0.5">Applied</p>
                  <p className="text-white">{c.appliedAt}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {c.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded text-xs bg-white/5 text-dark-gray border border-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardComponent>
          ))}
        </div>
      )}
    </div>
  );
};

export default Candidates;
