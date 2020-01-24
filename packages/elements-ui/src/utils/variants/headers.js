export default {
  eui_header: {
    base: {
      position: "relative",
      m: "0 auto",
      alignItems: "center",
      flexWrap: "wrap",
    },
    default: {
      variant: "eui_header.base",
      justifyContent: "space-between",
    },
    center: {
      variant: "eui_header.base",
      justifyContent: ["space-between", "center"],
    },
    columns: {
      variant: "eui_header.base",
      ".col-1": {
        alignItems: "center",
        width: ["25%", "33%"],
      },
      ".col-2": {
        width: ["50%", "34%"],
        justifyContent: "center",
        alignItems: "center",
      },
      ".col-3": {
        width: ["25%", "33%"],
        alignItems: "center",
        justifyContent: "flex-end",
      },
    },
  },
}
