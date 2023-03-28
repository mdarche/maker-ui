import * as React from 'react'
import { cn, Conditional, generateId } from '@maker-ui/utils'
import { CSSTransition } from '@maker-ui/transition'
import { type ResponsiveCSS, Style } from '@maker-ui/style'

import { useForm } from '@/hooks'
import { findAllByKey, sortChildren } from '@/helpers'
import type { FieldProps } from '@/types'
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

  function getColumnStyles() {
    const cols = [...new Set(findAllByKey({ fields }, 'colSpan') || [])]
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
    return p?.type === 'group' && p?.subFields ? (
      <div
        key={p?.name || i}
        className={cn([
          'mkui-field-group',
          p?.className,
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
        <Style
          root={styleId}
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
          <CSSTransition show={currentPage} type="fade">
            {fields?.map(({ subFields, className }, i) => (
              <React.Fragment key={i}>
                {currentPage === i + 1 ? (
                  <div
                    className={cn([
                      'mkui-form-page',
                      `page-${i + 1}`,
                      className,
                      settings?.classNames?.page,
                    ])}>
                    <div className="mkui-form-grid">
                      {subFields?.map((p) => renderGroup(p, i))}
                    </div>
                  </div>
                ) : null}
              </React.Fragment>
            ))}
            {/* <div>Render pagination buttons</div> */}
          </CSSTransition>
        ) : (
          <div className="mkui-form-grid">
            {fields?.map((p, i) => renderGroup(p, i))}
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
