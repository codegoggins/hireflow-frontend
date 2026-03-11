import { useState, useMemo } from "react";
import type { ColumnsType } from "antd/es/table";
import {
  LuBuilding2,
  LuUsers,
  LuBriefcase,
  LuTrendingUp,
  LuCrown,
  LuPlus,
  LuSearch,
  LuLayoutGrid,
  LuLayoutList,
  LuPencil,
  LuTrash2,
  LuMonitor,
  LuPalette,
  LuMegaphone,
  LuShieldCheck,
  LuChartBar,
  LuHeadphones,
} from "react-icons/lu";
import CardComponent from "../../components/ui/CardComponent";
import ButtonComponent from "../../components/ui/ButtonComponent";
import { InputComponent } from "../../components/ui/InputComponent";
import SelectComponent from "../../components/ui/SelectComponent";
import TableComponent from "../../components/ui/TableComponent";
import type { ReactNode } from "react";

type DepartmentStatus = "Active" | "Inactive";

interface Department {
  key: string;
  name: string;
  description: string;
  status: DepartmentStatus;
  icon: ReactNode;
  accentColor: string;
  headName: string;
  headInitials: string;
  employees: number;
  openRoles: number;
  hireRate: string;
  avgSalary: string;
  budget: string;
}

const STATUS_CONFIG: Record<DepartmentStatus, { color: string; bg: string }> = {
  Active: { color: "#52c41a", bg: "#52c41a18" },
  Inactive: { color: "#ff4d4f", bg: "#ff4d4f18" },
};

const departments: Department[] = [
  {
    key: "1",
    name: "Engineering",
    description: "Software development and technical roles",
    status: "Active",
    icon: <LuMonitor size={20} />,
    accentColor: "#3b82f6",
    headName: "John Smith",
    headInitials: "JS",
    employees: 45,
    openRoles: 8,
    hireRate: "78%",
    avgSalary: "$95,000",
    budget: "$2,400,000",
  },
  {
    key: "2",
    name: "Product Management",
    description: "Product strategy and roadmap management",
    status: "Active",
    icon: <LuChartBar size={20} />,
    accentColor: "#8b5cf6",
    headName: "Emily Davis",
    headInitials: "ED",
    employees: 12,
    openRoles: 3,
    hireRate: "82%",
    avgSalary: "$125,000",
    budget: "$1,800,000",
  },
  {
    key: "3",
    name: "Design",
    description: "User experience and visual design",
    status: "Active",
    icon: <LuPalette size={20} />,
    accentColor: "#10b981",
    headName: "Lisa Wang",
    headInitials: "LW",
    employees: 18,
    openRoles: 4,
    hireRate: "85%",
    avgSalary: "$85,000",
    budget: "$1,200,000",
  },
  {
    key: "4",
    name: "Marketing",
    description: "Brand strategy and growth marketing",
    status: "Active",
    icon: <LuMegaphone size={20} />,
    accentColor: "#f59e0b",
    headName: "James Patel",
    headInitials: "JP",
    employees: 22,
    openRoles: 5,
    hireRate: "74%",
    avgSalary: "$78,000",
    budget: "$950,000",
  },
  {
    key: "5",
    name: "HR & People",
    description: "Talent acquisition and people operations",
    status: "Active",
    icon: <LuShieldCheck size={20} />,
    accentColor: "#ec4899",
    headName: "Sophie Grant",
    headInitials: "SG",
    employees: 10,
    openRoles: 2,
    hireRate: "88%",
    avgSalary: "$72,000",
    budget: "$680,000",
  },
  {
    key: "6",
    name: "Customer Support",
    description: "Client success and technical support",
    status: "Inactive",
    icon: <LuHeadphones size={20} />,
    accentColor: "#6366f1",
    headName: "Ryan Murphy",
    headInitials: "RM",
    employees: 13,
    openRoles: 2,
    hireRate: "70%",
    avgSalary: "$62,000",
    budget: "$520,000",
  },
];

const statusOptions = [
  { label: "All Status", value: "" },
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

const totalEmployees = departments.reduce((s, d) => s + d.employees, 0);
const totalOpenRoles = departments.reduce((s, d) => s + d.openRoles, 0);
const avgHireRate =
  Math.round(
    departments.reduce((s, d) => s + parseInt(d.hireRate), 0) /
      departments.length,
  ) + "%";
const mostActive = departments.reduce((a, b) =>
  a.employees > b.employees ? a : b,
);

const stats = [
  {
    label: "Total Departments",
    value: String(departments.length),
    icon: <LuBuilding2 size={18} />,
  },
  {
    label: "Total Employees",
    value: String(totalEmployees),
    icon: <LuUsers size={18} />,
  },
  {
    label: "Open Positions",
    value: String(totalOpenRoles),
    icon: <LuBriefcase size={18} />,
  },
  {
    label: "Avg Hire Rate",
    value: avgHireRate,
    icon: <LuTrendingUp size={18} />,
  },
  {
    label: "Most Active",
    value: mostActive.name,
    icon: <LuCrown size={18} />,
  },
];

const StatusTag = ({ status }: { status: DepartmentStatus }) => {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ background: config.bg, color: config.color }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: config.color }}
      />
      {status}
    </span>
  );
};

const columns: ColumnsType<Department> = [
  {
    title: "Department",
    key: "department",
    render: (_, record) => (
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-gradient-green text-white">
          {record.icon}
        </div>
        <div>
          <p className="text-white text-sm font-medium leading-tight">
            {record.name}
          </p>
          <p className="text-dark-gray text-xs">{record.description}</p>
        </div>
      </div>
    ),
  },
  {
    title: "Head",
    key: "head",
    render: (_, record) => (
      <span className="text-white text-sm">{record.headName}</span>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: DepartmentStatus) => <StatusTag status={status} />,
  },
  {
    title: "Employees",
    dataIndex: "employees",
    key: "employees",
    render: (val: number) => (
      <span className="text-white font-semibold">{val}</span>
    ),
  },
  {
    title: "Open Roles",
    dataIndex: "openRoles",
    key: "openRoles",
    render: (val: number) => (
      <span className="text-white font-semibold">{val}</span>
    ),
  },
  {
    title: "Hire Rate",
    dataIndex: "hireRate",
    key: "hireRate",
  },
  {
    title: "Avg Salary",
    dataIndex: "avgSalary",
    key: "avgSalary",
  },
];

const Departments = () => {
  const [view, setView] = useState<"grid" | "table">("grid");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = useMemo(() => {
    return departments.filter((d) => {
      const matchesSearch =
        !search ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.headName.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = !statusFilter || d.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Departments</h1>
          <p className="text-dark-gray text-sm">Manage company departments</p>
        </div>
        <ButtonComponent icon={<LuPlus size={16} />}>
          Add Department
        </ButtonComponent>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6">
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
            <p className="text-white text-xl font-bold leading-tight ml-1">
              {stat.value}
            </p>
          </CardComponent>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-5">
        <InputComponent
          placeholder="Search departments..."
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
        <TableComponent<Department>
          columns={columns}
          dataSource={filtered}
          pageSize={6}
          size="small"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((dept) => (
            <CardComponent
              key={dept.key}
              padding="p-0"
              className="overflow-hidden"
            >
              <div className="h-1 bg-gradient-green" />

              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-gradient-green text-white">
                      {dept.icon}
                    </div>
                    <div>
                      <h3 className="text-white text-base font-semibold">
                        {dept.name}
                      </h3>
                      <p className="text-dark-gray text-xs">
                        {dept.description}
                      </p>
                    </div>
                  </div>
                  <StatusTag status={dept.status} />
                </div>

                <div className="flex items-center justify-between mb-4 text-xs">
                  <span className="text-dark-gray">Department Head</span>
                  <span className="text-white font-medium">
                    {dept.headName}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="rounded-lg px-4 py-3 text-center bg-white/4 border border-white/5">
                    <p className="text-xl font-bold text-primary-green">
                      {dept.employees}
                    </p>
                    <p className="text-[11px] text-dark-gray">Employees</p>
                  </div>
                  <div className="rounded-lg px-4 py-3 text-center bg-white/4 border border-white/5">
                    <p className="text-xl font-bold text-primary-green">
                      {dept.openRoles}
                    </p>
                    <p className="text-[11px] text-dark-gray">Open Roles</p>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-dark-gray">Hire Rate</span>
                    <span className="text-white font-medium">
                      {dept.hireRate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-dark-gray">Avg Salary</span>
                    <span className="text-white font-medium">
                      {dept.avgSalary}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <p className="text-dark-gray text-xs">
                    Budget:{" "}
                    <span className="text-white font-medium">
                      {dept.budget}
                    </span>
                  </p>
                  <div className="flex items-center gap-2">
                    <button className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-dark-gray hover:text-white hover:bg-white/5 transition-colors">
                      <LuPencil size={13} />
                    </button>
                    <button className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-dark-gray hover:text-red-400 hover:bg-white/5 transition-colors">
                      <LuTrash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </CardComponent>
          ))}
        </div>
      )}
    </div>
  );
};

export default Departments;
