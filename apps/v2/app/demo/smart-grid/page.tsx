'use client'
import { Section } from 'maker-ui'
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
          <SmartGrid.LayoutButtons />
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
                name: 'gender',
                label: 'Gender',
                options: [
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' },
                ],
              },
              {
                name: 'age',
                label: 'Age Group',
                options: [
                  { label: '20s', value: 'male' },
                  { label: '30s', value: 'female' },
                  { label: '40s', value: 'female' },
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
