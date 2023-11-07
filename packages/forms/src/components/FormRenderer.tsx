import * as React from 'react'
import { cn, Conditional } from '@maker-ui/utils'
import { CSSTransition } from '@maker-ui/transition'

import { useForm } from '@/context'
import { evaluateConditions, sortChildren, setVariable } from '@/helpers'
import { Repeater } from './fields/Repeater'
import { Field } from './Field'
import type { FormProps } from './Form'
import { Pagination } from './Pagination'
import type { FieldProps } from '@/types'

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
  const components = sortChildren(children)
  const {
    isSubmitting,
    formId,
    totalPages,
    fields,
    schema,
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

  const renderField = (p: FieldProps, i: number) => {
    const shouldRender =
      !p.conditions || evaluateConditions(p.conditions, values, schema)
    const isGroup = p?.type === 'group'
    const isRepeater = p?.type === 'repeater'

    return (isGroup || isRepeater) && p?.subFields && shouldRender ? (
      <div
        key={p?.name || i}
        className={cn([
          `mkui-field-${p?.type}`,
          p?.className,
          p?.colSpan ? 'has-colspan' : undefined,
          settings?.classNames?.fieldGroup,
        ])}
        style={setVariable(p?.colSpan)}>
        {p?.label ?? null}
        {p?.instructions ?? null}
        {isGroup ? (
          <div
            className="mkui-form-grid"
            style={setVariable(p?.grid?.columns, 'col')}>
            {p.subFields?.map((p) => <Field key={p.name} {...p} />)}
          </div>
        ) : (
          <Repeater {...p} />
        )}
      </div>
    ) : (
      <Field key={p.name} {...p} />
    )
  }

  return (
    <Conditional
      condition={!!components.success}
      trueWrapper={(c) => (
        <CSSTransition
          isSwitch
          show={!!success}
          type={settings?.successTransition}>
          {success ? components.success : c}
        </CSSTransition>
      )}>
      <form
        className={cn(['mkui-form', className, formId])}
        {...props}
        onSubmit={(e) => {
          e.preventDefault()
          const valid = validateForm()
          if (valid && !isSubmitting) {
            setSubmitCount()
            setIsSubmitting(true)
            onSubmit(values, { setIsSubmitting, resetForm, submitCount })
          }
        }}
        style={
          {
            '--form-gap': settings?.gap,
            '--form-columns': settings?.columns,
          } as React.CSSProperties
        }>
        {isPaginated && components.progress}
        {components.header}
        {isPaginated ? (
          <CSSTransition show={currentPage} type={settings?.pageTransition}>
            {fields?.map(({ label, grid, subFields, className }, i) => (
              <React.Fragment key={i}>
                {currentPage === i + 1 ? (
                  <div
                    className={cn([
                      'mkui-form-page',
                      `page-${i + 1}`,
                      className,
                      settings?.classNames?.page,
                    ])}>
                    {label && (
                      <div className="mkui-form-page-label">{label}</div>
                    )}
                    <div
                      className="mkui-form-grid"
                      style={setVariable(grid?.columns, 'col')}>
                      {subFields?.map((p) => renderField(p, i))}
                    </div>
                  </div>
                ) : null}
              </React.Fragment>
            ))}
          </CSSTransition>
        ) : (
          <div className="mkui-form-grid">
            {fields?.map((p, i) => renderField(p, i))}
          </div>
        )}
        {components.children?.map((child, i) => (
          <React.Fragment key={i}>{child}</React.Fragment>
        ))}
        {isPaginated ? (
          <Pagination submitButton={components.submit} />
        ) : (
          components.submit
        )}
        {error && components.error}
        {components.footer}
      </form>
    </Conditional>
  )
}
