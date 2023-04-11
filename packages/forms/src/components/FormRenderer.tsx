import * as React from 'react'
import { cn, Conditional } from '@maker-ui/utils'
import { CSSTransition } from '@maker-ui/transition'
import { type ResponsiveCSS, Style } from '@maker-ui/style'

import { useForm } from '@/hooks'
import { evaluateConditions, findAllValuesByKey, sortChildren } from '@/helpers'
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

  function getColumnStyles() {
    const cols = [...new Set(findAllValuesByKey({ fields }, 'colSpan') || [])]
    const full = '1 / -1'
    if (cols.length) {
      let css: { [key: string]: any } = {}
      cols.forEach((c) => {
        css[`.colspan-${c}`] = {
          gridColumn: c ? [full, `span ${c}`] : full,
        }
      })
      return css
    }
    return {}
  }

  const renderGroup = (p: FieldProps, i: number) => {
    const shouldRender =
      !p.conditions || evaluateConditions(p.conditions, values, schema)

    return p?.type === 'group' && p?.subFields && shouldRender ? (
      <div
        key={p?.name || i}
        className={cn([
          'mkui-field-group',
          p?.className,
          p?.colSpan ? 'colspan-' + p.colSpan : undefined,
          settings?.classNames?.fieldGroup,
        ])}>
        {p?.label ?? null}
        {p?.instructions ?? null}
        <div className="mkui-form-grid">
          {p.subFields?.map((p) => (
            <Field key={p.name} {...p} />
          ))}
        </div>
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
        }}>
        <Style
          root={formId}
          breakpoints={settings?.breakpoints}
          css={{
            ...getColumnStyles(),
            '.mkui-form-grid': {
              gridTemplateColumns: [
                '1fr',
                `repeat(${settings?.columns}, 1fr)`,
              ] || ['1fr', 'repeat(2, 1fr)'],
              gap: settings?.gap || '1rem',
            } as ResponsiveCSS,
          }}
        />
        {isPaginated && components.progress}
        {components.header}
        {isPaginated ? (
          <CSSTransition show={currentPage} type={settings?.pageTransition}>
            {fields?.map(({ label, subFields, className }, i) => (
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
                    <div className="mkui-form-grid">
                      {subFields?.map((p) => renderGroup(p, i))}
                    </div>
                  </div>
                ) : null}
              </React.Fragment>
            ))}
          </CSSTransition>
        ) : (
          <div className="mkui-form-grid">
            {fields?.map((p, i) => renderGroup(p, i))}
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
