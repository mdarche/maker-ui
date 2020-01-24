export default {
  eui_header: {
    base: {
      position: "relative",
      m: "0 auto",
      alignItems: "center",
      flexWrap: "wrap",
    },
    basic: {
      variant: "eui_header.base",
      justifyContent: "space-between",
    },
    split: {
      variant: "eui_header.base",
      justifyContent: ["space-between", "center"],
    },
    center: {
      variant: "eui_header.base",
      flexDirection: ["row", "column"],
      justifyContent: ["space-between", "center"],
    },
    reverse: {
      variant: "eui_header.base",
      justifyContent: "space-between",
    },
    "basic-center": {
      variant: "eui_header.base",
      justifyContent: "space-between",
    },
  },
}
