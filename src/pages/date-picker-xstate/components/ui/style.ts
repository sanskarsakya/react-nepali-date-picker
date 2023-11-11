// export const primary = "#0875e1";
// export const today = "#38A169";
// export const secondary = "#fff";
// export const textColor = "#1D2138";
// export const text_disabled = "#D5D7DB";

export const primary = "#0875e1";
export const today = "#38A169";
export const secondary = "#fff";
export const textColor = "#1D2138";
export const text_disabled = "#D5D7DB";

const base_styles = {
  date_picker_body: {
    table: {},
    header: {},
    weekday_panel: {
      bg: "#fff",
      color: "#535562",
    },
    weekday: {
      p: 2,
    },
    body: {},
    day_panel: {},
    day_base: {
      // px:0,
      cursor: "pointer",
      _hover: {
        bg: primary,
        color: secondary,
      },
      transition: "all 0.2s",
    },
    day_selected: {
      bg: primary,
      color: secondary,
    },
    day_current: {
      opacity: 1,
      color: "gray.100",
    },
    day_today_indicator: {
      position: "relative",
      _after: {
        bg: primary,
        content: '""',
        height: "5px",
        width: "5px",
        position: "absolute",
        borderRadius: "100%",
        left: "48%",
        bottom: "2%",
        transform: "translate(-50%, -50%)",
        zIndex: "-1",
      },
    },
    day_today_selected: {
      bg: primary,
      color: secondary,
      position: "relative",
      borderRadius: "5px",
    },
    day_disabled: {
      opacity: 0.5,
    },
    cell: {
      gap: "3px",
    },
    primary_label: {
      fontSize: "14px",
    },
    secondary_label: {
      pt: "1px",
      fontSize: "11px",
    },
  },
  month_year_panel: {
    p: "6px",
    textAlign: "center",
    my: "5px",
    w: "full",
  },
  header: {
    bg: "black",
    color: "white",
  },
  calendar: {
    bg: "black",
    borderRadius: "md",
    boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.1)",
    boxSizing: "border-box",
    color: textColor,
    display: "block",
    fontFamily: "NotoSans, sans-serif",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "normal",
    height: "auto",
    letterSpacing: "0.2px",
    lineHeight: "1.25em",
    position: "absolute",
    textAlign: "right",
    userSelect: "none",
    left: "0",
    zIndex: "9999",
  },
  selected: {},

  disabled: {
    color: "gray.500",
    pointerEvents: "none",
  },
  today: {
    _hover: {
      bg: "white",
    },
    w: "full",
    p: 3,
    mt: 1,
    bg: "white",
    fontSize: "14px",
    borderRadius: "none",
    fontWeight: "400",
    textAlign: "center",
    cursor: "pointer",
    color: "#0875e1",
    borderTop: "1px solid #E5E6EB",
  },
  calendar_controller: {
    year_button: {
      size: "xs",
      px: 3,
      _hover: { bg: "gray.100" },
    },
    month_button: {
      size: "xs",
      px: 3,
      _hover: { bg: "gray.100" },
    },
    month_label: {},
    year_label: {},
  },
};

export const get_styles_base = (is_dark?: boolean) => {
  return {
    date_picker_body: is_dark ? base_styles.date_picker_body : base_styles.date_picker_body,
    month_year_panel: is_dark ? { ...base_styles.month_year_panel, bg: "gray.800", color: "gray.100" } : { ...base_styles.month_year_panel, bg: "#EEEFF1", color: "#2C2D2C" },
    header: is_dark ? base_styles.header : base_styles.header,
    calendar: is_dark ? base_styles.calendar : base_styles.calendar,
    selected: is_dark ? base_styles.selected : base_styles.selected,
    // current: is_dark ? base_styles.current : base_styles.current,
    disabled: is_dark ? base_styles.disabled : base_styles.disabled,
    calendar_controller: is_dark ? { ...base_styles.calendar_controller, bg: "gray.800", color: "gray.100" } : { ...base_styles.month_year_panel, bg: "#EEEFF1", color: "#2C2D2C" },

    today: is_dark ? base_styles.today : base_styles.today,
  };
};
