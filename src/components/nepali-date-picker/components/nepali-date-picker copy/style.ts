export const primary = "#0875e1";
export const today = "#38A169";
export const secondary = "#fff";
export const textColor = "#1D2138";
export const text_disabled = "#D5D7DB";
export const get_styles = (is_dark: boolean) => {
    if (is_dark) {
        return ({
            month_year_panel: {
                p: 3,
                bg: "black",
                color:"gray.100",
                borderRadius: '5px',
                textAlign: 'center',
                // my: '5px'
            },
            header: {
                bg: "black",
                color:'white',
            },
            calendar: {
                bg: "black",
                borderRadius:"md",
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
                }
            },
            current: {
                opacity: 1,
                color:"gray.100"
            },
            disabled: {
                color: "gray.500"
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
                }
            }
        });
    }

    return ({
        month_year_panel: {
            p: '6px',
            bg: "#EEEFF1",
            color:"#2C2D2C",
            textAlign: 'center',
            my: '5px'
        },
        header: {
            bg: "#fff",
            color: '#535562',
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
            cursor:'pointer',
            _hover:{
                bg: 'gray.100',
                borderRadius: "5px",
                color: textColor,
            }
        },
        disabled: {
            color: text_disabled,
            cursor:'',
            _hover:{}
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
            }
        }
    });
}