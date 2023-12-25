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


export const get_base_styles = (is_dark?: boolean) => {
  return {
    panel: {
      shadow: "md",
      width: "268px",
      zIndex: 100,
      position: "absolute",
      // top: 40,
      left: 0,
      bg: is_dark ? "gray.800" : "white",
      color: is_dark ? "gray.100" : "gray.900",
    },
    date_picker_body: {
      table: {},
      header: {},
      weekday_panel: {
        bg: is_dark ? "gray.800" : "",
        color: is_dark ? "gray.100" : textColor,
      },
      weekday: {
        fontSize: "12px",
        // px: "10px",
        py: "6px",
        border:"none",
      },
      body: {},
      day_panel: {
        border:"none",
      },
      day_base: {
        px:'4px',
        py:'6px',
        border: "none",
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
          bg: today,
          content: '""',
          height: "4px",
          width: "4px",
          position: "absolute",
          borderRadius: "100%",
          left: "48%",
          bottom: "1%",
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
        gap: "4px",
      },
      primary_label: {
        fontSize: "12px",
      },
      secondary_label: {
        pt: "1px",
        fontSize: "9px",
      },
    },
    month_year_panel: {
      p: "6px",
      textAlign: "center",
      fontSize: "14px",
      my: "5px",
      w: "full",
      bg: is_dark ? "gray.800" : "#EEEFF1",
      color: is_dark ? "gray.100" : "#2C2D2C",
    },
    header: {
      p:0,
      bg: is_dark ? "gray.800" : "",
      color: is_dark ? "gray.100" : "gray.900",
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
      color: text_disabled,
      pointerEvents: "none",
    },

    today: {
      _hover: {
        bg: is_dark ? "gray.900" : "gray.100",
        color: primary,
      },
      w: "full",
      p: 3,
      mt: 1,
      fontSize: "14px",
      borderRadius: "none",
      fontWeight: "500",
      textAlign: "center",
      cursor: "pointer",
      borderTop: "1px solid",
      bg: is_dark ? "black" : "white",
      color: primary,
      borderColor: is_dark ? "white" : "gray.200",
    },

    calendar_controller: {
      panel: {
        color: is_dark ? "gray.100" : "gray.900",
      },
      year_button: {
        size: "xs",
        px: 1,
        bg: is_dark ? "gray.800" : "",
        color: is_dark ? "gray.100" : "gray.500",
        _hover: { bg: is_dark ? "gray.800" : "gray.100" },
      },
      month_button: {
        size: "xs",
        px: 1,
        bg: is_dark ? "gray.800" : "",
        color: is_dark ? "gray.100" : "gray.500",
        _hover: { bg: is_dark ? "gray.800" : "gray.100" },
      },
      month_label: {},
      year_label: {},
    },

    month_view_mode: {
      panel: {
        bg: is_dark ? "gray.800" : "",
        color: is_dark ? "gray.100" : textColor,
      },
      body:{
        flex: '0 0 calc(33.33% - 8px)',
        boxSizing: 'border-box',
        padding: '4px',
        cursor: 'pointer',
        color: is_dark ? "white" : textColor,
        _hover: { color: '#0875e1', bg: 'gray.100' }
      },
      year_button: {
        
      }
      
    },
    year_view_mode: {
      panel: {
        bg: is_dark ? "gray.800" : "",
        color: is_dark ? "gray.100" : textColor,
      },
      body:{
        flex: '0 0 calc(33.33% - 8px)',
        boxSizing: 'border-box',
        padding: '4px',
        cursor: 'pointer',
        color: is_dark ? "white" : textColor,
        _hover: { color: '#0875e1', bg: 'gray.100' }
      },
      decade_button: {
        bg: is_dark ? "gray.800" : "",
        color: is_dark ? "gray.100" : textColor,
      }
      
    }
  };
  
};
