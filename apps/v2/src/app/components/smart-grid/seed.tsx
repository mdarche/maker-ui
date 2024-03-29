import type { FilterConfig, ColumnConfig, FetchDataParams } from 'maker-ui/data'

export interface ExampleUser {
  id: number
  name: string
  email: string
  age: number
  gender: string
  favoriteColors: string[]
}

// Sample data
export const users: ExampleUser[] = [
  {
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
    age: 28,
    gender: 'female',
    favoriteColors: ['red', 'blue'],
  },
  {
    id: 2,
    name: 'Bob',
    email: 'bob@example.com',
    age: 35,
    gender: 'male',
    favoriteColors: ['blue'],
  },
  {
    id: 3,
    name: 'Carol',
    email: 'carol@example.com',
    age: 42,
    gender: 'female',
    favoriteColors: ['green'],
  },
  {
    id: 4,
    name: 'David',
    email: 'david@example.com',
    age: 23,
    gender: 'male',
    favoriteColors: ['red'],
  },
  {
    id: 5,
    name: 'Eva',
    email: 'eva@example.com',
    age: 30,
    gender: 'female',
    favoriteColors: ['green', 'blue'],
  },
  {
    id: 6,
    name: 'Frank',
    email: 'frank@example.com',
    age: 33,
    gender: 'male',
    favoriteColors: ['green'],
  },
  {
    id: 7,
    name: 'Grace',
    email: 'grace@example.com',
    age: 27,
    gender: 'female',
    favoriteColors: ['purple'],
  },
  {
    id: 8,
    name: 'Helen',
    email: 'helen@example.com',
    age: 45,
    gender: 'female',
    favoriteColors: ['blue'],
  },
  {
    id: 9,
    name: 'Ivan',
    email: 'ivan@example.com',
    age: 31,
    gender: 'male',
    favoriteColors: ['pink'],
  },
  {
    id: 10,
    name: 'Jane',
    email: 'jane@example.com',
    age: 29,
    gender: 'female',
    favoriteColors: ['green'],
  },
  {
    id: 11,
    name: 'Kyle',
    email: 'kyle@example.com',
    age: 39,
    gender: 'male',
    favoriteColors: ['red', 'blue'],
  },
  {
    id: 12,
    name: 'Laura',
    email: 'laura@example.com',
    age: 36,
    gender: 'female',
    favoriteColors: ['purple', 'green'],
  },
  {
    id: 13,
    name: 'Mike',
    email: 'mike@example.com',
    age: 25,
    gender: 'male',
    favoriteColors: ['green', 'blue'],
  },
  {
    id: 14,
    name: 'Nina',
    email: 'nina@example.com',
    age: 41,
    gender: 'female',
    favoriteColors: ['green'],
  },
  {
    id: 15,
    name: 'Oliver',
    email: 'oliver@example.com',
    age: 32,
    gender: 'male',
    favoriteColors: ['green'],
  },
  {
    id: 16,
    name: 'Patricia',
    email: 'patricia@example.com',
    age: 37,
    gender: 'female',
    favoriteColors: ['pink'],
  },
  {
    id: 17,
    name: 'Quincy',
    email: 'quincy@example.com',
    age: 43,
    gender: 'male',
    favoriteColors: ['yellow'],
  },
  {
    id: 18,
    name: 'Rita',
    email: 'rita@example.com',
    age: 24,
    gender: 'female',
    favoriteColors: ['red'],
  },
  {
    id: 19,
    name: 'Steve',
    email: 'steve@example.com',
    age: 38,
    gender: 'male',
    favoriteColors: ['blue'],
  },
]

// Column configuration
export const userColumns: ColumnConfig<(typeof users)[0]>[] = [
  {
    key: 'id',
    title: 'ID',
    dataType: 'number',
    sortable: true,
    width: '5%',
  },
  {
    key: 'name',
    title: 'Name',
    dataType: 'string',
    sortable: true,
    filterable: true,
  },
  {
    key: 'email',
    title: 'Email',
    dataType: 'string',
    sortable: true,
    filterable: true,
  },
  {
    key: 'age',
    title: 'Age',
    dataType: 'number',
    sortable: true,
  },
  {
    //@ts-ignore
    key: 'action',
    title: 'Action',
    dataType: 'custom',
    render: (item) => (
      <button
        onClick={(e) => {
          e.stopPropagation()
          console.log(item.email)
        }}>
        Log {item.name}
      </button>
    ),
  },
  {
    //@ts-ignore
    key: 'delete',
    title: 'Remove',
    dataType: 'delete',
  },
]

export const simulateFetchData = (
  params: FetchDataParams<ExampleUser>
): Promise<ExampleUser[]> => {
  const {
    page,
    itemsPerPage,
    sortColumn,
    sortDirection,
    searchQuery,
    searchColumns,
  } = params

  return new Promise((resolve) => {
    // Introduce a delay to simulate a network request
    setTimeout(() => {
      let filteredData = users

      if (searchQuery && searchColumns) {
        filteredData = users.filter((item) =>
          searchColumns.some((column) =>
            String(item[column])
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          )
        )
      }

      if (sortColumn && sortDirection) {
        const sortedData = [...filteredData].sort((a, b) => {
          const aValue = a[sortColumn]
          const bValue = b[sortColumn]

          if (aValue < bValue) {
            return sortDirection === 'asc' ? -1 : 1
          }
          if (aValue > bValue) {
            return sortDirection === 'asc' ? 1 : -1
          }
          return 0
        })

        filteredData = sortedData
      }

      const startIdx = (page - 1) * itemsPerPage
      const endIdx = startIdx + itemsPerPage
      const paginatedData = filteredData.slice(startIdx, endIdx)

      resolve(paginatedData)
    }, 1000) // Adjust the delay as needed (in milliseconds)
  })
}

export const smartFilters: FilterConfig<ExampleUser>[] = [
  {
    name: 'name-asc',
    type: 'sort',
    key: 'name',
    direction: 'asc',
    label: 'Name A-Z',
  },
  {
    name: 'name-desc',
    type: 'sort',
    key: 'name',
    direction: 'desc',
    label: 'Name Z-A',
  },
  {
    name: 'age-asc',
    type: 'sort',
    key: 'age',
    direction: 'asc',
    label: 'Age (asc)',
  },
  {
    name: 'age-desc',
    type: 'sort',
    key: 'age',
    direction: 'desc',
    label: 'Age (desc)',
  },
  { name: 'gender', type: 'filter', exclusive: true },
  { name: 'colors', key: 'favoriteColors', type: 'filter' },
  {
    name: 'age-20s',
    key: 'age',
    type: 'filter',
    label: '20s',
    filterFunction: (i) => i.age <= 29 && i.age >= 20,
  },
  {
    name: 'age-30s',
    key: 'age',
    type: 'filter',
    label: '30s',
    filterFunction: (i) => i.age <= 39 && i.age >= 30,
  },
  {
    name: 'age-40s',
    key: 'age',
    type: 'filter',
    label: '40s',
    filterFunction: (i) => i.age <= 49 && i.age >= 40,
  },
]

export const renderRow = ({ name, age, email }: ExampleUser) => {
  return (
    <div className="flex align-center justify-between">
      <div>
        <div>{name}</div>
        <div>{age}</div>
      </div>
      <div>{email}</div>
    </div>
  )
}

export const renderGrid = ({
  name,
  age,
  email,
  favoriteColors,
}: ExampleUser) => {
  return (
    <div style={{ border: '1px solid var(--color-gray-300)', padding: 10 }}>
      <div className="flex align-center justify-between">
        <strong>{name}</strong>
        <div>{age}</div>
      </div>
      <div style={{ marginTop: 20 }}>{email}</div>
      <div>{favoriteColors.join(', ')}</div>
    </div>
  )
}
