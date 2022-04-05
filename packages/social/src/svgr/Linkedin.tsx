import * as React from 'react'
import { SVGProps } from 'react'

const SvgLinkedin = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon-linkedin"
    viewBox="0 0 37 37"
    {...props}>
    <path d="M35.39.14H1.61C.796.14.14.798.14 1.61v33.78c0 .813.657 1.47 1.47 1.47h33.78c.813 0 1.47-.657 1.47-1.47V1.61c0-.813-.657-1.47-1.47-1.47ZM11.033 31.43H5.584V13.906h5.448V31.43ZM8.311 11.51a3.158 3.158 0 1 1 0-6.316 3.158 3.158 0 0 1 0 6.316ZM31.43 31.43h-5.444v-8.524c0-2.033-.037-4.645-2.832-4.645-2.832 0-3.268 2.213-3.268 4.498v8.67h-5.439V13.907h5.223v2.396h.074c.725-1.377 2.501-2.832 5.154-2.832 5.517 0 6.532 3.63 6.532 8.348v9.612Z" />
  </svg>
)

export default SvgLinkedin
