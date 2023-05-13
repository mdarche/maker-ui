import { Section } from 'maker-ui'
import {
  FilterGroup,
  FilterSearch,
  LayoutButtons,
  SmartGrid,
  SmartGridProvider,
  SortButton,
} from 'maker-ui/data'
import { renderGrid, renderRow, smartFilters, users } from './seed'

export default function SmartGridPage() {
  return (
    <Section>
      <SmartGridProvider
        data={users}
        filters={smartFilters}
        searchSettings={{ keys: ['name', 'age'] }}>
        <FilterSearch />
        <div className="flex align-center justify-between">
          <FilterGroup
            options={[
              {
                name: 'gender',
                label: 'Male',
                value: 'male',
              },
              { name: 'gender', label: 'Female', value: 'female' },
            ]}
          />
          <LayoutButtons />
          <SortButton />
        </div>
        <SmartGrid renderRow={renderRow} renderGrid={renderGrid} />
      </SmartGridProvider>
    </Section>
  )
}
