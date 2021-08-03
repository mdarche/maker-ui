import * as React from 'react'
import { SVG, SVGProps } from 'maker-ui'

export const ValidateIcon = (props: SVGProps) => (
  <SVG viewBox="0 0 512 512" css={{ height: 20, fill: '#3aca3a' }} {...props}>
    <path d="M256 0C115.39 0 0 115.39 0 256s115.39 256 256 256 256-115.39 256-256S396.61 0 256 0zm-30.981 372.44L112.914 260.336l42.422-42.422 71.646 71.646 143.833-130.752 40.371 44.385L225.019 372.44z" />
  </SVG>
)
