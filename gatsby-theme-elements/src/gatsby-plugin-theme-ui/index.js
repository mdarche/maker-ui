import merge from "deepmerge"
import baseTheme from "../config/baseTheme"
import extend from "../theme"

export default merge(baseTheme, extend)
