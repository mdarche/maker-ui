import * as React from 'react'
import { cn, Conditional } from '@maker-ui/utils'
import { CSSTransition } from '@maker-ui/transition'

import type { FormProps } from './Form'
import { Field } from './fields'
import { useForm } from './hooks'
import { sortChildren } from './sort-children'

interface FormRendererProps extends React.HTMLAttributes<HTMLFormElement> {
  onSubmit: FormProps['onSubmit']
  children: React.ReactNode
}

export const FormRenderer = ({
  children,
  onSubmit,
  ...props
}: FormRendererProps) => {
  const components = sortChildren(children)
  const { totalPages, fields, error, success, settings } = useForm()
  const isPaginated = totalPages > 1

  return (
    <Conditional
      condition={!!components.success}
      wrapper={(c) => (
        <CSSTransition isSwitch show={!!success}>
          {success ? components.success : c}
        </CSSTransition>
      )}>
      <form {...props}>
        {isPaginated ? components.progress : null}
        {components.header ?? null}
        {isPaginated ? (
          fields?.map(({ subFields, className }, i) => (
            // Wrap this in a CSS transition and add transition controls to settings
            <div
              className={cn([
                'mkui_form_page',
                `page-${i}`,
                className,
                settings?.classNames?.page,
              ])}>
              <div className="mkui_form_grid">
                {subFields?.map((p) => (
                  <Field key={p.name} {...p} />
                ))}
              </div>
              {/**Add pagination here */}
            </div>
          ))
        ) : (
          <div className="mkui_form_grid">
            {fields?.map((p) =>
              p?.type === 'group' && p?.subFields ? (
                <div
                  className={cn([
                    'mkui_field_group',
                    settings?.classNames?.fieldGroup,
                  ])}>
                  {p.subFields?.map((p) => (
                    <Field key={p.name} {...p} />
                  ))}
                </div>
              ) : (
                <Field key={p.name} {...p} />
              )
            )}
          </div>
        )}
        {/* render page vs render field and check for group */}
        {components.children?.map((child, i) => (
          <React.Fragment key={i}>{child}</React.Fragment>
        ))}
        {components.submit ?? null}
        {error ? components.error : null}
        {components.footer ?? null}
      </form>
    </Conditional>
  )
}
