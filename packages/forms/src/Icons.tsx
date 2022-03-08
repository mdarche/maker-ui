import { SVG, SVGProps } from 'maker-ui'

export const ValidateIcon = (props: SVGProps) => (
  <SVG viewBox="0 0 512 512" css={{ height: 20, fill: '#3aca3a' }} {...props}>
    <path d="M256 0C115.39 0 0 115.39 0 256s115.39 256 256 256 256-115.39 256-256S396.61 0 256 0zm-30.981 372.44L112.914 260.336l42.422-42.422 71.646 71.646 143.833-130.752 40.371 44.385L225.019 372.44z" />
  </SVG>
)

export const TrashIcon = (props: SVGProps) => (
  <SVG viewBox="0 0 11 13" {...props}>
    <path d="M10.214 11.781c0 .323-.124.633-.345.862a1.16 1.16 0 01-.833.357H1.964a1.16 1.16 0 01-.833-.357 1.24 1.24 0 01-.345-.862V3.25h9.428v8.531zm-6.678-6.5a.413.413 0 00-.115-.287.386.386 0 00-.556 0 .413.413 0 00-.115.287v5.688c0 .107.041.21.115.287a.386.386 0 00.556 0 .413.413 0 00.115-.287V5.28zm2.357 0a.413.413 0 00-.115-.287.386.386 0 00-.556 0 .413.413 0 00-.115.287v5.688c0 .107.042.21.115.287a.386.386 0 00.556 0 .413.413 0 00.115-.287V5.28zm2.357 0a.413.413 0 00-.115-.287.386.386 0 00-.556 0 .413.413 0 00-.115.287v5.688c0 .107.042.21.115.287a.386.386 0 00.556 0 .413.413 0 00.115-.287V5.28zM.393.812h2.946L3.57.338A.602.602 0 013.788.09c.093-.06.2-.091.31-.091h2.806c.11 0 .217.03.31.09s.168.146.216.248l.23.474h2.947c.104 0 .204.043.278.12.074.076.115.179.115.287v.812a.413.413 0 01-.115.287.386.386 0 01-.278.12H.393a.386.386 0 01-.278-.12A.413.413 0 010 2.031V1.22C0 1.11.041 1.007.115.93A.386.386 0 01.393.812z" />
  </SVG>
)

export const PlusIcon = (props: SVGProps) => (
  <SVG viewBox="0 0 17 16" {...props}>
    <path
      d="M9 8H1m8 8V8v8zm0-8V0v8zm0 0h8-8z"
      stroke="#9CCD32"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </SVG>
)
