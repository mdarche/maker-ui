import * as React from 'react'
import { cn, Conditional } from '@maker-ui/utils'
import { CSSTransition } from '@maker-ui/transition'
import { type ResponsiveCSS, Style } from '@maker-ui/style'

import { useForm } from '@/context'
import { evaluateConditions, findAllValuesByKey, sortChildren } from '@/helpers'
import { Field } from './Field'
import type { FormProps } from './Form'
import { Pagination } from './Pagination'
import type { FieldProps } from '@/types'
import { getColVariable } from 'src/helpers/utils'

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
          p?.colSpan ? 'colspan-' + p.colSpan : undefined,
          settings?.classNames?.fieldGroup,
        ])}>
        {p?.label ?? null}
        {p?.instructions ?? null}
        <div
          className="mkui-form-grid"
          style={getColVariable(
            isGroup ? p?.group?.columns : p?.repeater?.columns,
            true
          )}>
          {/* TODO - IF REPEATER, add Repeater wrapper to add and delete... Need to store these values in state and figure out the best way to initialize or control externally */}
          {p.subFields?.map((p) => <Field key={p.name} {...p} />)}
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
