import { useState } from "react";
import { Switch } from "antd";
import {
  LuUser,
  LuBell,
  LuShieldCheck,
  LuPuzzle,
  LuCamera,
  LuPencil,
  LuKey,
  LuFingerprint,
  LuSmartphone,
  LuLaptop,
  LuLogOut,
  LuCalendar,
  LuSlack,
  LuMonitor,
  LuExternalLink,
  LuGlobe,
} from "react-icons/lu";
import type { ReactNode } from "react";
import CardComponent from "../../components/ui/CardComponent";
import ButtonComponent from "../../components/ui/ButtonComponent";
import { InputComponent } from "../../components/ui/InputComponent";

type SectionKey = "profile" | "notifications" | "security" | "integrations";

interface NavItem {
  key: SectionKey;
  label: string;
  description: string;
  icon: ReactNode;
}

const navItems: NavItem[] = [
  {
    key: "profile",
    label: "Profile",
    description: "Your personal information",
    icon: <LuUser size={18} />,
  },
  {
    key: "notifications",
    label: "Notifications",
    description: "Email & push preferences",
    icon: <LuBell size={18} />,
  },
  {
    key: "security",
    label: "Security",
    description: "Password & authentication",
    icon: <LuShieldCheck size={18} />,
  },
  {
    key: "integrations",
    label: "Integrations",
    description: "Connected apps & services",
    icon: <LuPuzzle size={18} />,
  },
];

const sessions = [
  {
    device: "MacBook Pro",
    icon: <LuLaptop size={16} />,
    location: "San Francisco, CA",
    browser: "Chrome 122",
    lastActive: "Active now",
    current: true,
  },
  {
    device: "iPhone 15",
    icon: <LuSmartphone size={16} />,
    location: "San Francisco, CA",
    browser: "Safari Mobile",
    lastActive: "2 hours ago",
    current: false,
  },
  {
    device: "Windows Desktop",
    icon: <LuMonitor size={16} />,
    location: "New York, NY",
    browser: "Firefox 124",
    lastActive: "3 days ago",
    current: false,
  },
];

const integrations = [
  {
    name: "Google Calendar",
    description: "Sync interview schedules with Google Calendar",
    icon: <LuCalendar size={20} />,
    connected: true,
    color: "#268d62",
  },
  {
    name: "Slack",
    description: "Get real-time notifications in Slack channels",
    icon: <LuSlack size={20} />,
    connected: true,
    color: "#268d62",
  },
  {
    name: "Microsoft Teams",
    description: "Video interviews and team collaboration",
    icon: <LuMonitor size={20} />,
    connected: false,
    color: "#268d62",
  },
  {
    name: "LinkedIn",
    description: "Import candidate profiles from LinkedIn",
    icon: <LuGlobe size={20} />,
    connected: false,
    color: "#268d62",
  },
];

const ProfileSection = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-white text-lg font-semibold mb-1">Profile</h2>
      <p className="text-dark-gray text-sm">
        Update your personal information and profile picture
      </p>
    </div>

    <CardComponent padding="p-6">
      <div className="flex items-center gap-5 mb-8">
        <div className="relative group">
          <div className="w-20 h-20 rounded-full bg-gradient-green flex items-center justify-center text-white text-2xl font-bold">
            SC
          </div>
          <button className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <LuCamera size={20} className="text-white" />
          </button>
        </div>
        <div>
          <h3 className="text-white text-base font-semibold">Sarah Chen</h3>
          <p className="text-dark-gray text-sm">Engineering Manager</p>
          <button className="text-primary-green text-xs font-medium mt-1 hover:underline flex items-center gap-1">
            <LuPencil size={11} />
            Change photo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <InputComponent
          label="First Name"
          defaultValue="Sarah"
          containerClassName="text-white"
        />
        <InputComponent
          label="Last Name"
          defaultValue="Chen"
          containerClassName="text-white"
        />
        <InputComponent
          label="Email"
          defaultValue="sarah.chen@hireflow.com"
          containerClassName="text-white"
        />
        <InputComponent
          label="Phone"
          defaultValue="+1 (415) 555-0124"
          containerClassName="text-white"
        />
        <InputComponent
          label="Job Title"
          defaultValue="Engineering Manager"
          containerClassName="text-white"
        />
        <InputComponent
          label="Department"
          defaultValue="Engineering"
          containerClassName="text-white"
        />
      </div>

      <InputComponent
        label="Bio"
        defaultValue="Passionate about building great teams and shipping impactful products."
        containerClassName="text-white mb-6"
      />

      <div className="flex justify-end">
        <ButtonComponent>Save Changes</ButtonComponent>
      </div>
    </CardComponent>
  </div>
);

const NotificationsSection = () => {
  const [emailNotifs, setEmailNotifs] = useState({
    newCandidate: true,
    interviewScheduled: true,
    interviewCompleted: true,
    weeklyDigest: true,
    teamUpdates: false,
    systemAlerts: true,
  });

  const [pushNotifs, setPushNotifs] = useState({
    newCandidate: true,
    interviewReminder: true,
    statusChanges: true,
    mentions: true,
    queueUpdates: false,
  });

  const NotifRow = ({
    label,
    description,
    checked,
    onChange,
  }: {
    label: string;
    description: string;
    checked: boolean;
    onChange: (val: boolean) => void;
  }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-white text-sm font-medium">{label}</p>
        <p className="text-dark-gray text-xs mt-0.5">{description}</p>
      </div>
      <Switch checked={checked} onChange={onChange} />
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-lg font-semibold mb-1">Notifications</h2>
        <p className="text-dark-gray text-sm">
          Control how and when you receive notifications
        </p>
      </div>

      <CardComponent padding="p-6">
        <h3 className="text-white text-sm font-semibold mb-1">
          Email Notifications
        </h3>
        <p className="text-dark-gray text-xs mb-2">
          Notifications sent to sarah.chen@hireflow.com
        </p>
        <div className="divide-y divide-white/5">
          <NotifRow
            label="New Candidate Added"
            description="When a new candidate is added to your pipeline"
            checked={emailNotifs.newCandidate}
            onChange={(v) => setEmailNotifs((s) => ({ ...s, newCandidate: v }))}
          />
          <NotifRow
            label="Interview Scheduled"
            description="When an interview is scheduled for your team"
            checked={emailNotifs.interviewScheduled}
            onChange={(v) =>
              setEmailNotifs((s) => ({ ...s, interviewScheduled: v }))
            }
          />
          <NotifRow
            label="Interview Completed"
            description="When an interviewer submits their feedback"
            checked={emailNotifs.interviewCompleted}
            onChange={(v) =>
              setEmailNotifs((s) => ({ ...s, interviewCompleted: v }))
            }
          />
          <NotifRow
            label="Weekly Digest"
            description="Summary of hiring activity every Monday"
            checked={emailNotifs.weeklyDigest}
            onChange={(v) => setEmailNotifs((s) => ({ ...s, weeklyDigest: v }))}
          />
          <NotifRow
            label="Team Updates"
            description="When team members make changes to shared resources"
            checked={emailNotifs.teamUpdates}
            onChange={(v) => setEmailNotifs((s) => ({ ...s, teamUpdates: v }))}
          />
          <NotifRow
            label="System Alerts"
            description="Important system updates and maintenance notices"
            checked={emailNotifs.systemAlerts}
            onChange={(v) => setEmailNotifs((s) => ({ ...s, systemAlerts: v }))}
          />
        </div>
      </CardComponent>

      <CardComponent padding="p-6">
        <h3 className="text-white text-sm font-semibold mb-1">
          Push Notifications
        </h3>
        <p className="text-dark-gray text-xs mb-2">
          Real-time alerts on your devices
        </p>
        <div className="divide-y divide-white/5">
          <NotifRow
            label="New Candidates"
            description="Instant alerts for new candidate applications"
            checked={pushNotifs.newCandidate}
            onChange={(v) => setPushNotifs((s) => ({ ...s, newCandidate: v }))}
          />
          <NotifRow
            label="Interview Reminders"
            description="15 minutes before scheduled interviews"
            checked={pushNotifs.interviewReminder}
            onChange={(v) =>
              setPushNotifs((s) => ({ ...s, interviewReminder: v }))
            }
          />
          <NotifRow
            label="Status Changes"
            description="When candidate status is updated"
            checked={pushNotifs.statusChanges}
            onChange={(v) => setPushNotifs((s) => ({ ...s, statusChanges: v }))}
          />
          <NotifRow
            label="Mentions"
            description="When someone mentions you in comments"
            checked={pushNotifs.mentions}
            onChange={(v) => setPushNotifs((s) => ({ ...s, mentions: v }))}
          />
          <NotifRow
            label="Queue Updates"
            description="Changes to the interview queue status"
            checked={pushNotifs.queueUpdates}
            onChange={(v) => setPushNotifs((s) => ({ ...s, queueUpdates: v }))}
          />
        </div>
      </CardComponent>
    </div>
  );
};

const SecuritySection = () => {
  const [twoFA, setTwoFA] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-lg font-semibold mb-1">Security</h2>
        <p className="text-dark-gray text-sm">
          Manage your password, two-factor authentication, and sessions
        </p>
      </div>

      <CardComponent padding="p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-gradient-green flex items-center justify-center text-white">
            <LuKey size={18} />
          </div>
          <div>
            <h3 className="text-white text-sm font-semibold">
              Change Password
            </h3>
            <p className="text-dark-gray text-xs">Last changed 30 days ago</p>
          </div>
        </div>
        <div className="space-y-4 mb-6">
          <InputComponent
            label="Current Password"
            type="password"
            placeholder="Enter current password"
            containerClassName="text-white max-w-md"
          />
          <InputComponent
            label="New Password"
            type="password"
            placeholder="Enter new password"
            containerClassName="text-white max-w-md"
          />
          <InputComponent
            label="Confirm New Password"
            type="password"
            placeholder="Confirm new password"
            containerClassName="text-white max-w-md"
          />
        </div>
        <ButtonComponent>Update Password</ButtonComponent>
      </CardComponent>

      <CardComponent padding="p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-green flex items-center justify-center text-white">
              <LuFingerprint size={18} />
            </div>
            <div>
              <h3 className="text-white text-sm font-semibold">
                Two-Factor Authentication
              </h3>
              <p className="text-dark-gray text-xs">
                Add an extra layer of security to your account
              </p>
            </div>
          </div>
          <Switch checked={twoFA} onChange={setTwoFA} />
        </div>
        {twoFA && (
          <div className="ml-12 p-4 rounded-lg bg-white/3 border border-white/5">
            <p className="text-white text-sm font-medium mb-2">
              Setup Instructions
            </p>
            <ol className="text-dark-gray text-xs space-y-2 list-decimal list-inside">
              <li>
                Download an authenticator app (Google Authenticator, Authy)
              </li>
              <li>Scan the QR code or enter the secret key manually</li>
              <li>Enter the 6-digit verification code to confirm</li>
            </ol>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-28 h-28 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-dark-gray text-xs">
                QR Code
              </div>
              <div>
                <p className="text-dark-gray text-xs mb-1">Secret Key</p>
                <code className="text-white text-xs bg-white/5 px-2 py-1 rounded font-mono">
                  JBSWY3DPEHPK3PXP
                </code>
                <InputComponent
                  placeholder="Enter 6-digit code"
                  containerClassName="text-white mt-3 max-w-[200px]"
                />
                <ButtonComponent className="mt-3" size="small">
                  Verify & Enable
                </ButtonComponent>
              </div>
            </div>
          </div>
        )}
      </CardComponent>

      <CardComponent padding="p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-green flex items-center justify-center text-white">
              <LuSmartphone size={18} />
            </div>
            <div>
              <h3 className="text-white text-sm font-semibold">
                Active Sessions
              </h3>
              <p className="text-dark-gray text-xs">
                Devices currently signed into your account
              </p>
            </div>
          </div>
          <button className="text-error text-xs font-medium hover:underline flex items-center gap-1">
            <LuLogOut size={12} />
            Sign out all
          </button>
        </div>
        <div className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.device}
              className="flex items-center justify-between p-3 rounded-lg bg-white/3 border border-white/5"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-dark-gray">
                  {session.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-white text-sm font-medium">
                      {session.device}
                    </p>
                    {session.current && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-primary-green/15 text-primary-green">
                        This device
                      </span>
                    )}
                  </div>
                  <p className="text-dark-gray text-xs">
                    {session.browser} · {session.location}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-dark-gray text-xs">{session.lastActive}</p>
                {!session.current && (
                  <button className="text-error text-[11px] font-medium hover:underline mt-0.5">
                    Revoke
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardComponent>
    </div>
  );
};

const IntegrationsSection = () => {
  const [connected, setConnected] = useState<Record<string, boolean>>(
    Object.fromEntries(integrations.map((i) => [i.name, i.connected])),
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-lg font-semibold mb-1">Integrations</h2>
        <p className="text-dark-gray text-sm">
          Connect third-party apps to enhance your workflow
        </p>
      </div>

      <div className="space-y-4">
        {integrations.map((integration) => (
          <CardComponent key={integration.name} padding="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  {integration.icon}
                </div>
                <div>
                  <h3 className="text-white text-sm font-semibold">
                    {integration.name}
                  </h3>
                  <p className="text-dark-gray text-xs mt-0.5">
                    {integration.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {connected[integration.name] && (
                  <button className="text-dark-gray text-xs hover:text-white transition-colors flex items-center gap-1">
                    <LuExternalLink size={12} />
                    Configure
                  </button>
                )}
                <ButtonComponent
                  size="small"
                  type={connected[integration.name] ? "default" : "primary"}
                  danger={connected[integration.name]}
                  onClick={() =>
                    setConnected((s) => ({
                      ...s,
                      [integration.name]: !s[integration.name],
                    }))
                  }
                >
                  {connected[integration.name] ? "Disconnect" : "Connect"}
                </ButtonComponent>
              </div>
            </div>
            {connected[integration.name] && (
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-completed" />
                <span className="text-completed text-xs font-medium">
                  Connected
                </span>
                <span className="text-dark-gray text-xs ml-2">
                  Last synced 5 minutes ago
                </span>
              </div>
            )}
          </CardComponent>
        ))}
      </div>
    </div>
  );
};

const SECTIONS: Record<SectionKey, () => ReactNode> = {
  profile: ProfileSection,
  notifications: NotificationsSection,
  security: SecuritySection,
  integrations: IntegrationsSection,
};

const Settings = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>("profile");

  const ActiveComponent = SECTIONS[activeSection];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Settings</h1>
        <p className="text-dark-gray text-sm">
          Manage your account and preferences
        </p>
      </div>

      <div className="grid grid-cols-12 gap-5 items-start">
        <CardComponent padding="p-3" className="col-span-3 sticky top-6">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                  activeSection === item.key
                    ? "bg-gradient-green text-white"
                    : "text-dark-gray hover:bg-white/5 hover:text-white"
                }`}
              >
                <span
                  className={`shrink-0 ${activeSection === item.key ? "text-white" : ""}`}
                >
                  {item.icon}
                </span>
                <div className="min-w-0">
                  <p
                    className={`text-sm font-medium ${activeSection === item.key ? "text-white" : ""}`}
                  >
                    {item.label}
                  </p>
                  <p
                    className={`text-[11px] truncate ${activeSection === item.key ? "text-white/70" : "text-dark-gray"}`}
                  >
                    {item.description}
                  </p>
                </div>
              </button>
            ))}
          </nav>
        </CardComponent>

        <div className="col-span-9">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
};

export default Settings;
