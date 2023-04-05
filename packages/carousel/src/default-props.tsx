import { CarouselProps } from '@/types'

export const defaultProps: CarouselProps = {
  children: [],
  show: 1,
  slide: 1,
  transition: 0.5,
  draggable: true,
  dragX: 0.25,
  responsive: true,
  infinite: true,
  useArrowKeys: false,
  dynamic: false,
  pageCount: 0,
  triggerClickOn: Number.MIN_SAFE_INTEGER,
  hideArrows: false,
  hidePagination: false,
  autoPlayLimit: -1, // infinitely
  arrows: {
    padding: 20,
    margin: 0,
  },
  pagination: {
    absolute: true,
    position: 'bottom',
    height: 10,
    width: 10,
    borderRadius: '50%',
    spacing: 10,
    margin: 10,
    colorActive: '',
    colorMuted: '',
  },
}
