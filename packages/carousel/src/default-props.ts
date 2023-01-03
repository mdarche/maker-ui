import { CarouselProps } from './components/Carousel'

export const defaultProps: Required<CarouselProps> = {
  children: [],
  show: 1,
  slide: 1,
  transition: 0.5,
  swiping: true,
  swipeOn: 0.2,
  responsive: true,
  arrows: null,
  classNames: null,
  infinite: true,
  useArrowKeys: false,
  dynamic: false,
  paginationCallback: null,
  pageCount: 0,
  autoSwipe: null,
  navigation: null,
  triggerClickOn: Number.MIN_SAFE_INTEGER,
  hideArrows: false,
}
