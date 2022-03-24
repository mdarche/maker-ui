import { SVG, SVGProps } from 'maker-ui'

export const Logo = (props: SVGProps) => {
  return (
    <SVG
      viewBox="0 0 353 54"
      css={{ height: 24, marginTop: 2, marginRight: 135 }}
      {...props}>
      <path
        d="M117 4.665V47h4.796V14.835h.413L135.439 47h4.63l13.23-32.165h.413V47h4.796V4.665h-6.119l-14.387 35.141h-.496L123.119 4.665H117zM177.469 47.744c5.54 0 8.434-2.976 9.426-5.044h.248V47h4.879V26.08c0-10.087-7.69-11.245-11.742-11.245-4.795 0-10.253 1.654-12.733 7.442l4.63 1.654c1.075-2.315 3.618-4.796 8.269-4.796 4.485 0 6.697 2.377 6.697 6.45v.165c0 2.356-2.398 2.15-8.186 2.894-5.891.765-12.32 2.067-12.32 9.343 0 6.202 4.796 9.757 10.832 9.757zm.744-4.382c-3.886 0-6.697-1.736-6.697-5.127 0-3.72 3.39-4.878 7.193-5.374 2.067-.248 7.607-.827 8.434-1.82v4.466c0 3.969-3.142 7.855-8.93 7.855zM200.926 47h4.878V35.114l3.411-3.163 11.886 15.05h6.202l-14.408-18.192 13.415-13.56h-6.036l-13.891 14.139h-.579V4.665h-4.878V47zM244.594 47.662c6.45 0 11.163-3.225 12.651-8.02l-4.713-1.324c-1.24 3.308-4.114 4.961-7.938 4.961-5.726 0-9.674-3.7-9.901-10.5h23.048V30.71c0-11.824-7.028-15.876-13.643-15.876-8.599 0-14.304 6.78-14.304 16.537 0 9.757 5.622 16.29 14.8 16.29zm-9.901-19.1c.33-4.941 3.824-9.344 9.405-9.344 5.292 0 8.682 3.969 8.682 9.343h-18.087zM265.162 47h4.879V26.907c0-4.3 3.39-7.441 8.02-7.441 1.303 0 2.646.248 2.977.33v-4.96a46.838 46.838 0 00-2.563-.083c-3.804 0-7.111 2.15-8.269 5.292h-.331v-4.796h-4.713V47zM331.636 4.665v27.617c0 6.202-4.258 10.667-11.328 10.667-7.069 0-11.327-4.465-11.327-10.667V4.665h-5.127v28.03c0 8.682 6.491 15.05 16.454 15.05 9.964 0 16.455-6.367 16.455-15.05V4.666h-5.127zM352.127 4.665H347V47h5.127V4.665z"
        fill="#000"
      />
      <path fill="#3B67BC" d="M0 0h74v12H0z" />
      <path fill="#C7DAFF" d="M0 18h21v36H0z" />
      <path fill="#729BED" d="M27 18h47v36H27z" />
    </SVG>
  )
}