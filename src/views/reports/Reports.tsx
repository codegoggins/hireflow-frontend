import { useState, useMemo } from "react";
import type { ColumnsType } from "antd/es/table";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import {
  LuSearch,
  LuDownload,
  LuActivity,
  LuUserPlus,
  LuUserMinus,
  LuPencil,
  LuTrash2,
  LuEye,
  LuLogIn,
  LuLogOut,
  LuSettings,
  LuCalendarCheck,
  LuCircleCheck,
  LuCircleX,
  LuClipboardList,
  LuUpload,
  LuMail,
  LuFilter,
  LuBuilding2,
  LuUsers,
  LuClock,
  LuShieldCheck,
} from "react-icons/lu";
import type { ReactNode } from "react";
import CardComponent from "../../components/ui/CardComponent";
import ButtonComponent from "../../components/ui/ButtonComponent";
import { InputComponent } from "../../components/ui/InputComponent";
import SelectComponent from "../../components/ui/SelectComponent";
import TableComponent from "../../components/ui/TableComponent";

type LogCategory =
  | "Candidates"
  | "Interviews"
  | "Departments"
  | "Interviewers"
  | "Queue"
  | "Settings"
  | "Auth";

type LogSeverity = "info" | "warning" | "success" | "error";

interface AuditLog {
  key: string;
  timestamp: string;
  user: string;
  action: string;
  category: LogCategory;
  severity: LogSeverity;
  target: string;
  detail: string;
  ip: string;
}

const CATEGORY_ICON: Record<LogCategory, ReactNode> = {
  Candidates: <LuUserPlus size={13} />,
  Interviews: <LuCalendarCheck size={13} />,
  Departments: <LuBuilding2 size={13} />,
  Interviewers: <LuUsers size={13} />,
  Queue: <LuClipboardList size={13} />,
  Settings: <LuSettings size={13} />,
  Auth: <LuShieldCheck size={13} />,
};

const CATEGORY_COLOR: Record<LogCategory, string> = {
  Candidates: "#268d62",
  Interviews: "#1677ff",
  Departments: "#8b5cf6",
  Interviewers: "#f59e0b",
  Queue: "#ec4899",
  Settings: "#6366f1",
  Auth: "#123139",
};

const ACTION_ICON: Record<string, ReactNode> = {
  Created: <LuUserPlus size={13} />,
  Updated: <LuPencil size={13} />,
  Deleted: <LuTrash2 size={13} />,
  Viewed: <LuEye size={13} />,
  "Logged In": <LuLogIn size={13} />,
  "Logged Out": <LuLogOut size={13} />,
  Scheduled: <LuCalendarCheck size={13} />,
  Completed: <LuCircleCheck size={13} />,
  Cancelled: <LuCircleX size={13} />,
  Exported: <LuDownload size={13} />,
  Imported: <LuUpload size={13} />,
  Invited: <LuMail size={13} />,
  Approved: <LuCircleCheck size={13} />,
  Rejected: <LuCircleX size={13} />,
  Configured: <LuSettings size={13} />,
};

const SEVERITY_CONFIG: Record<
  LogSeverity,
  { color: string; bg: string; label: string }
> = {
  info: { color: "#1677ff", bg: "#1677ff15", label: "Info" },
  warning: { color: "#faad14", bg: "#faad1415", label: "Warning" },
  success: { color: "#52c41a", bg: "#52c41a15", label: "Success" },
  error: { color: "#ff4d4f", bg: "#ff4d4f15", label: "Error" },
};

const USERS = [
  "Sarah Chen",
  "Mark Johnson",
  "Lisa Wang",
  "James Patel",
  "Emily Davis",
  "John Smith",
  "Sophie Grant",
  "Ryan Murphy",
];

const auditLogs: AuditLog[] = [
  {
    key: "1",
    timestamp: "2026-03-11 09:42:18",
    user: "Sarah Chen",
    action: "Created",
    category: "Candidates",
    severity: "success",
    target: "Alex Thompson",
    detail: "Added new candidate for Senior Frontend Engineer role",
    ip: "192.168.1.45",
  },
  {
    key: "2",
    timestamp: "2026-03-11 09:38:05",
    user: "Mark Johnson",
    action: "Scheduled",
    category: "Interviews",
    severity: "info",
    target: "Technical Round — Maria Garcia",
    detail: "Scheduled for Mar 14, 2:00 PM with panel of 3",
    ip: "192.168.1.82",
  },
  {
    key: "3",
    timestamp: "2026-03-11 09:35:22",
    user: "John Smith",
    action: "Logged In",
    category: "Auth",
    severity: "info",
    target: "Dashboard",
    detail: "Authenticated via SSO from Chrome/macOS",
    ip: "10.0.0.12",
  },
  {
    key: "4",
    timestamp: "2026-03-11 09:30:11",
    user: "Lisa Wang",
    action: "Updated",
    category: "Departments",
    severity: "info",
    target: "Design Department",
    detail: "Updated open roles from 3 to 4, budget adjusted",
    ip: "192.168.1.67",
  },
  {
    key: "5",
    timestamp: "2026-03-11 09:25:44",
    user: "Emily Davis",
    action: "Completed",
    category: "Interviews",
    severity: "success",
    target: "Behavioral Round — David Kim",
    detail: "Interview completed with rating 4.5/5, recommended for hire",
    ip: "192.168.1.93",
  },
  {
    key: "6",
    timestamp: "2026-03-11 09:20:30",
    user: "James Patel",
    action: "Exported",
    category: "Candidates",
    severity: "info",
    target: "Candidate Pipeline Report",
    detail: "Exported 284 candidate records as CSV",
    ip: "192.168.1.55",
  },
  {
    key: "7",
    timestamp: "2026-03-11 09:15:08",
    user: "Sophie Grant",
    action: "Invited",
    category: "Interviewers",
    severity: "success",
    target: "Rachel Adams",
    detail: "Sent interviewer onboarding invitation for Engineering panel",
    ip: "192.168.1.41",
  },
  {
    key: "8",
    timestamp: "2026-03-11 09:10:55",
    user: "Ryan Murphy",
    action: "Cancelled",
    category: "Queue",
    severity: "warning",
    target: "Queue Item #Q-2847",
    detail: "Candidate withdrew application, removed from interview queue",
    ip: "192.168.1.78",
  },
  {
    key: "9",
    timestamp: "2026-03-11 09:05:33",
    user: "Sarah Chen",
    action: "Approved",
    category: "Candidates",
    severity: "success",
    target: "Jennifer Lee",
    detail: "Moved to offer stage — Senior Product Designer position",
    ip: "192.168.1.45",
  },
  {
    key: "10",
    timestamp: "2026-03-11 09:00:12",
    user: "Mark Johnson",
    action: "Configured",
    category: "Settings",
    severity: "info",
    target: "Interview Templates",
    detail: "Updated technical interview scoring rubric for Engineering",
    ip: "192.168.1.82",
  },
  {
    key: "11",
    timestamp: "2026-03-11 08:55:47",
    user: "John Smith",
    action: "Deleted",
    category: "Candidates",
    severity: "error",
    target: "Duplicate Record — Tom Wilson",
    detail: "Removed duplicate candidate entry, merged with existing profile",
    ip: "10.0.0.12",
  },
  {
    key: "12",
    timestamp: "2026-03-11 08:50:20",
    user: "Lisa Wang",
    action: "Created",
    category: "Departments",
    severity: "success",
    target: "Data Science",
    detail: "Created new department with initial budget of $1,200,000",
    ip: "192.168.1.67",
  },
  {
    key: "13",
    timestamp: "2026-03-11 08:45:09",
    user: "Emily Davis",
    action: "Rejected",
    category: "Candidates",
    severity: "error",
    target: "Mike Brown",
    detail: "Did not meet minimum technical requirements for role",
    ip: "192.168.1.93",
  },
  {
    key: "14",
    timestamp: "2026-03-11 08:40:38",
    user: "James Patel",
    action: "Imported",
    category: "Candidates",
    severity: "success",
    target: "Bulk Import",
    detail: "Imported 35 candidates from LinkedIn recruiter export",
    ip: "192.168.1.55",
  },
  {
    key: "15",
    timestamp: "2026-03-11 08:35:15",
    user: "Sophie Grant",
    action: "Updated",
    category: "Interviewers",
    severity: "info",
    target: "Interviewer Availability",
    detail: "Updated availability for 5 interviewers for next week",
    ip: "192.168.1.41",
  },
  {
    key: "16",
    timestamp: "2026-03-11 08:30:02",
    user: "Ryan Murphy",
    action: "Viewed",
    category: "Queue",
    severity: "info",
    target: "Interview Queue Dashboard",
    detail: "Accessed real-time queue monitoring with 8 active sessions",
    ip: "192.168.1.78",
  },
  {
    key: "17",
    timestamp: "2026-03-11 08:25:44",
    user: "Sarah Chen",
    action: "Scheduled",
    category: "Interviews",
    severity: "info",
    target: "Final Round — Priya Sharma",
    detail: "Scheduled with VP of Engineering for Mar 15, 10:00 AM",
    ip: "192.168.1.45",
  },
  {
    key: "18",
    timestamp: "2026-03-11 08:20:18",
    user: "Mark Johnson",
    action: "Logged Out",
    category: "Auth",
    severity: "info",
    target: "Session End",
    detail: "Session terminated after 4h 22m of activity",
    ip: "192.168.1.82",
  },
  {
    key: "19",
    timestamp: "2026-03-11 08:15:55",
    user: "John Smith",
    action: "Exported",
    category: "Interviews",
    severity: "info",
    target: "Weekly Interview Report",
    detail: "Generated PDF report for 86 interviews this week",
    ip: "10.0.0.12",
  },
  {
    key: "20",
    timestamp: "2026-03-11 08:10:30",
    user: "Lisa Wang",
    action: "Updated",
    category: "Candidates",
    severity: "info",
    target: "Stage Change — Kevin Zhang",
    detail: "Moved from screening to technical interview stage",
    ip: "192.168.1.67",
  },
];

const allCategories = Object.keys(CATEGORY_ICON) as LogCategory[];
const allActions = Object.keys(ACTION_ICON);

const categoryOptions = [
  { label: "All Sections", value: "" },
  ...allCategories.map((c) => ({ label: c, value: c })),
];

const userOptions = [
  { label: "All Users", value: "" },
  ...USERS.map((u) => ({ label: u, value: u })),
];

const actionOptions = [
  { label: "All Actions", value: "" },
  ...allActions.map((a) => ({ label: a, value: a })),
];

const severityOptions = [
  { label: "All Levels", value: "" },
  { label: "Info", value: "info" },
  { label: "Success", value: "success" },
  { label: "Warning", value: "warning" },
  { label: "Error", value: "error" },
];

const statData = (() => {
  const today = auditLogs.length;
  const byCategory: Record<string, number> = {};
  const bySeverity: Record<string, number> = {};
  const byUser: Record<string, number> = {};
  auditLogs.forEach((log) => {
    byCategory[log.category] = (byCategory[log.category] || 0) + 1;
    bySeverity[log.severity] = (bySeverity[log.severity] || 0) + 1;
    byUser[log.user] = (byUser[log.user] || 0) + 1;
  });
  const topCategory = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];
  const mostActive = Object.entries(byUser).sort((a, b) => b[1] - a[1])[0];
  return {
    total: today,
    topCategory: topCategory[0],
    topCategoryCount: topCategory[1],
    errors: bySeverity["error"] || 0,
    warnings: bySeverity["warning"] || 0,
    mostActiveUser: mostActive[0],
    mostActiveCount: mostActive[1],
  };
})();

const Reports = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [severityFilter, setSeverityFilter] = useState("");
  const [dateFilter, setDateFilter] = useState<dayjs.Dayjs | null>(null);

  const filtered = useMemo(() => {
    return auditLogs.filter((log) => {
      const matchSearch =
        !search ||
        log.action.toLowerCase().includes(search.toLowerCase()) ||
        log.target.toLowerCase().includes(search.toLowerCase()) ||
        log.detail.toLowerCase().includes(search.toLowerCase()) ||
        log.user.toLowerCase().includes(search.toLowerCase());
      const matchCategory = !categoryFilter || log.category === categoryFilter;
      const matchUser = !userFilter || log.user === userFilter;
      const matchAction = !actionFilter || log.action === actionFilter;
      const matchSeverity = !severityFilter || log.severity === severityFilter;
      const matchDate =
        !dateFilter ||
        log.timestamp.startsWith(dateFilter.format("YYYY-MM-DD"));
      return (
        matchSearch &&
        matchCategory &&
        matchUser &&
        matchAction &&
        matchSeverity &&
        matchDate
      );
    });
  }, [
    search,
    categoryFilter,
    userFilter,
    actionFilter,
    severityFilter,
    dateFilter,
  ]);

  const columns: ColumnsType<AuditLog> = [
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
      width: 170,
      render: (val: string) => {
        const [date, time] = val.split(" ");
        return (
          <div>
            <p className="text-white text-xs font-medium">{time}</p>
            <p className="text-dark-gray text-[11px]">{date}</p>
          </div>
        );
      },
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      width: 150,
      render: (val: string) => (
        <span className="text-white text-sm">{val}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 130,
      render: (_, record) => {
        const severity = SEVERITY_CONFIG[record.severity];
        return (
          <span
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium"
            style={{ background: severity.bg, color: severity.color }}
          >
            {ACTION_ICON[record.action] || <LuActivity size={13} />}
            {record.action}
          </span>
        );
      },
    },
    {
      title: "Section",
      dataIndex: "category",
      key: "category",
      width: 140,
      render: (val: LogCategory) => (
        <span className="inline-flex items-center gap-1.5 text-xs">
          <span
            className="w-6 h-6 rounded flex items-center justify-center"
            style={{
              background: CATEGORY_COLOR[val] + "18",
              color: CATEGORY_COLOR[val],
            }}
          >
            {CATEGORY_ICON[val]}
          </span>
          <span className="text-white">{val}</span>
        </span>
      ),
    },
    {
      title: "Target",
      dataIndex: "target",
      key: "target",
      render: (val: string) => (
        <span className="text-white text-sm font-medium">{val}</span>
      ),
    },
    {
      title: "Details",
      dataIndex: "detail",
      key: "detail",
      ellipsis: true,
      render: (val: string) => (
        <span className="text-dark-gray text-xs">{val}</span>
      ),
    },
    {
      title: "IP",
      dataIndex: "ip",
      key: "ip",
      width: 120,
      render: (val: string) => (
        <span className="text-dark-gray text-xs font-mono">{val}</span>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Reports & Audit Log</h1>
          <p className="text-dark-gray text-sm">
            Activity history across all sections
          </p>
        </div>
        <ButtonComponent icon={<LuDownload size={16} />}>
          Export Logs
        </ButtonComponent>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-5">
        <CardComponent padding="p-4" className="flex flex-col gap-2">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-white bg-gradient-green">
            <LuActivity size={18} />
          </div>
          <p className="text-dark-gray text-xs">Total Events</p>
          <p className="text-white text-xl font-bold">{statData.total}</p>
        </CardComponent>
        <CardComponent padding="p-4" className="flex flex-col gap-2">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-white bg-gradient-green">
            <LuFilter size={18} />
          </div>
          <p className="text-dark-gray text-xs">Most Active Section</p>
          <p className="text-white text-xl font-bold">{statData.topCategory}</p>
        </CardComponent>
        <CardComponent padding="p-4" className="flex flex-col gap-2">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-white bg-gradient-green">
            <LuUsers size={18} />
          </div>
          <p className="text-dark-gray text-xs">Most Active User</p>
          <p className="text-white text-xl font-bold">
            {statData.mostActiveUser}
          </p>
        </CardComponent>
        <CardComponent padding="p-4" className="flex flex-col gap-2">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-white bg-gradient-green">
            <LuCircleX size={18} />
          </div>
          <p className="text-dark-gray text-xs">Errors</p>
          <p className="text-white text-xl font-bold">{statData.errors}</p>
        </CardComponent>
        <CardComponent padding="p-4" className="flex flex-col gap-2">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-white bg-gradient-green">
            <LuClock size={18} />
          </div>
          <p className="text-dark-gray text-xs">Last Activity</p>
          <p className="text-white text-xl font-bold">2m ago</p>
        </CardComponent>
      </div>

      <CardComponent padding="p-0" className="mb-5">
        <div className="flex items-center gap-3 p-4 border-b border-white/5 flex-wrap">
          <InputComponent
            placeholder="Search logs..."
            prefix={<LuSearch size={16} className="text-dark-gray" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            containerClassName="max-w-[220px]"
            allowClear
          />
          <SelectComponent
            placeholder="Section"
            options={categoryOptions}
            value={categoryFilter || undefined}
            onChange={(val) => setCategoryFilter(val || "")}
            allowClear
            containerClassName="max-w-[150px]"
          />
          <SelectComponent
            placeholder="User"
            options={userOptions}
            value={userFilter || undefined}
            onChange={(val) => setUserFilter(val || "")}
            allowClear
            containerClassName="max-w-[160px]"
          />
          <SelectComponent
            placeholder="Action"
            options={actionOptions}
            value={actionFilter || undefined}
            onChange={(val) => setActionFilter(val || "")}
            allowClear
            containerClassName="max-w-[140px]"
          />
          <SelectComponent
            placeholder="Severity"
            options={severityOptions}
            value={severityFilter || undefined}
            onChange={(val) => setSeverityFilter(val || "")}
            allowClear
            containerClassName="max-w-[130px]"
          />
          <DatePicker
            value={dateFilter}
            onChange={(val) => setDateFilter(val)}
            placeholder="Date"
            allowClear
            className="max-w-35"
          />
          <div className="ml-auto text-dark-gray text-xs">
            {filtered.length} of {auditLogs.length} events
          </div>
        </div>
        <TableComponent<AuditLog>
          columns={columns}
          dataSource={filtered}
          pageSize={10}
          size="small"
        />
      </CardComponent>

      <div className="grid grid-cols-12 gap-4">
        <CardComponent padding="p-5" className="col-span-4">
          <h3 className="text-white text-sm font-semibold mb-4">
            Activity by Section
          </h3>
          <div className="space-y-3">
            {allCategories.map((cat) => {
              const count = auditLogs.filter((l) => l.category === cat).length;
              const pct = Math.round((count / auditLogs.length) * 100);
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="flex items-center gap-2 text-xs">
                      <span
                        className="w-6 h-6 rounded flex items-center justify-center"
                        style={{
                          background: CATEGORY_COLOR[cat] + "18",
                          color: CATEGORY_COLOR[cat],
                        }}
                      >
                        {CATEGORY_ICON[cat]}
                      </span>
                      <span className="text-white">{cat}</span>
                    </span>
                    <span className="text-dark-gray text-xs">
                      {count} events
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${pct}%`,
                        background: CATEGORY_COLOR[cat],
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardComponent>

        <CardComponent padding="p-5" className="col-span-4">
          <h3 className="text-white text-sm font-semibold mb-4">
            Activity by User
          </h3>
          <div className="space-y-3">
            {USERS.map((user) => {
              const count = auditLogs.filter((l) => l.user === user).length;
              if (count === 0) return null;
              return (
                <div key={user} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-gradient-green flex items-center justify-center text-white text-[10px] font-semibold shrink-0">
                      {user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <span className="text-white text-sm">{user}</span>
                  </div>
                  <span className="text-dark-gray text-xs font-medium">
                    {count} actions
                  </span>
                </div>
              );
            })}
          </div>
        </CardComponent>

        <CardComponent padding="p-5" className="col-span-4">
          <h3 className="text-white text-sm font-semibold mb-4">
            Recent Critical Events
          </h3>
          <div className="space-y-3">
            {auditLogs
              .filter((l) => l.severity === "error" || l.severity === "warning")
              .slice(0, 5)
              .map((log) => {
                const sev = SEVERITY_CONFIG[log.severity];
                return (
                  <div
                    key={log.key}
                    className="flex items-start gap-3 p-2.5 rounded-lg bg-white/2 border border-white/5"
                  >
                    <span
                      className="w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: sev.bg, color: sev.color }}
                    >
                      {log.severity === "error" ? (
                        <LuCircleX size={13} />
                      ) : (
                        <LuClock size={13} />
                      )}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-white text-xs font-medium truncate">
                          {log.action} — {log.target}
                        </span>
                        <span
                          className="px-1.5 py-0.5 rounded text-[10px] font-medium shrink-0"
                          style={{ background: sev.bg, color: sev.color }}
                        >
                          {sev.label}
                        </span>
                      </div>
                      <p className="text-dark-gray text-[11px] truncate">
                        {log.detail}
                      </p>
                      <p className="text-dark-gray text-[10px] mt-1">
                        {log.user} · {log.timestamp.split(" ")[1]}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </CardComponent>
      </div>
    </div>
  );
};

export default Reports;
