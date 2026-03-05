import type { ThemeConfig } from "antd";

export const antdConfig: ThemeConfig = {
  token: {
    colorPrimary: "#43B17E",
    colorInfo: "#1677ff",
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    colorError: "#ff4d4f",
    colorTextBase: "#ffffff",
    colorTextSecondary: "#767676",
    colorBgBase: "#010101",
    colorBgLayout: "#010101",
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    borderRadius: 6,
    controlHeight: 42,
  },
  components: {
    Button: {
      colorPrimary: "#43B17E",
      colorPrimaryHover: "#3a9e6e",
      colorPrimaryActive: "#339962",
      primaryColor: "#ffffff",
      primaryShadow: "none",
      defaultShadow: "none",
      dangerShadow: "none",
      borderColorDisabled: "rgba(255,255,255,0.1)",
    },
    Input: {
      colorBgContainer: "rgba(255,255,255,0.05)",
      colorBorder: "rgba(255,255,255,0.1)",
      colorText: "#ffffff",
      colorTextPlaceholder: "#767676",
      activeBorderColor: "#43B17E",
      hoverBorderColor: "#43B17E",
      activeShadow: "0 0 0 2px rgba(67,177,126,0.12)",
      paddingBlock: 8,
      paddingInline: 12,
    },
    Select: {
      activeBorderColor: "#43B17E",
      hoverBorderColor: "#43B17E",
    },
    DatePicker: {
      activeBorderColor: "#43B17E",
      hoverBorderColor: "#43B17E",
    },
    Checkbox: {
      colorPrimary: "#43B17E",
      colorPrimaryHover: "#43B17E",
    },
    Switch: {
      colorPrimary: "#43B17E",
      colorPrimaryHover: "#3a9e6e",
    },
    Tag: {
      defaultBg: "#F2F2F2",
      defaultColor: "#767676",
    },
    Table: {
      colorBgContainer: "transparent",
      colorText: "#ffffff",
      colorTextHeading: "#767676",
      borderColor: "rgba(255,255,255,0.06)",
      headerBg: "transparent",
      rowHoverBg: "rgba(255,255,255,0.04)",
      headerSplitColor: "transparent",
      fontSize: 13,
      cellPaddingBlockSM: 14,
    },
    Pagination: {
      colorPrimary: "#43B17E",
      colorPrimaryHover: "#3a9e6e",
      colorText: "#767676",
      colorBgContainer: "transparent",
      colorBorder: "rgba(255,255,255,0.1)",
    },
  },
};
