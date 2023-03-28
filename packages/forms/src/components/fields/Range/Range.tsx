import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  ChangeEvent,
} from 'react'
import { merge, cn, generateId } from '@maker-ui/utils'
import { FieldInputProps, FieldProps } from '@/types'
import { useField } from 'src/hooks/useForm'

export const Range = ({ name }: FieldInputProps) => {
  const [id] = useState(generateId())
  const { field, setValue } = useField(name)
  const { range: r, initialValue }: Required<FieldProps> = merge(
    {
      range: {
        min: 1,
        max: 10,
        step: 1,
        minLabel: 'Min',
        maxLabel: 'Max',
        textInput: true,
      },
    },
    field || {}
  )

  const [minVal, setMinVal] = useState(r.min!)
  const [maxVal, setMaxVal] = useState(r.max!)
  const minValRef = useRef<HTMLInputElement>(null)
  const maxValRef = useRef<HTMLInputElement>(null)
  const rangeRef = useRef<HTMLDivElement>(null)

  const sharedAtts = {
    min: r.min,
    max: r.max,
    step: r.step,
  }

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - r.min!) / (r.max! - r.min!)) * 100),
    [r?.min, r?.max]
  )

  useEffect(() => {
    setMaxVal(initialValue?.max || r.max)
    setMinVal(initialValue?.min || r.min)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue])

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal)
      const maxPercent = getPercent(+maxValRef.current.value)

      if (rangeRef.current) {
        rangeRef.current.style.left = `${minPercent}%`
        rangeRef.current.style.width = `${maxPercent - minPercent}%`
      }
    }
  }, [minVal, getPercent])

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value)
      const maxPercent = getPercent(maxVal)

      if (rangeRef.current) {
        rangeRef.current.style.width = `${maxPercent - minPercent}%`
      }
    }
  }, [maxVal, getPercent])

  useEffect(() => {
    setValue({ min: minVal, max: maxVal })
    r?.onChange && r.onChange({ min: minVal, max: maxVal })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minVal, maxVal, r?.onChange])

  const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value < r.min!) return
    const value = Math.min(+e.target.value, maxVal - 1)
    setMinVal(value)
    e.target.value = value.toString()
  }

  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value > r.max!) return
    const value = Math.max(+e.target.value, minVal + 1)
    setMaxVal(value)
    e.target.value = value.toString()
  }

  return (
    <div className="mkui-range">
      {r?.textInput ? (
        <div className="flex align-center justify-between">
          <div className="mkui-range-input">
            <label htmlFor={`${id}-min`}>{r?.labelMin}</label>
            <div className="flex align-center">
              {r?.beforeInput}
              <input
                id={`${id}-min`}
                className="mkui-input"
                type="number"
                name="input-min"
                value={minVal}
                onChange={handleMinChange}
              />
              {r?.afterInput}
            </div>
          </div>
          <div className="mkui-range-input">
            <label htmlFor={`${id}-max`}>{r?.labelMax}</label>
            <div className="flex align-center">
              {r?.beforeInput}
              <input
                id={`${id}-max`}
                className="mkui-input"
                type="number"
                name="input-max"
                value={maxVal}
                onChange={handleMaxChange}
              />
              {r?.afterInput}
            </div>
          </div>
        </div>
      ) : null}
      <div className="mkui-range-slider flex align-center justify-center relative">
        <input
          type="range"
          ref={minValRef}
          className={cn([
            'mkui-thumb absolute z-3',
            minVal > r.max! - 100 ? 'z-5' : undefined,
          ])}
          value={minVal}
          {...sharedAtts}
          onChange={handleMinChange}
        />
        <input
          type="range"
          ref={maxValRef}
          className="mkui-thumb absolute z-4"
          value={maxVal}
          {...sharedAtts}
          onChange={handleMaxChange}
        />
        <div className="mkui-slider relative">
          <div className="mkui-thumb-track absolute" />
          <div ref={rangeRef} className="mkui-thumb-progress absolute" />
        </div>
      </div>
    </div>
  )
}
