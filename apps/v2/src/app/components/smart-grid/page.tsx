'use client'
import { Section } from 'maker-ui/layout'
import { SmartGrid } from 'maker-ui/data'
import { renderGrid, renderRow, smartFilters, users } from './seed'

export default function SmartGridPage() {
  return (
    <Section style={{ padding: '0 30px' }}>
      <SmartGrid.Provider
        data={users}
        filters={smartFilters}
        searchSettings={{ keys: ['name', 'age'] }}>
        <SmartGrid.Search />
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
          <SmartGrid.ActiveFilters />
          <SmartGrid.SortButton />
        </div>
        <div
          className="flex"
          style={{
            width: '100%',
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
                filter: 'colors',
                label: 'Favorite Color',
                options: [
                  { label: 'Red', value: 'red' },
                  { label: 'Blue', value: 'blue' },
                  { label: 'Green', value: 'green' },
                  { label: 'Pink', value: 'pink' },
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
          <div style={{ flex: 1 }}>
            <SmartGrid renderRow={renderRow} renderGrid={renderGrid} />
          </div>
        </div>
      </SmartGrid.Provider>
    </Section>
  )
}
