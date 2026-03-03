import type { ThemeConfig } from "antd";

export const antdConfig: ThemeConfig = {
  token: {
    colorPrimary: "#268D62",
    colorInfo: "#1677ff",
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    colorError: "#ff4d4f",
    colorTextBase: "#010101",
    colorTextSecondary: "#767676",
    colorBgBase: "#ffffff",
    colorBgLayout: "#F3F3F3",
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    borderRadius: 6,
  },
  components: {
    Button: {
      colorPrimary: "#010101",
      colorPrimaryHover: "#333333",
      colorPrimaryActive: "#000000",
      algorithm: true,
    },
    Input: {
      activeBorderColor: "#268D62",
      hoverBorderColor: "#268D62",
      activeShadow: "0 0 0 2px rgba(38, 141, 98, 0.1)",
      paddingBlock: 8,
      paddingInline: 12,
    },
    Select: {
      activeBorderColor: "#268D62",
      hoverBorderColor: "#268D62",
    },
    DatePicker: {
      activeBorderColor: "#268D62",
      hoverBorderColor: "#268D62",
    },
    Checkbox: {
      colorPrimary: "#268D62",
      colorPrimaryHover: "#268D62",
    },
    Switch: {
      colorPrimary: "#268D62",
      colorPrimaryHover: "#1e7550",
    },
    Tag: {
      defaultBg: "#F2F2F2",
      defaultColor: "#767676",
    },
  },
};
