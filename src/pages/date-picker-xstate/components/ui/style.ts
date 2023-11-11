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
    table: {
    },
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
    base: {
      position: "relative",
      _before: {
        bg: today,
        borderRadius: "50%",
        bottom: "3px",
        content: '""',
        height: "5px",
        left: "50%",
        margin: "auto",
        position: "absolute",
        transform: "translateX(-50%)",
        width: "5px",
      },
    },
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

export const get_styles = (is_dark: boolean) => {
  if (is_dark) {
    return {
      month_year_panel: {
        p: 3,
        bg: "black",
        color: "gray.100",
        borderRadius: "5px",
        textAlign: "center",
        // my: '5px'
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
        // padding: "15px",
        position: "absolute",
        textAlign: "right",
        userSelect: "none",
        left: "0",
        zIndex: "9999",
      },
      selected: {
        color: secondary,
        position: "relative",
        _after: {
          bg: primary,
          // borderRadius: "50%",
          content: '""',
          height: "36px",
          left: "48%",
          position: "absolute",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "36px",
          zIndex: "-1",
        },
      },
      current: {
        opacity: 1,
        color: "gray.100",
      },
      disabled: {
        color: "gray.500",
        pointerEvents: "none",
      },
      today: {
        position: "relative",
        _before: {
          bg: today,
          borderRadius: "50%",
          bottom: "3px",
          content: '""',
          height: "5px",
          left: "50%",
          margin: "auto",
          position: "absolute",
          transform: "translateX(-50%)",
          width: "5px",
        },
      },
    };
  }

  return {
    month_year_panel: {
      p: "6px",
      bg: "#EEEFF1",
      color: "#2C2D2C",
      textAlign: "center",
      my: "5px",
    },
    header: {
      bg: "#fff",
      color: "#535562",
    },
    calendar: {
      bg: secondary,
      borderRadius: "6px",
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
      // padding: "15px",
      position: "absolute",
      textAlign: "right",
      userSelect: "none",
      left: "0",
      zIndex: "9999",
    },
    selected: {
      bg: primary,
      color: secondary,
      position: "relative",
      borderRadius: "5px",
      // _after: {
      //     bg: primary,
      //     borderRadius: "50%",
      //     content: '""',
      //     height: "36px",
      //     left: "48%",
      //     position: "absolute",
      //     top: "50%",
      //     transform: "translate(-50%, -50%)",
      //     width: "36px",
      //     zIndex: "-1",
      // }
    },
    todayselected: {
      bg: primary,
      color: secondary,
      position: "relative",
      borderRadius: "5px",
    },
    current: {
      opacity: 1,
      cursor: "pointer",
      _hover: {
        bg: "gray.100",
        borderRadius: "5px",
        color: textColor,
      },
    },
    disabled: {
      color: text_disabled,
      cursor: "",
      _hover: {},
    },
    today: {
      color: today,
      // bg: today,
      // borderRadius:'5px',
      position: "relative",
      _before: {
        bg: today,
        borderRadius: "50%",
        bottom: "3px",
        content: '""',
        height: "5px",
        left: "50%",
        margin: "auto",
        position: "absolute",
        transform: "translateX(-50%)",
        width: "5px",
        // border:'2px solid #00FF00',
        // borderRadius: "50%",
        // content: '""',
        // height: "32px",
        // left: "48%",
        // position: "absolute",
        // top: "50%",
        // transform: "translate(-50%, -50%)",
        // width: "32px",
        // zIndex: "-1",
      },
    },
  };
};
