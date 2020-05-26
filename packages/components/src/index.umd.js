;(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory()
    : typeof define === 'function' && define.amd
    ? define(factory)
    : factory()
})(this, function() {
  function _interopDefault$1(ex) {
    return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
  }

  var ResizeObserver = _interopDefault$1(require('resize-observer-polyfill'))

  var reactDom = require('react-dom')

  var makerUi = require('maker-ui')

  var React = require('react')

  var React__default = _interopDefault$1(React)

  var themeUi = require('theme-ui')

  var reactSpring = require('react-spring')

  function format(value) {
    return isNaN(value) ? value : value + 'px'
  }

  function getSign(type) {
    return type.includes('right') || type.includes('down') ? '-' : ''
  }

  function usePrevious(value) {
    var ref = React.useRef()
    React.useEffect(
      function() {
        return void (ref.current = value)
      },
      [value]
    )
    return ref.current
  }

  function useMeasure() {
    var ref = React.useRef()
    var ref$1 = React.useState({
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    })
    var bounds = ref$1[0]
    var set = ref$1[1]
    var ref$2 = React.useState(function() {
      return new ResizeObserver(function(ref) {
        var entry = ref[0]
        return set(entry.contentRect)
      })
    })
    var ro = ref$2[0]
    React.useEffect(
      function() {
        if (ref.current) {
          ro.observe(ref.current)
        }

        return function() {
          return ro.disconnect()
        }
      },
      [ro]
    )
    return [
      {
        ref: ref,
      },
      bounds,
    ]
  }

  function useTracker(type, key, toggle, expiration) {
    var ref = React.useState(true)
    var active = ref[0]
    var set = ref[1]

    var delay = function() {
      setTimeout(function() {
        set(false)
      }, 1000)
    }

    React.useEffect(
      function() {
        // Use session storage
        if (type === 'session') {
          var sessionCheck = sessionStorage.getItem(key)

          if (toggle && sessionCheck) {
            return set(false)
          }

          if (!toggle && !sessionCheck) {
            delay()
            return sessionStorage.setItem(key, 'true')
          }
        } // Use cookie storage

        if (type === 'cookie') {
          var cookieCheck = document.cookie.split(';').some(function(i) {
            return i.trim().startsWith(key)
          })

          if (toggle && cookieCheck) {
            return set(false)
          }

          if (!toggle && !cookieCheck) {
            delay()
            return (document.cookie =
              key + '=true;expires=' + expiration + ';path=/')
          }
        }
      },
      [toggle, type, expiration, key]
    )
    return active
  }

  function objectWithoutProperties(obj, exclude) {
    var target = {}

    for (var k in obj) {
      if (
        Object.prototype.hasOwnProperty.call(obj, k) &&
        exclude.indexOf(k) === -1
      ) {
        target[k] = obj[k]
      }
    }

    return target
  } // TODO - Move all click and focus event handlers to functions outside of render

  var AccordionPanel = React__default.forwardRef(function(ref$1, ref) {
    var title = ref$1.title
    var open = ref$1.open
    if (open === void 0) {
      open = false
    }
    var eventKey = ref$1.eventKey
    var variant = ref$1.variant
    if (variant === void 0) {
      variant = 'accordion'
    }
    var borderColor = ref$1.borderColor
    if (borderColor === void 0) {
      borderColor = '#dedede'
    }
    var children = ref$1.children
    var className = ref$1.className
    if (className === void 0) {
      className = ''
    }
    var rest = objectWithoutProperties(ref$1, [
      'title',
      'open',
      'eventKey',
      'variant',
      'borderColor',
      'children',
      'className',
    ])
    var props = rest
    var ref$2 = useAccordion()
    var state = ref$2[0]
    var setState = ref$2[1]
    var ref$3 = React.useState(
      state.showSingle && state.index === eventKey ? true : open
    )
    var show = ref$3[0]
    var set = ref$3[1]
    var ref$4 = React.useState(makerUi.generateId())
    var buttonId = ref$4[0]
    var ref$5 = React.useState(makerUi.generateId())
    var panelId = ref$5[0]
    var ref$6 = useMeasure()
    var bind = ref$6[0]
    var viewHeight = ref$6[1].height
    React.useEffect(
      function() {
        if (state.showSingle) {
          return state.activeKey !== eventKey ? set(false) : set(true)
        }
      },
      [state, eventKey, set]
    )
    var ref$7 = reactSpring.useSpring({
      from: {
        height: 0,
      },
      to: {
        height: show ? viewHeight : 0,
      },
    })
    var height = ref$7.height

    var setActive = function() {
      return !show && state.showSingle
        ? setState(function(s) {
            return Object.assign({}, s, {
              activeKey: eventKey,
            })
          })
        : set(!show)
    }

    return React__default.createElement(
      themeUi.Box,
      Object.assign(
        {},
        {
          ref: ref,
          variant: variant,
          className: (show ? 'expanded ' : '') + 'accordion ' + className,
        },
        props,
        {
          __css: {
            border: '1px solid',
          },
        }
      ),
      React__default.createElement(
        themeUi.Box,
        {
          as: 'button',
          title: (show ? 'Collapse' : 'Expand') + ' content',
          id: buttonId,
          'aria-expanded': show ? 'true' : 'false',
          'aria-controls': panelId,
          className: (show ? 'active ' : '') + 'accordion-toggle',
          variant: variant + '.toggle',
          onClick: setActive,
          sx: {
            display: 'flex',
            justifyContent: state.icon ? 'space-between' : 'flex-start',
            alignItems: 'center',
            width: '100%',
            border: 'none',
            p: 3,
            cursor: 'pointer',
          },
        },
        React__default.createElement('span', null, title),
        state.icon &&
          React__default.createElement(
            'span',
            null,
            state.customIcons.expand !== null
              ? show
                ? state.customIcons.collapse
                : state.customIcons.expand
              : React__default.createElement(
                  themeUi.Box,
                  {
                    as: 'svg',
                    xmlns: 'http://www.w3.org/2000/svg',
                    viewBox: '0 0 24 24',
                    sx: {
                      width: 15,
                      transition: 'all ease .3s',
                      transform: !show ? 'rotate(0)' : 'rotate(180deg)',
                    },
                  },
                  React__default.createElement('path', {
                    fill: 'none',
                    stroke: 'currentColor',
                    strokeMiterlimit: '10',
                    strokeWidth: '2',
                    d: 'M21 8.5l-9 9-9-9',
                  })
                )
          )
      ),
      React__default.createElement(
        reactSpring.animated.div,
        {
          id: panelId,
          role: 'region',
          'aria-labelledby': buttonId,
          style: {
            willChange: 'height',
            overflow: 'hidden',
            height: height,
          },
        },
        React__default.createElement(
          themeUi.Box,
          bind,
          React__default.createElement(
            themeUi.Box,
            {
              className: 'accordion-panel',
              variant: variant + '.panel',
              sx: {
                borderTop: '1px solid ' + borderColor,
              },
            },
            children
          )
        )
      )
    )
  })

  function objectWithoutProperties$1(obj, exclude) {
    var target = {}

    for (var k in obj) {
      if (
        Object.prototype.hasOwnProperty.call(obj, k) &&
        exclude.indexOf(k) === -1
      ) {
        target[k] = obj[k]
      }
    }

    return target
  }

  var AccordionContext = React__default.createContext()
  var AccordionUpdateContext = React__default.createContext()

  var Accordion = function(ref) {
    var icon = ref.icon
    if (icon === void 0) {
      icon = true
    }
    var customIcons = ref.customIcons
    if (customIcons === void 0) {
      customIcons = {
        expand: null,
        collapse: null,
      }
    }
    var defaultKey = ref.defaultKey
    if (defaultKey === void 0) {
      defaultKey = 0
    }
    var showSingle = ref.showSingle
    if (showSingle === void 0) {
      showSingle = false
    }
    var children = ref.children
    var rest = objectWithoutProperties$1(ref, [
      'icon',
      'customIcons',
      'defaultKey',
      'showSingle',
      'children',
    ])
    var props = rest
    var ref$1 = React.useState({
      activeKey: defaultKey,
      icon: icon,
      customIcons: customIcons,
      showSingle: showSingle,
    })
    var state = ref$1[0]
    var setState = ref$1[1]
    return React__default.createElement(
      AccordionContext.Provider,
      {
        value: state,
      },
      React__default.createElement(
        AccordionUpdateContext.Provider,
        {
          value: setState,
        },
        React__default.createElement(themeUi.Box, props, children)
      )
    )
  }

  function useAccordion() {
    var state = React.useContext(AccordionContext)
    var setState = React.useContext(AccordionUpdateContext)

    if (typeof state === undefined) {
      throw new Error(
        'AccordionPanel must be used within an Accordion component'
      )
    }

    return [state, setState]
  }

  Accordion.Panel = AccordionPanel

  var MinusIcon = function(props) {
    return React__default.createElement(
      'svg',
      Object.assign({}, props, {
        viewBox: '64 -65 897 897',
      }),
      React__default.createElement(
        'g',
        null,
        React__default.createElement('path', {
          d:
            'M888 760v0v0v-753v0h-752v0v753v0h752zM888 832h-752q-30 0 -51 -21t-21 -51v-753q0 -29 21 -50.5t51 -21.5h753q29 0 50.5 21.5t21.5 50.5v753q0 30 -21.5 51t-51.5 21v0zM732 347h-442q-14 0 -25 10.5t-11 25.5v0q0 15 11 25.5t25 10.5h442q14 0 25 -10.5t11 -25.5v0 q0 -15 -11 -25.5t-25 -10.5z',
        })
      )
    )
  }

  var PlusIcon = function(props) {
    return React__default.createElement(
      'svg',
      Object.assign({}, props, {
        viewBox: '64 -65 897 897',
      }),
      React__default.createElement(
        'g',
        null,
        React__default.createElement('path', {
          d:
            'M888 760v0v0v-753v0h-752v0v753v0h752zM888 832h-752q-30 0 -51 -21t-21 -51v-753q0 -29 21 -50.5t51 -21.5h753q29 0 50.5 21.5t21.5 50.5v753q0 30 -21.5 51t-51.5 21v0zM732 420h-184v183q0 15 -10.5 25.5t-25.5 10.5v0q-14 0 -25 -10.5t-11 -25.5v-183h-184 q-15 0 -25.5 -11t-10.5 -25v0q0 -15 10.5 -25.5t25.5 -10.5h184v-183q0 -15 11 -25.5t25 -10.5v0q15 0 25.5 10.5t10.5 25.5v183h184q15 0 25.5 10.5t10.5 25.5v0q0 14 -10.5 25t-25.5 11z',
        })
      )
    )
  }

  var ExIcon = function(props) {
    return React__default.createElement(
      'svg',
      Object.assign({}, props, {
        viewBox: '64 -65 897 897',
      }),
      React__default.createElement(
        'g',
        null,
        React__default.createElement('path', {
          d:
            'M717.5 589.5q-10.5 10.5 -25.5 10.5t-26 -10l-154 -155l-154 155q-11 10 -26 10t-25.5 -10.5t-10.5 -25.5t11 -25l154 -155l-154 -155q-11 -10 -11 -25t10.5 -25.5t25.5 -10.5t26 10l154 155l154 -155q11 -10 26 -10t25.5 10.5t10.5 25t-11 25.5l-154 155l154 155 q11 10 11 25t-10.5 25.5zM888 760v0v0v-753v0h-752v0v753v0h752zM888 832h-752q-30 0 -51 -21t-21 -51v-753q0 -29 21 -50.5t51 -21.5h753q29 0 50.5 21.5t21.5 50.5v753q0 30 -21.5 51t-51.5 21v0z',
        })
      )
    )
  }

  var CloseIcon = function(props) {
    return React__default.createElement(
      'svg',
      Object.assign({}, props, {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
      }),
      React__default.createElement('path', {
        d:
          'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
      })
    )
  }

  function objectWithoutProperties$2(obj, exclude) {
    var target = {}

    for (var k in obj) {
      if (
        Object.prototype.hasOwnProperty.call(obj, k) &&
        exclude.indexOf(k) === -1
      ) {
        target[k] = obj[k]
      }
    }

    return target
  }

  var AnimatedBox = reactSpring.animated(themeUi.Flex)

  var fixedPartial = function(fixed, bottom) {
    return fixed
      ? {
          position: 'fixed',
          left: 0,
          right: 0,
          top: !bottom && 0,
          bottom: bottom && 0,
          zIndex: 1000,
        }
      : null
  }

  var Announcement = React__default.forwardRef(function(ref$1, ref) {
    var variant = ref$1.variant
    if (variant === void 0) {
      variant = 'announcement'
    }
    var key = ref$1.key
    if (key === void 0) {
      key = 'mui_dismiss_announce'
    }
    var bg = ref$1.bg
    if (bg === void 0) {
      bg = 'primary'
    }
    var color = ref$1.color
    if (color === void 0) {
      color = '#fff'
    }
    var fixed = ref$1.fixed
    if (fixed === void 0) {
      fixed = false
    }
    var trackerType = ref$1.trackerType
    if (trackerType === void 0) {
      trackerType = 'session'
    }
    var expiration = ref$1.expiration
    if (expiration === void 0) {
      expiration = 2592000
    }
    var allowClose = ref$1.allowClose
    if (allowClose === void 0) {
      allowClose = true
    }
    var closeButton = ref$1.closeButton
    if (closeButton === void 0) {
      closeButton = React__default.createElement(CloseIcon, null)
    }
    var bottom = ref$1.bottom
    if (bottom === void 0) {
      bottom = false
    }
    var children = ref$1.children
    var rest = objectWithoutProperties$2(ref$1, [
      'variant',
      'key',
      'bg',
      'color',
      'fixed',
      'trackerType',
      'expiration',
      'allowClose',
      'closeButton',
      'bottom',
      'children',
    ])
    var props = rest
    var ref$2 = React.useState(true)
    var show = ref$2[0]
    var set = ref$2[1]
    var ref$3 = useMeasure()
    var bind = ref$3[0]
    var viewHeight = ref$3[1].height
    var active = useTracker(trackerType, key, show, expiration)
    var spring = reactSpring.useSpring({
      transform: fixed
        ? show
          ? 'translateY(0%)'
          : 'translateY(' + (!bottom && '-') + '100%)'
        : undefined,
      height: !fixed ? (show ? viewHeight : 0) : undefined,
      opacity: show ? 1 : 0,
    })
    return active
      ? React__default.createElement(
          AnimatedBox,
          {
            ref: ref,
            as: 'aside',
            variant: variant,
            className: 'announcement',
            style: spring,
            __css: Object.assign({}, fixedPartial(fixed, bottom), {
              display: 'flex',
              alignItems: 'center',
              bg: bg,
              color: color,
              willChange: !fixed && 'height',
            }),
          },
          React__default.createElement(
            themeUi.Flex,
            Object.assign({}, bind, {
              __css: {
                width: '100%',
                alignItems: 'center',
              },
            }),
            React__default.createElement(
              themeUi.Flex,
              Object.assign(
                {},
                {
                  variant: variant + '.text',
                  className: 'announcement-text',
                  __css: {
                    flex: 1,
                    flexWrap: 'wrap',
                  },
                },
                props
              ),
              children
            ),
            allowClose &&
              React__default.createElement(
                themeUi.Box,
                {
                  as: 'button',
                  variant: variant + '.close',
                  className: 'announcement-close',
                  title: 'Dismiss',
                  'aria-label': 'Dismiss',
                  onClick: function(e) {
                    return set(false)
                  },
                  sx: {
                    cursor: 'pointer',
                    border: 'none',
                    background: 'none',
                    px: '15px',
                    color: color,
                    svg: {
                      height: 27,
                      fill: color,
                    },
                  },
                },
                closeButton
              )
          )
        )
      : null
  })

  function objectWithoutProperties$3(obj, exclude) {
    var target = {}

    for (var k in obj) {
      if (
        Object.prototype.hasOwnProperty.call(obj, k) &&
        exclude.indexOf(k) === -1
      ) {
        target[k] = obj[k]
      }
    }

    return target
  }

  var CookieNotice = React__default.forwardRef(function(ref$1, ref) {
    var variant = ref$1.variant
    if (variant === void 0) {
      variant = 'cookie'
    }
    var bg = ref$1.bg
    if (bg === void 0) {
      bg = '#000'
    }
    var color = ref$1.color
    var top = ref$1.top
    if (top === void 0) {
      top = false
    }
    var children = ref$1.children
    var rest = objectWithoutProperties$3(ref$1, [
      'variant',
      'bg',
      'color',
      'key',
      'expiration',
      'closeButton',
      'top',
      'children',
    ])
    var props = rest
    return React__default.createElement(
      Announcement,
      Object.assign(
        {},
        {
          ref: ref,
          variant: variant,
          fixed: true,
          bottom: !top ? true : false,
          bg: bg,
          color: color,
          trackerType: 'cookie',
          closeButton: 'Got it!',
        },
        props
      ),
      children ||
        'We use cookies to ensure you get the best experience on our site.'
    )
  })

  function objectWithoutProperties$4(obj, exclude) {
    var target = {}

    for (var k in obj) {
      if (
        Object.prototype.hasOwnProperty.call(obj, k) &&
        exclude.indexOf(k) === -1
      ) {
        target[k] = obj[k]
      }
    }

    return target
  }

  var AnimatedBox$1 = reactSpring.animated(themeUi.Box)

  var getTransform = function(ref, show) {
    var direction = ref.direction
    var distance = ref.distance

    switch (direction) {
      case 'up':
      case 'down':
        return show
          ? 'translate3d(0,0,0)'
          : 'translate3d(0,' + getSign(direction) + format(distance) + ',0)'

      case 'left':
      case 'right':
        return show
          ? 'translate3d(0,0,0)'
          : 'translate3d(' + getSign(direction) + format(distance) + ')'

      default:
        return undefined
    }
  }

  var FadeBox = function(ref$1) {
    var offset = ref$1.offset
    if (offset === void 0) {
      offset = 300
    }
    var springConfig = ref$1.springConfig
    var direction = ref$1.direction
    var distance = ref$1.distance
    if (distance === void 0) {
      distance = 20
    }
    var fade = ref$1.fade
    if (fade === void 0) {
      fade = false
    }
    var settings = ref$1.settings
    if (settings === void 0) {
      settings = {
        direction: 'up',
        distance: 20,
      }
    }
    var rest = objectWithoutProperties$4(ref$1, [
      'offset',
      'springConfig',
      'direction',
      'distance',
      'fade',
      'settings',
    ])
    var props = rest
    var ref = React.useRef(null)
    var ref$2 = React.useState(false)
    var show = ref$2[0]
    var set = ref$2[1]
    var fadeProps = direction
      ? {
          direction: direction,
          distance: distance,
        }
      : settings
    var reveal = reactSpring.useSpring({
      opacity: show ? 1 : 0,
      transform: fade ? undefined : getTransform(fadeProps, show),
      config: springConfig,
    })
    React.useEffect(
      function() {
        var handleScroll = function(e) {
          return !show && window.pageYOffset > ref.current.offsetTop - offset
            ? set(true)
            : null
        }

        if (typeof window !== 'undefined') {
          window.addEventListener('scroll', handleScroll)
          return function() {
            return window.removeEventListener('scroll', handleScroll)
          }
        }
      },
      [show, offset]
    )
    return React__default.createElement(
      AnimatedBox$1,
      Object.assign(
        {},
        {
          style: reveal,
          ref: ref,
        },
        props
      )
    )
  }

  var Portal = function(ref) {
    var children = ref.children
    var root = ref.root

    if (typeof window !== 'undefined') {
      var link = root
        ? document.getElementById(root)
        : document.querySelector('body')
      return reactDom.createPortal(children, link)
    }

    return children
  }

  function objectWithoutProperties$5(obj, exclude) {
    var target = {}

    for (var k in obj) {
      if (
        Object.prototype.hasOwnProperty.call(obj, k) &&
        exclude.indexOf(k) === -1
      ) {
        target[k] = obj[k]
      }
    }

    return target
  }

  var focusElements = [
    'a',
    'button:not([disabled])',
    'input',
    'textarea',
    'select',
    '[tabIndex]:not([tabIndex="-1"])',
  ].join(', ')
  var AnimatedBox$2 = reactSpring.animated(themeUi.Box)
  var position = {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  }

  var centered = function(val) {
    return val
      ? {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }
      : null
  }

  var Modal = function(ref) {
    var appendTo = ref.appendTo
    var title = ref.title
    if (title === void 0) {
      title = 'Modal Dialog'
    }
    var closeOnBlur = ref.closeOnBlur
    if (closeOnBlur === void 0) {
      closeOnBlur = false
    }
    var variant = ref.variant
    if (variant === void 0) {
      variant = 'modal'
    }
    var show = ref.show
    var toggle = ref.toggle
    var focusRef = ref.focusRef
    var center = ref.center
    if (center === void 0) {
      center = false
    }
    var bg = ref.bg
    if (bg === void 0) {
      bg = 'rgba(0, 0, 0, 0.66)'
    }
    var style = ref.style
    if (style === void 0) {
      style = {}
    }
    var children = ref.children
    var rest$1 = objectWithoutProperties$5(ref, [
      'appendTo',
      'title',
      'closeOnBlur',
      'variant',
      'show',
      'toggle',
      'focusRef',
      'center',
      'bg',
      'style',
      'children',
    ])
    var rest = rest$1
    var modalRef = React.useRef(null)
    var ref$1 = React.useState({
      count: 0,
      first: null,
      last: null,
    })
    var focusable = ref$1[0]
    var setFocusable = ref$1[1]
    var closeModal = React.useCallback(
      function() {
        if (focusRef !== undefined) {
          focusRef.current.focus()
        }

        toggle(false)
      },
      [toggle, focusRef]
    )
    var fade = reactSpring.useTransition(show, null, {
      from: {
        opacity: 0,
      },
      enter: {
        opacity: 1,
      },
      leave: {
        opacity: 0,
      },
    }) // Handle Focus

    React.useEffect(
      function() {
        if (show) {
          var elements = modalRef.current.querySelectorAll(focusElements)
          document.body.style.overflow = 'hidden'

          if (elements.length !== 0) {
            setFocusable({
              count: elements.length,
              elements: elements,
              first: elements[0],
              last: elements[elements.length - 1],
            })
            elements[0].focus()
          } else {
            modalRef.current.focus()
          }
        } else {
          document.body.style.overflow = null
        }
      },
      [show, setFocusable]
    ) // Handle Keyboard

    React.useEffect(
      function() {
        function handleKeyDown(e) {
          switch (e.keyCode) {
            case 27:
              // esc
              return closeModal()

            case 9:
              // tab
              if (focusable.count <= 1) {
                e.preventDefault()
                return
              } else {
                if (e.shiftKey && document.activeElement === focusable.first) {
                  e.preventDefault()
                  return focusable.last.focus()
                }

                if (!e.shiftKey && document.activeElement === focusable.last) {
                  e.preventDefault()
                  return focusable.first.focus()
                }

                if (
                  ![]
                    .concat(focusable.elements)
                    .includes(document.activeElement)
                ) {
                  return focusable.first.focus()
                }

                return
              }

            default:
              return
          }
        }

        if (typeof window !== 'undefined') {
          if (show) {
            window.addEventListener('keydown', handleKeyDown)
          }

          return function() {
            return window.removeEventListener('keydown', handleKeyDown)
          }
        }
      },
      [show, focusable, closeModal]
    )
    return React__default.createElement(
      Portal,
      {
        root: appendTo,
      },
      fade.map(function(ref) {
        var item = ref.item
        var key = ref.key
        var props = ref.props
        return (
          item &&
          React__default.createElement(
            AnimatedBox$2,
            {
              key: key,
              ref: modalRef,
              variant: variant,
              role: 'dialog',
              'aria-label': title,
              'aria-modal': 'true',
              style: Object.assign({}, style, props),
              tabIndex: focusable.count === 0 ? '0' : undefined,
              __css: Object.assign({}, position, centered(center), {
                zIndex: 100,
              }),
            },
            React__default.createElement(themeUi.Box, {
              onClick: function(e) {
                return closeOnBlur ? closeModal() : null
              },
              className: 'modal-overlay',
              variant: variant + '.overlay',
              __css: Object.assign({}, position, {
                zIndex: -1,
                bg: bg,
              }),
            }),
            React__default.createElement(
              themeUi.Box,
              Object.assign(
                {},
                {
                  __css: {
                    zIndex: 1,
                    overflow: 'scroll',
                  },
                },
                rest
              ),
              children
            )
          )
        )
      })
    )
  }

  function getTransition(type, distance) {
    switch (type) {
      case 'fade-right':
      case 'fade-left':
        return 'translate3d(' + getSign(type) + format(distance) + ',0,0)'

      case 'fade-down':
      case 'fade-up':
        return 'translate3d(0,' + getSign(type) + format(distance) + ',0)'

      default:
        return undefined
    }
  }

  var PageTransition = function(ref) {
    var type = ref.type
    if (type === void 0) {
      type = 'fade-up'
    }
    var distance = ref.distance
    if (distance === void 0) {
      distance = 20
    }
    var config = ref.config
    var children = ref.children
    var transitions = reactSpring.useTransition(
      children,
      function(children) {
        return children.key
      },
      {
        from: {
          opacity: 0,
          transform: getTransition(type, distance),
          position: 'static',
        },
        enter: {
          opacity: 1,
          transform: 'translate3d(0%,0,0)',
        },
        leave: {
          opacity: 0,
        },
        config: config,
      }
    )
    return transitions.map(function(ref) {
      var item = ref.item
      var key = ref.key
      var props = ref.props
      return React__default.createElement(
        themeUi.Flex,
        {
          key: key,
          id: 'content-wrapper',
          sx: {
            flexDirection: 'column',
            minHeight: '80vh',
          },
        },
        React__default.createElement(
          reactSpring.animated.div,
          {
            style: Object.assign({}, props, {
              flex: 1,
            }),
          },
          item
        )
      )
    })
  }

  var Popover = React__default.forwardRef(function(ref$1, ref) {
    var show = ref$1.show
    var role = ref$1.role
    if (role === void 0) {
      role = 'tooltip'
    }
    var ref$2 = makerUi.useMakerUI()
    var extendTheme = ref$2.extendTheme
    React.useEffect(function() {
      extendTheme({
        colors: {
          crazy: 'red',
        },
      })
    }, []) // console.log(
    //   target.current ? target.current.getBoundingClientRect() : 'nope'
    // )

    return (
      show &&
      React__default.createElement(
        themeUi.Box,
        {
          role: role,
          ref: ref,
          sx: {
            bg: 'crazy',
          },
        },
        'TODO'
      )
    )
  }) // Need Popover, Tooltip for links, Dropdown Menu

  function objectWithoutProperties$6(obj, exclude) {
    var target = {}

    for (var k in obj) {
      if (
        Object.prototype.hasOwnProperty.call(obj, k) &&
        exclude.indexOf(k) === -1
      ) {
        target[k] = obj[k]
      }
    }

    return target
  }

  var defaultColors = {
    primary: '#0e94d4',
    secondary: '#58c5fa',
    tertiary: '#9ad8f6',
  }
  var Spinner = React__default.forwardRef(function(ref$1, ref) {
    var type = ref$1.type
    if (type === void 0) {
      type = 'default'
    }
    var size = ref$1.size
    if (size === void 0) {
      size = 80
    }
    var colors = ref$1.colors
    if (colors === void 0) {
      colors = defaultColors
    }
    var rest = objectWithoutProperties$6(ref$1, ['type', 'size', 'colors'])
    var props = rest

    switch (type) {
      case 'pulse':
        return React__default.createElement(
          Pulse,
          Object.assign(
            {},
            {
              ref: ref,
              size: size,
              colors: colors,
            },
            props
          )
        )

      case 'scale':
        return React__default.createElement(
          Scale,
          Object.assign(
            {},
            {
              ref: ref,
              size: size,
              colors: colors,
            },
            props
          )
        )

      case 'rotate':
        return React__default.createElement(
          Rotate,
          Object.assign(
            {},
            {
              ref: ref,
              size: size,
              colors: colors,
            },
            props
          )
        )

      case 'blocks':
        return React__default.createElement(
          Blocks,
          Object.assign(
            {},
            {
              ref: ref,
              size: size,
              colors: colors,
            },
            props
          )
        )

      case 'default':
      default:
        return React__default.createElement(
          themeUi.Spinner,
          Object.assign(
            {},
            {
              ref: ref,
              size: size,
              sx: {
                color: colors.primary,
              },
            },
            props
          )
        )
    }
  }) // Blocks

  var Blocks = function(ref) {
    var size = ref.size
    var ref_colors = ref.colors
    var primary = ref_colors.primary
    var secondary = ref_colors.secondary
    var tertiary = ref_colors.tertiary
    var rest = objectWithoutProperties$6(ref, ['size', 'colors'])
    var props = rest
    var points = [
      {
        x: '9',
        y: '9',
        fill: primary,
        b1: '-1.83',
        b2: '-1.33',
      },
      {
        x: '34.8',
        y: '56',
        fill: secondary,
        b1: '-1.16',
        b2: '-0.66',
      },
      {
        x: '56',
        y: '9',
        fill: tertiary,
        b1: '-0.5',
        b2: '0',
      },
    ]

    var getAttributes = function(x) {
      return {
        attributeName: x ? 'x' : 'y',
        dur: '2s',
        repeatCount: 'indefinite',
        keyTimes: '0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1',
        values: '9;56;56;56;56;9;9;9;9',
      }
    }

    return React__default.createElement(
      themeUi.Box,
      Object.assign(
        {},
        {
          as: 'svg',
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 100 100',
          sx: {
            height: size,
            width: size,
          },
        },
        props
      ),
      points.map(function(ref, index) {
        var x = ref.x
        var y = ref.y
        var fill = ref.fill
        var b1 = ref.b1
        var b2 = ref.b2
        return React__default.createElement(
          themeUi.Box,
          {
            key: index,
            as: 'rect',
            x: x,
            y: y,
            rx: '1',
            ry: '1',
            sx: {
              fill: fill,
              height: 35,
              width: 35,
            },
          },
          React__default.createElement(
            'animate',
            Object.assign({}, getAttributes(true), {
              begin: b1,
            })
          ),
          React__default.createElement(
            'animate',
            Object.assign({}, getAttributes(false), {
              begin: b2,
            })
          )
        )
      })
    )
  } // Pulse

  var Pulse = function(ref) {
    var size = ref.size
    var ref_colors = ref.colors
    var primary = ref_colors.primary
    var secondary = ref_colors.secondary
    var rest = objectWithoutProperties$6(ref, ['size', 'colors'])
    var props = rest
    var points = [
      {
        r: '24',
        begin: '-0.8',
        color: primary,
      },
      {
        r: '39.6',
        begin: '0',
        color: secondary,
      },
    ]

    var getAttributes = function(r) {
      return {
        attributeName: r ? 'r' : 'opacity',
        repeatCount: 'indefinite',
        dur: '1.5s',
        values: r ? '0;40' : '1;0',
        keySplines: r ? '0 0.2 0.8 1' : '0.2 0 0.8 1',
        keyTimes: '0;1',
        calcMode: 'spline',
      }
    }

    return React__default.createElement(
      themeUi.Box,
      Object.assign(
        {},
        {
          as: 'svg',
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 100 100',
          sx: {
            height: size,
            width: size,
          },
        },
        props
      ),
      points.map(function(ref, index) {
        var color = ref.color
        var begin = ref.begin
        var r = ref.r
        return React__default.createElement(
          themeUi.Box,
          {
            as: 'circle',
            key: index,
            cx: '50',
            cy: '50',
            r: r,
            sx: {
              fill: 'none',
              stroke: color,
              strokeWidth: 3,
            },
          },
          React__default.createElement(
            'animate',
            Object.assign({}, getAttributes(true), {
              begin: begin,
            })
          ),
          React__default.createElement(
            'animate',
            Object.assign({}, getAttributes(false), {
              begin: begin,
            })
          )
        )
      })
    )
  } // Scale - 3 dots in a row

  var Scale = function(ref) {
    var size = ref.size
    var ref_colors = ref.colors
    var primary = ref_colors.primary
    var secondary = ref_colors.secondary
    var tertiary = ref_colors.tertiary
    var rest = objectWithoutProperties$6(ref, ['size', 'colors'])
    var props = rest
    var points = [
      {
        translate: '25 50',
        scale: '.81144',
        begin: '-0.4166',
        color: primary,
      },
      {
        translate: '50 50',
        scale: '.35566',
        begin: '-0.2083',
        color: secondary,
      },
      {
        translate: '75 50',
        scale: '.01406',
        begin: '0',
        color: tertiary,
      },
    ]
    return React__default.createElement(
      themeUi.Box,
      Object.assign(
        {},
        {
          as: 'svg',
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 100 100',
          sx: {
            width: size,
            height: size,
          },
        },
        props
      ),
      points.map(function(ref, index) {
        var translate = ref.translate
        var scale = ref.scale
        var begin = ref.begin
        var color = ref.color
        return React__default.createElement(
          'g',
          {
            key: index,
            transform: 'translate(' + translate + ')',
          },
          React__default.createElement(
            themeUi.Box,
            {
              as: 'circle',
              r: '9',
              transform: 'scale(' + scale + ')',
              sx: {
                fill: color,
              },
            },
            React__default.createElement('animateTransform', {
              attributeName: 'transform',
              type: 'scale',
              begin: begin + 's',
              calcMode: 'spline',
              keySplines: '0.3 0 0.7 1;0.3 0 0.7 1',
              values: '0;1;0',
              keyTimes: '0;0.5;1',
              dur: '1.25s',
              repeatCount: 'indefinite',
            })
          )
        )
      })
    )
  } // Circular Dots

  var Rotate = function(ref) {
    var size = ref.size
    var ref_colors = ref.colors
    var primary = ref_colors.primary
    var secondary = ref_colors.secondary
    var rest = objectWithoutProperties$6(ref, ['size', 'colors'])
    var props = rest
    var themeColors = themeUi.useThemeUI().theme.colors

    var getThemeColor = function(val) {
      return val in themeColors ? themeColors[val] : val
    }

    var p = getThemeColor(primary)
    var s = getThemeColor(secondary)
    var points = [
      {
        cx: '75',
        cy: '50',
        r: '3',
        begin: '-0.9166',
      },
      {
        cx: '71.651',
        cy: '62.5',
        r: '3',
        begin: '-0.8333',
      },
      {
        cx: '62.5',
        cy: '71.651',
        r: '3',
        begin: '-0.75',
      },
      {
        cx: '50',
        cy: '75',
        r: '3',
        begin: '-0.6666',
      },
      {
        cx: '37.5',
        cy: '71.651',
        r: '3',
        begin: '-0.5833',
      },
      {
        cx: '28.349',
        cy: '62.5',
        r: '3.269',
        begin: '-0.5',
      },
      {
        cx: '25',
        cy: '50',
        r: '3.936',
        begin: '-0.4166',
      },
      {
        cx: '28.349',
        cy: '37.5',
        r: '4.602',
        begin: '-0.3333',
      },
      {
        cx: '37.5',
        cy: '28.349',
        r: '4.731',
        begin: '-0.25',
      },
      {
        cx: '50',
        cy: '25',
        r: '4.064',
        begin: '-0.1666',
      },
      {
        cx: '62.5',
        cy: '28.349',
        r: '3.398',
        begin: '-0.0833',
      },
      {
        cx: '71.651',
        cy: '37.5',
        r: '3',
        begin: '0',
      },
    ]

    var getAttributes = function(r) {
      return {
        attributeName: r ? 'r' : 'fill',
        values: r
          ? '3;3;5;3;3'
          : s + ';' + s + ';' + p + ';' + s + ';' + s + ';',
        repeatCount: 'indefinite',
        dur: '1s',
      }
    }

    return React__default.createElement(
      themeUi.Box,
      Object.assign(
        {},
        {
          as: 'svg',
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 100 100',
          sx: {
            height: size,
            width: size,
          },
        },
        props
      ),
      points.map(function(ref, index) {
        var cy = ref.cy
        var cx = ref.cx
        var r = ref.r
        var begin = ref.begin
        return React__default.createElement(
          'circle',
          {
            key: index,
            cx: cx,
            cy: cy,
            fill: secondary,
            r: r,
          },
          React__default.createElement(
            'animate',
            Object.assign({}, getAttributes(true), {
              begin: begin,
            })
          ),
          React__default.createElement(
            'animate',
            Object.assign({}, getAttributes(false), {
              begin: begin,
            })
          )
        )
      })
    )
  }

  var responsiveStyles = function(ref) {
    var isVertical = ref.isVertical
    var navPosition = ref.navPosition
    var navStack = ref.navStack
    var navScroll = ref.navScroll
    var breakIndex = ref.breakIndex
    var shared = {
      overflowX: navScroll ? 'scroll' : null,
      flexWrap: navStack ? 'wrap' : 'nowrap',
      button: {
        flex:
          navScroll && makerUi.setBreakpoint(breakIndex, ['1 0 auto', 'none']),
      },
    }

    if (isVertical) {
      return Object.assign(
        {},
        {
          flexDirection: navStack
            ? makerUi.setBreakpoint(breakIndex, ['column', 'row'])
            : 'row',
          order: navPosition === 'top' ? 1 : 2,
        },
        shared
      )
    }

    return Object.assign(
      {},
      {
        flexDirection: navStack
          ? 'column'
          : makerUi.setBreakpoint(breakIndex, ['row', 'column']),
        order: navPosition === 'left' ? 1 : 2,
      },
      shared
    )
  }

  var TabNavigation = function(ref) {
    var settings = ref.settings
    var ref$1 = useTabs()
    var state = ref$1.state
    var setActive = ref$1.setActive
    return React__default.createElement(
      themeUi.Flex,
      {
        variant: state.variant + '.list',
        className: 'tabs-list',
        role: 'tablist',
        sx: responsiveStyles(settings),
      },
      state.tabs.map(function(item) {
        return React__default.createElement(
          themeUi.Box,
          {
            key: item.id,
            as: 'button',
            variant: state.variant + '.button',
            className:
              state.activeId === item.id
                ? 'active-tab tabs-button'
                : 'tabs-button',
            role: 'tab',
            disabled: item.disabled,
            title: item.title,
            'aria-controls': item.id,
            'aria-selected': state.activeId === item.id ? 'true' : 'false',
            onClick: function(e) {
              return setActive(item.id)
            },
          },
          item.title
        )
      })
    )
  }

  function objectWithoutProperties$7(obj, exclude) {
    var target = {}

    for (var k in obj) {
      if (
        Object.prototype.hasOwnProperty.call(obj, k) &&
        exclude.indexOf(k) === -1
      ) {
        target[k] = obj[k]
      }
    }

    return target
  }

  var TabContext = React__default.createContext()
  var TabUpdateContext = React__default.createContext() // TODO - Allow users to inject non Tab components into tab canvas (npm website for example)
  // TODO - expose the tab controls to outside components / actions (add optional event key)

  var TabGroup = function(ref) {
    var variant = ref.variant
    if (variant === void 0) {
      variant = 'tabs'
    }
    var navPosition = ref.navPosition
    if (navPosition === void 0) {
      navPosition = 'top'
    }
    var navStack = ref.navStack
    if (navStack === void 0) {
      navStack = false
    }
    var navScroll = ref.navScroll
    if (navScroll === void 0) {
      navScroll = true
    }
    var breakIndex = ref.breakIndex
    if (breakIndex === void 0) {
      breakIndex = 0
    }
    var renderInactive = ref.renderInactive
    if (renderInactive === void 0) {
      renderInactive = false
    }
    var children = ref.children
    var rest = objectWithoutProperties$7(ref, [
      'variant',
      'navPosition',
      'navStack',
      'navScroll',
      'breakIndex',
      'renderInactive',
      'children',
    ])
    var props = rest
    var ref$1 = React.useState({
      activeId: 0,
      tabs: [],
      variant: variant,
      renderInactive: renderInactive,
    })
    var state = ref$1[0]
    var setState = ref$1[1]
    var isVertical = !['left', 'right'].includes(navPosition) ? true : false
    React.useEffect(
      function() {
        if (state.activeId === 0 && state.tabs.length) {
          setState(function(s) {
            return Object.assign({}, s, {
              activeId: s.tabs[0].id,
            })
          })
        }
      },
      [state]
    )
    return React__default.createElement(
      TabContext.Provider,
      {
        value: state,
      },
      React__default.createElement(
        TabUpdateContext.Provider,
        {
          value: setState,
        },
        React__default.createElement(
          themeUi.Box,
          Object.assign(
            {},
            {
              variant: variant,
              className: 'tabs',
            },
            props,
            {
              __css: {
                display: makerUi.setBreakpoint(breakIndex, ['block', 'flex']),
                flexDirection: isVertical ? 'column' : null,
                flexWrap: 'wrap',
              },
            }
          ),
          React__default.createElement(TabNavigation, {
            settings: {
              isVertical: isVertical,
              navPosition: navPosition,
              navStack: navStack,
              navScroll: navScroll,
              breakIndex: breakIndex,
            },
          }),
          children
        )
      )
    )
  }

  function useTabs() {
    var state = React.useContext(TabContext)
    var setState = React.useContext(TabUpdateContext)

    if (typeof state === undefined) {
      throw new Error('Tab must be used within a TabGroup component')
    }

    function setActive(id) {
      setState(function(s) {
        return Object.assign({}, s, {
          activeId: id,
        })
      })
    }

    function addToTabGroup(item, isOpen) {
      var exists = state.tabs
        ? state.tabs.find(function(t) {
            return t.id === item.id
          })
        : false

      if (!exists) {
        setState(function(s) {
          return Object.assign({}, s, {
            tabs: s.tabs.concat([item]),
            activeId: isOpen ? item.id : s.activeId,
          })
        })
      }
    }

    return {
      state: state,
      setActive: setActive,
      addToTabGroup: addToTabGroup,
    }
  }

  function objectWithoutProperties$8(obj, exclude) {
    var target = {}

    for (var k in obj) {
      if (
        Object.prototype.hasOwnProperty.call(obj, k) &&
        exclude.indexOf(k) === -1
      ) {
        target[k] = obj[k]
      }
    }

    return target
  }

  var Tab = React__default.forwardRef(function(ref$1, ref) {
    var title = ref$1.title
    var open = ref$1.open
    if (open === void 0) {
      open = false
    }
    var disabled = ref$1.disabled
    if (disabled === void 0) {
      disabled = false
    }
    var rest = objectWithoutProperties$8(ref$1, ['title', 'open', 'disabled'])
    var props = rest
    var ref$2 = React.useState(makerUi.generateId())
    var id = ref$2[0]
    var ref$3 = useTabs()
    var ref$3_state = ref$3.state
    var variant = ref$3_state.variant
    var activeId = ref$3_state.activeId
    var renderInactive = ref$3_state.renderInactive
    var addToTabGroup = ref$3.addToTabGroup
    var tabItem = {
      id: id,
      title: title,
      disabled: disabled,
    }
    React.useEffect(
      function() {
        addToTabGroup(tabItem, open)
      },
      [addToTabGroup, tabItem, open]
    )
    return renderInactive || activeId === id
      ? React__default.createElement(
          themeUi.Box,
          Object.assign(
            {},
            {
              ref: ref,
              id: id,
              className: 'tabs-panel',
              tabIndex: '0',
              role: 'tabpanel',
              variant: variant + '.panel',
              __css: {
                flex: 1,
                order: 1,
                display: renderInactive && activeId !== id ? 'none' : undefined,
              },
            },
            props
          )
        )
      : null
  })

  function objectWithoutProperties$9(obj, exclude) {
    var target = {}

    for (var k in obj) {
      if (
        Object.prototype.hasOwnProperty.call(obj, k) &&
        exclude.indexOf(k) === -1
      ) {
        target[k] = obj[k]
      }
    }

    return target
  }

  var TreeContext = React__default.createContext()
  var TreeItem = React__default.forwardRef(function(ref$1, ref) {
    var text = ref$1.text
    var link = ref$1.link
    var newTab = ref$1.newTab
    var open = ref$1.open
    if (open === void 0) {
      open = false
    }
    var children = ref$1.children
    var rest = objectWithoutProperties$9(ref$1, [
      'text',
      'link',
      'newTab',
      'open',
      'children',
    ])
    var props = rest
    var ref$2 = React.useState(open)
    var isOpen = ref$2[0]
    var setOpen = ref$2[1]
    var ref$3 = React.useContext(TreeContext)
    var clickableText = ref$3.clickableText
    var variant = ref$3.variant
    var collapse = ref$3.collapse
    var expand = ref$3.expand
    var neutral = ref$3.neutral
    var indentation = ref$3.indentation
    var previous = usePrevious(isOpen)
    var ref$4 = useMeasure()
    var bind = ref$4[0]
    var viewHeight = ref$4[1].height
    var ref$5 = reactSpring.useSpring({
      from: {
        height: 0,
      },
      to: {
        height: isOpen ? viewHeight : 0,
      },
    })
    var height = ref$5.height
    return React__default.createElement(
      themeUi.Box,
      {
        ref: ref,
        className: 'tree-item',
        sx: {
          display: link && 'flex',
          alignItems: link && 'center',
          position: 'relative',
          pt: '10px',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          verticalAlign: 'middle',
        },
      },
      React__default.createElement(
        themeUi.Box,
        {
          as: 'button',
          onClick: function() {
            return setOpen(!isOpen)
          },
          variant: variant + '.button',
          'aria-label': text,
          'aria-expanded': isOpen ? 'true' : 'false',
          sx: {
            display: !link && 'flex',
            alignItems: !link && 'center',
            background: 'none',
            border: 'none',
            p: 0,
            mr: '10px',
            cursor: 'pointer',
            color: 'primary',
            svg: {
              height: '16px',
              fill: 'currentColor',
            },
          },
        },
        React__default.createElement(
          themeUi.Box,
          {
            as: 'span',
            variant: variant + '.icon',
            className: 'tree-icon',
            sx: {
              mr: clickableText && !link ? '10px' : undefined,
            },
          },
          children ? (isOpen ? collapse : expand) : neutral
        ),
        clickableText &&
          !link &&
          React__default.createElement(
            themeUi.Box,
            {
              as: 'span',
              variant: variant + '.text',
              className: 'tree-text',
              sx: {
                fontSize: 2,
              },
            },
            text
          )
      ),
      React__default.createElement(
        themeUi.Box,
        Object.assign(
          {},
          {
            as: link ? 'a' : 'span',
            variant: variant + '.text',
            href: link && link,
            target: link && newTab && '_blank',
          },
          props
        ),
        (!clickableText || link) && text
      ),
      React__default.createElement(
        reactSpring.animated.div,
        {
          style: {
            willChange: 'height',
            paddingLeft: indentation,
            overflow: 'hidden',
            height: isOpen && previous === isOpen ? 'auto' : height,
          },
        },
        React__default.createElement(themeUi.Box, bind, children)
      )
    )
  })
  var TreeMenu = React__default.forwardRef(function(ref$1, ref) {
    var variant = ref$1.variant
    if (variant === void 0) {
      variant = 'tree'
    }
    var buttons = ref$1.buttons
    if (buttons === void 0) {
      buttons = {
        expand: React__default.createElement(PlusIcon, null),
        collapse: React__default.createElement(MinusIcon, null),
        neutral: React__default.createElement(ExIcon, null),
      }
    }
    var indentation = ref$1.indentation
    if (indentation === void 0) {
      indentation = '20px'
    }
    var clickableText = ref$1.clickableText
    if (clickableText === void 0) {
      clickableText = false
    }
    var rest = objectWithoutProperties$9(ref$1, [
      'variant',
      'buttons',
      'indentation',
      'clickableText',
    ])
    var props = rest
    var ref$2 = React.useState({
      expand: buttons.expand,
      collapse: buttons.collapse,
      neutral: buttons.neutral,
      clickableText: clickableText,
      indentation: indentation,
      variant: variant,
    })
    var state = ref$2[0]
    return React__default.createElement(
      TreeContext.Provider,
      {
        value: state,
      },
      React__default.createElement(
        themeUi.Box,
        Object.assign(
          {},
          {
            ref: ref,
            variant: variant,
          },
          props
        )
      )
    )
  })
  exports.Accordion = Accordion
  exports.Announcement = Announcement
  exports.CookieNotice = CookieNotice
  exports.FadeBox = FadeBox
  exports.Modal = Modal
  exports.PageTransition = PageTransition
  exports.Popover = Popover
  exports.Spinner = Spinner
  exports.Tab = Tab
  exports.TabGroup = TabGroup
  exports.TreeMenu = TreeMenu
  exports.TreeItem = TreeItem
})
//# sourceMappingURL=index.umd.js.map
