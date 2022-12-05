export {}
// export function useLayoutStyles(layout: string): object {
//   const { measurements } = useMeasurements()
//   const { topbar, header, sideNav } = useOptions()

//   /**
//    * -------- Sidebar Styles --------
//    */
//   if (layout && layout.includes('sidebar')) {
//     /** Handle row reversal on mobile so main content always appears first */
//     const sidebarOrder = (): object | null => {
//       return layout === 'sidebar content'
//         ? {
//             '.sidebar': { gridRow: [2, 'auto'] },
//           }
//         : layout === 'sidebar content sidebar'
//         ? {
//             '.sidebar:first-of-type': {
//               gridRow: [2, 'auto'],
//             },
//           }
//         : null
//     }

//     /**
//      * Set grid column widths
//      */
//     const getSidebarColumns = (): string | null => {
//       const w1 = 'var(--width_sidebar)'
//       const w2 = 'var(--width_second_sidebar)'
//       const grid =
//         layout === 'sidebar content'
//           ? `${w1} 1fr`
//           : layout === 'sidebar content sidebar'
//           ? `${w1} 1fr ${w2}`
//           : layout === 'content sidebar'
//           ? `1fr ${w1}`
//           : null

//       return grid
//     }

//     return {
//       ...sidebarOrder(),
//       gridTemplateColumns: ['1fr', getSidebarColumns()],
//     }
//   }

//   /**
//    * -------- SideNav Styles --------
//    */
//   if (layout && layout.includes('sidenav')) {
//     /** Determine the top value for `sidenav content` and `content sidenav` layouts */
//     const calculateTop = () => {
//       let top = header.sticky ? measurements.height_header : 0
//       if (topbar.sticky) {
//         top += measurements.height_topbar
//       }
//       return top
//     }

//     /**
//      * Determine the transform direction for toggling on mobile
//      */
//     const direction =
//       layout === 'sidenav content'
//         ? 'calc(-1 * var(--width_sideNav))'
//         : 'var(--width_sideNav)'

//     /**
//      * Check for measurements to complete before adding transition style
//      *
//      * @todo Find a mobile `sidenav-content` solution for when <Header> does not exist
//      *
//      */
//     const getTransition = () => {
//       if (!sideNav.isHeader) {
//         return measurements.height_header !== 0 ? sideNav.cssTransition : null
//       }
//       return sideNav.cssTransition
//     }

//     return {
//       '#sidenav': {
//         position: ['fixed', 'relative'],
//         zIndex: [101, 0],
//         transition: getTransition(),
//         '&.hide-sidenav': {
//           transform: [`translateX(${direction})`, 'none'],
//         },
//         '&.collapse-sidenav': {
//           marginLeft:
//             layout === 'sidenav content'
//               ? [0, 'calc(-1 * var(--width_sideNav))']
//               : undefined,
//           marginRight:
//             layout === 'content sidenav'
//               ? [0, 'calc(-1 * var(--width_sideNav))']
//               : undefined,
//         },
//         '> .container': {
//           top: [0, calculateTop()],
//           height: ['100vh', `calc(100vh - ${calculateTop()}px)`],
//         },
//       },
//       '#toggle-sidenav': {
//         display: ['inline-block', 'none'],
//       },
//       '#collapse-sidenav': {
//         display: ['none', 'inline-block'],
//       },
//       '.sidenav-overlay': {
//         display: ['block', 'none'],
//       },
//     }
//   }

//   /**
//    * -------- Content Styles (default) --------
//    */
//   return {}
// }
