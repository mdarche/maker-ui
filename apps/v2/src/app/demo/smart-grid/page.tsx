'use client'
import { Section } from 'maker-ui/layout'
import { SmartGrid, SmartGridProvider } from 'maker-ui/data'
import { renderGrid, renderRow, smartFilters, users } from './seed'

export default function SmartGridPage() {
  return (
    <Section>
      <SmartGrid.Provider
        data={users}
        filters={smartFilters}
        searchSettings={{ keys: ['name', 'age'] }}>
        <SmartGrid.Search />
        <SmartGrid.ActiveFilters />
        <div className="flex align-center justify-between">
          <SmartGrid.FilterGroup
            options={[
              {
                name: 'gender',
                label: 'Male',
                value: 'male',
              },
              { name: 'gender', label: 'Female', value: 'female' },
            ]}
          />
          {/* <SmartGrid.LayoutButtons /> */}
          <SmartGrid.SortButton />
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            gap: 30,
          }}>
          <SmartGrid.AccordionMenu
            filters={[
              {
                filter: 'gender',
                label: 'Gender',
                options: [
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' },
                ],
              },
              {
                label: 'Age Group',
                options: [
                  { label: '20s', value: 'age-20s' },
                  { label: '30s', value: 'age-30s' },
                  { label: '40s', value: 'age-40s' },
                ],
              },
            ]}
          />
          <SmartGrid renderRow={renderRow} renderGrid={renderGrid} />
        </div>
      </SmartGrid.Provider>
    </Section>
  )
}
