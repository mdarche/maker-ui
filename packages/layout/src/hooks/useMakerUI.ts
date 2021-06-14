import { useOptions } from '../context/OptionContext'

export function useMakerUI() {
  const options = useOptions()

  return {
    options,
  }
}
