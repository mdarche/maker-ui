import * as React from 'react'
import { cn, Conditional, generateId } from '@maker-ui/utils'
import { CSSTransition } from '@maker-ui/transition'
import { Style } from '@maker-ui/style'

import { useForm } from '@/hooks'
import { sortChildren } from '@/helpers'
import { Field } from './Field'
import type { FormProps } from './Form'

interface FormRendererProps
  extends Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit: FormProps['onSubmit']
  children: React.ReactNode
}

export const FormRenderer = ({
  children,
  onSubmit,
  className,
  ...props
}: FormRendererProps) => {
  const [styleId] = React.useState(generateId())
  const components = sortChildren(children)
  const {
    totalPages,
    fields,
    error,
    values,
    success,
    settings,
    submitCount,
    setSubmitCount,
    setIsSubmitting,
    resetForm,
    currentPage,
    validateForm,
  } = useForm()
  const isPaginated = totalPages > 1

  return (
    <Conditional
      condition={!!components.success}
      wrapper={(c) => (
        <CSSTransition isSwitch show={!!success}>
          {success ? components.success : c}
        </CSSTransition>
      )}>
      <form
        className={cn(['mkui-form', className, styleId])}
        {...props}
        onSubmit={(e) => {
          e.preventDefault()
          const valid = validateForm()
          if (valid) {
            setSubmitCount()
            onSubmit(values, { setIsSubmitting, resetForm, submitCount })
          }
        }}>
        <Style root={styleId} css={{}} />
        {isPaginated && components.progress}
        {components.header}
        {isPaginated ? (
          <CSSTransition show={currentPage} type="fade">
            {fields?.map(({ subFields, className }, i) => (
              <React.Fragment key={i}>
                {currentPage === i + 1 ? (
                  <div
                    className={cn([
                      'mkui-form-page',
                      `page-${i}`,
                      className,
                      settings?.classNames?.page,
                    ])}>
                    <div className="mkui-form-grid">
                      {subFields?.map((p) => (
                        <Field key={p.name} {...p} />
                      ))}
                    </div>
                  </div>
                ) : null}
              </React.Fragment>
            ))}
            <div>Render pagination buttons</div>
          </CSSTransition>
        ) : (
          <div className="mkui-form-grid">
            {fields?.map((p) =>
              p?.type === 'group' && p?.subFields ? (
                <div
                  className={cn([
                    'mkui-field-group',
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
        {components.children?.map((child, i) => (
          <React.Fragment key={i}>{child}</React.Fragment>
        ))}
        {!isPaginated && components.submit}
        {error && components.error}
        {components.footer}
      </form>
    </Conditional>
  )
}
