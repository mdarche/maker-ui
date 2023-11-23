import * as React from 'react'
import { SVGProps } from 'react'

export const SettingsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon-settings"
    viewBox="0 0 20 22"
    {...props}>
    <path d="m10 0 9.5 5.5v11L10 22 .5 16.5v-11L10 0Zm0 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
  </svg>
)

export const ColumnAddIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 14 22"
    className="icon-column-add"
    {...props}>
    <path d="M2 20V2h7v2h2V1a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v20a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3H9v2H2Z" />
    <path d="M11 7H9v3H6v2h3v3h2v-3h3v-2h-3V7Z" />
  </svg>
)

export const ColumnRemoveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 14 22"
    className="icon-column-remove"
    {...props}>
    <path d="M2 20V2h7v5h2V1a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v20a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-6H9v5H2Z" />
    <path d="M6 12v-2h8v2z" />
  </svg>
)

export const DragIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path d="M12 23.414 7.586 19 9 17.586l2 2V13H4.414l2 2L5 16.414.586 12 5 7.586 6.414 9l-2 2H11V4.414l-2 2L7.586 5 12 .586 16.414 5 15 6.414l-2-2V11h6.586l-2-2L19 7.586 23.414 12 19 16.414 17.586 15l2-2H13v6.586l2-2L16.414 19 12 23.414Z" />
  </svg>
)

export const CaretIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 3" {...props}>
    <path d="M4 3L.536 0h6.928L4 3z" />
  </svg>
)

export const TrashIcon = (props: React.HTMLAttributes<SVGElement>) => (
  <svg viewBox="0 0 11 13" className="icon-trash" {...props}>
    <path d="M10.214 11.781c0 .323-.124.633-.345.862a1.16 1.16 0 01-.833.357H1.964a1.16 1.16 0 01-.833-.357 1.24 1.24 0 01-.345-.862V3.25h9.428v8.531zm-6.678-6.5a.413.413 0 00-.115-.287.386.386 0 00-.556 0 .413.413 0 00-.115.287v5.688c0 .107.041.21.115.287a.386.386 0 00.556 0 .413.413 0 00.115-.287V5.28zm2.357 0a.413.413 0 00-.115-.287.386.386 0 00-.556 0 .413.413 0 00-.115.287v5.688c0 .107.042.21.115.287a.386.386 0 00.556 0 .413.413 0 00.115-.287V5.28zm2.357 0a.413.413 0 00-.115-.287.386.386 0 00-.556 0 .413.413 0 00-.115.287v5.688c0 .107.042.21.115.287a.386.386 0 00.556 0 .413.413 0 00.115-.287V5.28zM.393.812h2.946L3.57.338A.602.602 0 013.788.09c.093-.06.2-.091.31-.091h2.806c.11 0 .217.03.31.09s.168.146.216.248l.23.474h2.947c.104 0 .204.043.278.12.074.076.115.179.115.287v.812a.413.413 0 01-.115.287.386.386 0 01-.278.12H.393a.386.386 0 01-.278-.12A.413.413 0 010 2.031V1.22C0 1.11.041 1.007.115.93A.386.386 0 01.393.812z" />
  </svg>
)

export const CollapseIcon = (props: React.HTMLAttributes<SVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon-collapse"
    viewBox="0 0 17 20"
    {...props}>
    <path d="m0 1.913 8.113 7.031 8.114-7.031L14.569 0 8.113 5.595 1.658 0 0 1.913Zm0 15.555 8.113-7.032 8.114 7.032-1.658 1.913-6.456-5.595-6.455 5.595L0 17.468Z" />
  </svg>
)

export const ExpandIcon = (props: React.HTMLAttributes<SVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon-expand"
    viewBox="0 0 16 19"
    {...props}>
    <path d="m8 0 8 6.893-1.635 1.876L8 3.284 1.635 8.769 0 6.893 8 0ZM1.635 10.231 8 15.716l6.365-5.485L16 12.107 8 19l-8-6.893 1.635-1.876Z" />
  </svg>
)

export const RevealIcon = (props: React.HTMLAttributes<SVGElement>) => (
  <svg viewBox="0 0 22 16" className="icon-reveal" {...props}>
    <path d="M20.92 7.6C18.9 2.91 15.1 0 11 0S3.1 2.91 1.08 7.6a1 1 0 000 .8C3.1 13.09 6.9 16 11 16s7.9-2.91 9.92-7.6a1.001 1.001 0 000-.8zM11 14c-3.17 0-6.17-2.29-7.9-6C4.83 4.29 7.83 2 11 2s6.17 2.29 7.9 6c-1.73 3.71-4.73 6-7.9 6zm0-10a4 4 0 100 8 4 4 0 000-8zm0 6a2 2 0 110-4 2 2 0 010 4z" />
  </svg>
)

export const HideIcon = (props: React.HTMLAttributes<SVGElement>) => (
  <svg viewBox="0 0 22 22" className="icon-hide" {...props}>
    <path d="M9.94 5.08A6.93 6.93 0 0111 5c3.18 0 6.17 2.29 7.91 6a15.23 15.23 0 01-.9 1.64 1 1 0 00.05 1.152 1 1 0 001.65-.102 15.77 15.77 0 001.21-2.3 1 1 0 000-.79C18.9 5.91 15.1 3 11 3a7.771 7.771 0 00-1.4.12 1.014 1.014 0 00.34 2v-.04zM2.71 1.29a1.004 1.004 0 10-1.42 1.42l3.1 3.09a14.62 14.62 0 00-3.31 4.8 1 1 0 000 .8C3.1 16.09 6.9 19 11 19a9.26 9.26 0 005.05-1.54l3.24 3.25a.997.997 0 001.095.219.999.999 0 00.325-.22 1 1 0 000-1.42l-18-18zm6.36 9.19l2.45 2.45a2 2 0 01-2.45-2.45zM11 17c-3.18 0-6.17-2.29-7.9-6a12.09 12.09 0 012.7-3.79L7.57 9A4 4 0 0013 14.43L14.59 16A7.24 7.24 0 0111 17z" />
  </svg>
)
