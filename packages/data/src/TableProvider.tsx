// import * as React from 'react'

// const TableContext = React.createContext()
// const TableUpdateContext = React.createContext()

// function reducer(state, action) {
//   switch (action.type) {
//   }
// }

// const TableProvider = ({ children }) => {
//   const [state, dispatch] = React.useReducer(reducer, {
//     columns: [],
//     data: [],
//     filteredData: [],
//     pagination: {
//       pageSize: -1,
//       pageCount: 20,
//       currentPage: 1,
//     },
//     search: false,
//     searchFilter: 'default',
//     searchIcon: 'default',
//     selectableRows: false,
//     sort: true,
//     sortIcon: 'default',
//     style: {
//       rowStripe: false,
//       rowHover: false,
//       border: true,
//     },
//   })

//   return (
//     <TableUpdateContext.Provider value={dispatch}>
//       <TableContext.Provider value={state}>{children}</TableContext.Provider>
//     </TableUpdateContext.Provider>
//   )
// }

// export default TableProvider
