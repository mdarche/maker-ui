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
  navPosition: 'bottom',
}
