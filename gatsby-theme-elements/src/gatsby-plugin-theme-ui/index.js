import merge from "deepmerge"
import baseTheme from "../config/base"
import extend from "../theme"

export default merge(baseTheme, extend)
