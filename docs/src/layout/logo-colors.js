const light = ["#34a1c0", "#c03456", "#4e34c0", "#1d65e1", "#e3be18", "#79c034"]
const dark = ["#afa7fe", "#3bcec5", "#ffa6c8", "#ff8787", "#a1e554"]

const randomColor = type => {
  const colors = type === "light" ? light : dark
  return { fill: colors[Math.floor(Math.random() * colors.length)] }
}

export const colorOptions = {
  light: {
    ".logo-blue": randomColor("light"),
    ".logo-red": randomColor("light"),
    ".logo-green": randomColor("light"),
    ".logo-yellow": randomColor("light"),
    ".logo-text": { fill: "#000" },
  },
  dark: {
    ".logo-blue": randomColor("dark"),
    ".logo-red": randomColor("dark"),
    ".logo-green": randomColor("dark"),
    ".logo-yellow": randomColor("dark"),
    ".logo-text": { fill: "#fff" },
  },
}
