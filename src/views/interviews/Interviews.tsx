import { useState, useMemo } from "react";
import { DatePicker, Tag } from "antd";
import dayjs, { type Dayjs } from "dayjs";
import {
  LuCalendarPlus,
  LuCalendarDays,
  LuClock4,
  LuCircleCheck,
  LuCircleX,
  LuSearch,
  LuVideo,
  LuMapPin,
  LuUser,
  LuBriefcase,
  LuTimer,
} from "react-icons/lu";
import CardComponent from "../../components/ui/CardComponent";
import ButtonComponent from "../../components/ui/ButtonComponent";
import { InputComponent } from "../../components/ui/InputComponent";
import SelectComponent from "../../components/ui/SelectComponent";

type InterviewStatus = "Scheduled" | "In Progress" | "Completed" | "Cancelled";

interface Interview {
  key: string;
  candidateName: string;
  initials: string;
  role: string;
  date: string;
  time: string;
  duration: string;
  interviewer: string;
  platform: string;
  location: string;
  status: InterviewStatus;
  description: string;
}

const STATUS_CONFIG: Record<InterviewStatus, { color: string; bg: string }> = {
  Scheduled: { color: "#1677ff", bg: "#1677ff18" },
  "In Progress": { color: "#faad14", bg: "#faad1418" },
  Completed: { color: "#52c41a", bg: "#52c41a18" },
  Cancelled: { color: "#ff4d4f", bg: "#ff4d4f18" },
};

const AVATAR_COLORS = [
  "#3b82f6",
  "#f59e0b",
  "#10b981",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
];

const interviews: Interview[] = [
  {
    key: "1",
    candidateName: "Sarah Johnson",
    initials: "SJ",
    role: "Frontend Developer",
    date: dayjs().format("DD/MM/YYYY"),
    time: "09:00 AM",
    duration: "45 min",
    interviewer: "David Lee",
    platform: "Zoom",
    location: "Remote",
    status: "Scheduled",
    description: "Technical round focusing on React and TypeScript skills.",
  },
  {
    key: "2",
    candidateName: "Mike Chen",
    initials: "MC",
    role: "Product Manager",
    date: dayjs().format("DD/MM/YYYY"),
    time: "10:30 AM",
    duration: "60 min",
    interviewer: "Anna Smith",
    platform: "Google Meet",
    location: "Remote",
    status: "In Progress",
    description: "Culture fit and product vision discussion.",
  },
  {
    key: "3",
    candidateName: "Emma Wilson",
    initials: "EW",
    role: "UX Designer",
    date: dayjs().format("DD/MM/YYYY"),
    time: "01:00 PM",
    duration: "30 min",
    interviewer: "Chris Taylor",
    platform: "On-site",
    location: "New York, NY",
    status: "Scheduled",
    description: "Portfolio review and design challenge walkthrough.",
  },
  {
    key: "4",
    candidateName: "Alex Rodriguez",
    initials: "AR",
    role: "Data Scientist",
    date: dayjs().format("DD/MM/YYYY"),
    time: "02:30 PM",
    duration: "60 min",
    interviewer: "Rachel Kim",
    platform: "Zoom",
    location: "Remote",
    status: "Completed",
    description: "Machine learning case study and coding assessment.",
  },
  {
    key: "5",
    candidateName: "Jessica Lee",
    initials: "JL",
    role: "Backend Developer",
    date: dayjs().format("DD/MM/YYYY"),
    time: "04:00 PM",
    duration: "45 min",
    interviewer: "Mark Johnson",
    platform: "On-site",
    location: "San Francisco, CA",
    status: "Cancelled",
    description: "System design round — candidate rescheduled.",
  },
  {
    key: "6",
    candidateName: "David Park",
    initials: "DP",
    role: "Frontend Developer",
    date: dayjs().subtract(1, "day").format("DD/MM/YYYY"),
    time: "11:00 AM",
    duration: "45 min",
    interviewer: "David Lee",
    platform: "Google Meet",
    location: "Remote",
    status: "Completed",
    description: "Final round — behavioural and team fit evaluation.",
  },
  {
    key: "7",
    candidateName: "Priya Sharma",
    initials: "PS",
    role: "Product Manager",
    date: dayjs().add(1, "day").format("DD/MM/YYYY"),
    time: "10:00 AM",
    duration: "60 min",
    interviewer: "Anna Smith",
    platform: "Zoom",
    location: "Remote",
    status: "Scheduled",
    description: "Strategy case study and stakeholder management discussion.",
  },
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
  { label: "Remote", value: "Remote" },
  { label: "New York, NY", value: "New York, NY" },
  { label: "San Francisco, CA", value: "San Francisco, CA" },
];

const statusOptions = [
  { label: "All Status", value: "" },
  { label: "Scheduled", value: "Scheduled" },
  { label: "In Progress", value: "In Progress" },
  { label: "Completed", value: "Completed" },
  { label: "Cancelled", value: "Cancelled" },
];

const getStats = (list: Interview[]) => [
  {
    label: "Total Interviews",
    value: String(list.length),
    icon: <LuCalendarDays size={18} />,
  },
  {
    label: "Scheduled",
    value: String(list.filter((i) => i.status === "Scheduled").length),
    icon: <LuClock4 size={18} />,
  },
  {
    label: "Completed",
    value: String(list.filter((i) => i.status === "Completed").length),
    icon: <LuCircleCheck size={18} />,
  },
  {
    label: "Cancelled",
    value: String(list.filter((i) => i.status === "Cancelled").length),
    icon: <LuCircleX size={18} />,
  },
];

const StatusTag = ({ status }: { status: InterviewStatus }) => {
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

const Interviews = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = useMemo(() => {
    const dateStr = selectedDate.format("DD/MM/YYYY");
    return interviews.filter((i) => {
      const matchesDate = i.date === dateStr;
      const matchesSearch =
        !search ||
        i.candidateName.toLowerCase().includes(search.toLowerCase()) ||
        i.interviewer.toLowerCase().includes(search.toLowerCase());
      const matchesRole = !roleFilter || i.role === roleFilter;
      const matchesLocation = !locationFilter || i.location === locationFilter;
      const matchesStatus = !statusFilter || i.status === statusFilter;
      return (
        matchesDate &&
        matchesSearch &&
        matchesRole &&
        matchesLocation &&
        matchesStatus
      );
    });
  }, [selectedDate, search, roleFilter, locationFilter, statusFilter]);

  const stats = getStats(filtered);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Interviews</h1>
          <p className="text-dark-gray text-sm">
            Schedule and manage interviews
          </p>
        </div>
        <ButtonComponent icon={<LuCalendarPlus size={16} />}>
          Schedule Interview
        </ButtonComponent>
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

      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <DatePicker
          value={selectedDate}
          onChange={(date) => date && setSelectedDate(date)}
          format="DD MMM YYYY"
          allowClear={false}
          className="w-45!"
          showNow={false}
          needConfirm={false}
        />
        <InputComponent
          placeholder="Search name or interviewer..."
          prefix={<LuSearch size={16} className="text-dark-gray" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          containerClassName="max-w-[260px]"
          allowClear
        />
        <SelectComponent
          placeholder="Role"
          options={roleOptions}
          value={roleFilter || undefined}
          onChange={(val) => setRoleFilter(val || "")}
          allowClear
          containerClassName="max-w-[170px]"
        />
        <SelectComponent
          placeholder="Location"
          options={locationOptions}
          value={locationFilter || undefined}
          onChange={(val) => setLocationFilter(val || "")}
          allowClear
          containerClassName="max-w-[170px]"
        />
        <SelectComponent
          placeholder="Status"
          options={statusOptions}
          value={statusFilter || undefined}
          onChange={(val) => setStatusFilter(val || "")}
          allowClear
          containerClassName="max-w-[170px]"
        />
      </div>

      <p className="text-dark-gray text-xs mb-4">
        Showing interviews for{" "}
        <span className="text-white font-medium">
          {selectedDate.isSame(dayjs(), "day")
            ? "Today"
            : selectedDate.format("DD MMM YYYY")}
        </span>{" "}
        · {filtered.length} interview{filtered.length !== 1 ? "s" : ""}
      </p>

      {filtered.length === 0 ? (
        <CardComponent padding="p-10" className="text-center">
          <LuCalendarDays size={36} className="mx-auto text-dark-gray mb-3" />
          <p className="text-dark-gray text-sm">
            No interviews found for this date.
          </p>
        </CardComponent>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((interview, index) => (
            <CardComponent key={interview.key} padding="p-5">
              <div className="flex items-start gap-5">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 mt-0.5"
                  style={{
                    background: AVATAR_COLORS[index % AVATAR_COLORS.length],
                  }}
                >
                  {interview.initials}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-white text-sm font-semibold">
                        {interview.candidateName}
                      </h3>
                      <StatusTag status={interview.status} />
                    </div>
                  </div>

                  <div className="flex items-center gap-5 text-xs text-dark-gray mb-3 flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <LuBriefcase size={13} />
                      {interview.role}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <LuCalendarDays size={13} />
                      {interview.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <LuTimer size={13} />
                      {interview.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <LuUser size={13} />
                      {interview.interviewer}
                    </span>
                    <span className="flex items-center gap-1.5">
                      {interview.platform === "On-site" ? (
                        <LuMapPin size={13} />
                      ) : (
                        <LuVideo size={13} />
                      )}
                      {interview.platform === "On-site"
                        ? interview.location
                        : interview.platform}
                    </span>
                  </div>

                  <p className="text-dark-gray text-xs leading-relaxed">
                    {interview.description}
                  </p>
                </div>
              </div>
            </CardComponent>
          ))}
        </div>
      )}
    </div>
  );
};

export default Interviews;
