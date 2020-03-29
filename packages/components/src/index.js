function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var ResizeObserver = _interopDefault(require('resize-observer-polyfill'));
var reactDom = require('react-dom');
var elementsUi = require('elements-ui');
var React = require('react');
var React__default = _interopDefault(React);
var themeUi = require('theme-ui');
var reactSpring = require('react-spring');

function objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }
var AccordionContext = React__default.createContext();
var AccordionUpdateContext = React__default.createContext();

var AccordionGroup = function (ref) {
  var children = ref.children;
  var icon = ref.icon; if ( icon === void 0 ) icon = true;
  var customIcons = ref.customIcons; if ( customIcons === void 0 ) customIcons = {
    expand: null,
    collapse: null
  };
  var defaultKey = ref.defaultKey; if ( defaultKey === void 0 ) defaultKey = 0;
  var single = ref.single; if ( single === void 0 ) single = false;
  var rest = objectWithoutProperties( ref, ["children", "icon", "customIcons", "defaultKey", "single"] );
  var props = rest;

  var ref$1 = React.useState({
    activeKey: defaultKey,
    icon: icon,
    customIcons: customIcons,
    single: single
  });
  var state = ref$1[0];
  var setState = ref$1[1];
  return React__default.createElement( AccordionContext.Provider, { value: state },
      React__default.createElement( AccordionUpdateContext.Provider, { value: setState },
        React__default.createElement( themeUi.Box, props, children)
      )
    );
};

function useAccordion() {
  var state = React.useContext(AccordionContext);
  var setState = React.useContext(AccordionUpdateContext);

  if (typeof state === undefined) {
    throw new Error('Accordion must be used within an AccordionGroup component');
  }

  return [state, setState];
}

function usePrevious(value) {
  var ref = React.useRef();
  React.useEffect(function () { return void (ref.current = value); }, [value]);
  return ref.current;
}
function useMeasure() {
  var ref = React.useRef();
  var ref$1 = React.useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0
  });
  var bounds = ref$1[0];
  var set = ref$1[1];
  var ref$2 = React.useState(function () { return new ResizeObserver(function (ref) {
    var entry = ref[0];

    return set(entry.contentRect);
    }); });
  var ro = ref$2[0];
  React.useEffect(function () {
    if (ref.current) { ro.observe(ref.current); }
    return function () { return ro.disconnect(); };
  }, [ro]);
  return [{
    ref: ref
  }, bounds];
}

function objectWithoutProperties$1 (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }
var Accordion = React__default.forwardRef(function (ref$1, ref) {
  var title = ref$1.title;
  var open = ref$1.open; if ( open === void 0 ) open = false;
  var eventKey = ref$1.eventKey;
  var variant = ref$1.variant; if ( variant === void 0 ) variant = 'accordion';
  var borderColor = ref$1.borderColor; if ( borderColor === void 0 ) borderColor = '#dedede';
  var children = ref$1.children;
  var className = ref$1.className; if ( className === void 0 ) className = '';
  var rest = objectWithoutProperties$1( ref$1, ["title", "open", "eventKey", "variant", "borderColor", "children", "className"] );
  var props = rest;

  var ref$2 = useAccordion();
  var state = ref$2[0];
  var setState = ref$2[1];
  var ref$3 = React.useState(state.single && state.index === eventKey ? true : open);
  var show = ref$3[0];
  var set = ref$3[1];
  var ref$4 = React.useState(elementsUi.generateId());
  var buttonId = ref$4[0];
  var ref$5 = React.useState(elementsUi.generateId());
  var panelId = ref$5[0];
  var ref$6 = useMeasure();
  var bind = ref$6[0];
  var viewHeight = ref$6[1].height;
  React.useEffect(function () {
    if (state.single) {
      return state.activeKey !== eventKey ? set(false) : set(true);
    }
  }, [state, eventKey, set]);
  var ref$7 = reactSpring.useSpring({
    from: {
      height: 0
    },
    to: {
      height: show ? viewHeight : 0
    }
  });
  var height = ref$7.height;

  var setActive = function () { return !show && state.single ? setState(function (s) { return (Object.assign({}, s,
    {activeKey: eventKey})); }) : set(!show); };

  return React__default.createElement( themeUi.Box, Object.assign({}, { ref: ref, variant: variant, className: ((show ? 'expanded ' : '') + "accordion " + className) }, props, { __css: {
    border: "1px solid"
  } }),
        React__default.createElement( themeUi.Box, { as: "button", title: ((show ? 'Collapse' : 'Expand') + " content"), id: buttonId, 'aria-expanded': show ? 'true' : 'false', 'aria-controls': panelId, className: ((show ? 'active ' : '') + "accordion-toggle"), variant: (variant + ".toggle"), onClick: setActive, sx: {
      display: 'flex',
      justifyContent: state.icon ? 'space-between' : 'flex-start',
      alignItems: 'center',
      width: '100%',
      border: 'none',
      p: 3,
      cursor: 'pointer'
    } },
          React__default.createElement( 'span', null, title ),
          state.icon && React__default.createElement( 'span', null,
              state.customIcons.expand !== null ? show ? state.customIcons.collapse : state.customIcons.expand : React__default.createElement( themeUi.Box, { as: "svg", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", sx: {
          width: 15,
          transition: 'all ease .3s',
          transform: !show ? 'rotate(0)' : 'rotate(180deg)'
        } },
                  React__default.createElement( 'path', { fill: "none", stroke: "currentColor", strokeMiterlimit: "10", strokeWidth: "2", d: "M21 8.5l-9 9-9-9" })
                )
            )
        ),
        React__default.createElement( reactSpring.animated.div, { id: panelId, role: "region", 'aria-labelledby': buttonId, style: {
      willChange: 'height',
      overflow: 'hidden',
      height: height
    } },
          React__default.createElement( themeUi.Box, bind,
            React__default.createElement( themeUi.Box, { className: "accordion-panel", variant: (variant + ".panel"), sx: {
          borderTop: ("1px solid " + borderColor)
        } },
              children
            )
          )
        )
      );
});

var MinusIcon = function (props) { return React__default.createElement( 'svg', Object.assign({}, props, { viewBox: "64 -65 897 897" }),
    React__default.createElement( 'g', null,
      React__default.createElement( 'path', { d: "M888 760v0v0v-753v0h-752v0v753v0h752zM888 832h-752q-30 0 -51 -21t-21 -51v-753q0 -29 21 -50.5t51 -21.5h753q29 0 50.5 21.5t21.5 50.5v753q0 30 -21.5 51t-51.5 21v0zM732 347h-442q-14 0 -25 10.5t-11 25.5v0q0 15 11 25.5t25 10.5h442q14 0 25 -10.5t11 -25.5v0 q0 -15 -11 -25.5t-25 -10.5z" })
    )
  ); };
var PlusIcon = function (props) { return React__default.createElement( 'svg', Object.assign({}, props, { viewBox: "64 -65 897 897" }),
    React__default.createElement( 'g', null,
      React__default.createElement( 'path', { d: "M888 760v0v0v-753v0h-752v0v753v0h752zM888 832h-752q-30 0 -51 -21t-21 -51v-753q0 -29 21 -50.5t51 -21.5h753q29 0 50.5 21.5t21.5 50.5v753q0 30 -21.5 51t-51.5 21v0zM732 420h-184v183q0 15 -10.5 25.5t-25.5 10.5v0q-14 0 -25 -10.5t-11 -25.5v-183h-184 q-15 0 -25.5 -11t-10.5 -25v0q0 -15 10.5 -25.5t25.5 -10.5h184v-183q0 -15 11 -25.5t25 -10.5v0q15 0 25.5 10.5t10.5 25.5v183h184q15 0 25.5 10.5t10.5 25.5v0q0 14 -10.5 25t-25.5 11z" })
    )
  ); };
var ExIcon = function (props) { return React__default.createElement( 'svg', Object.assign({}, props, { viewBox: "64 -65 897 897" }),
    React__default.createElement( 'g', null,
      React__default.createElement( 'path', { d: "M717.5 589.5q-10.5 10.5 -25.5 10.5t-26 -10l-154 -155l-154 155q-11 10 -26 10t-25.5 -10.5t-10.5 -25.5t11 -25l154 -155l-154 -155q-11 -10 -11 -25t10.5 -25.5t25.5 -10.5t26 10l154 155l154 -155q11 -10 26 -10t25.5 10.5t10.5 25t-11 25.5l-154 155l154 155 q11 10 11 25t-10.5 25.5zM888 760v0v0v-753v0h-752v0v753v0h752zM888 832h-752q-30 0 -51 -21t-21 -51v-753q0 -29 21 -50.5t51 -21.5h753q29 0 50.5 21.5t21.5 50.5v753q0 30 -21.5 51t-51.5 21v0z" })
    )
  ); };
var CloseIcon = function (props) { return React__default.createElement( 'svg', Object.assign({}, props, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" }),
    React__default.createElement( 'path', { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" })
  ); };

function objectWithoutProperties$2 (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }
var Announcement = React__default.forwardRef(function (ref$1, ref) {
  var pathname = ref$1.pathname;
  var urls = ref$1.urls; if ( urls === void 0 ) urls = [];
  var children = ref$1.children;
  var rest = objectWithoutProperties$2( ref$1, ["pathname", "urls", "children"] );
  var props = rest;

  var ref$2 = React.useState(true);
  var set = ref$2[1];
  return urls.includes(pathname) ? React__default.createElement( themeUi.Box, Object.assign({}, { ref: ref }, props, { __css: {} }),
        children,
        React__default.createElement( themeUi.Box, { as: "button", onClick: function (e) { return set(false); }, sx: {
      svg: {
        height: 24,
        fill: 'primary'
      }
    } },
          React__default.createElement( CloseIcon, null )
        )
      ) : null;
});

var CookieNotice = function () {
  return React__default.createElement( 'div', null, "TODO" );
};

function objectWithoutProperties$3 (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }
var focusElements = ['a', 'button:not([disabled])', 'input', 'textarea', 'select', '[tabIndex]:not([tabIndex="-1"])'].join(', ');
var AnimatedBox = reactSpring.animated(themeUi.Box);

var Portal = function (ref) {
  var children = ref.children;
  var root = ref.root;

  var link = document.getElementById(root);
  return reactDom.createPortal(children, link);
};

var position = {
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%'
};

var centered = function (val) { return val ? {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
} : null; };

var Modal = function (ref) {
  var id = ref.id;
  var title = ref.title; if ( title === void 0 ) title = 'Modal Dialog';
  var closeOnBlur = ref.closeOnBlur; if ( closeOnBlur === void 0 ) closeOnBlur = false;
  var show = ref.show;
  var toggle = ref.toggle;
  var focusRef = ref.focusRef;
  var center = ref.center; if ( center === void 0 ) center = false;
  var bg = ref.bg; if ( bg === void 0 ) bg = 'rgba(0, 0, 0, 0.66)';
  var style = ref.style; if ( style === void 0 ) style = {};
  var children = ref.children;
  var rest$1 = objectWithoutProperties$3( ref, ["id", "title", "closeOnBlur", "show", "toggle", "focusRef", "center", "bg", "style", "children"] );
  var rest = rest$1;

  var modalRef = React.useRef(null);
  var ref$1 = React.useState({
    count: 0,
    first: null,
    last: null
  });
  var focusable = ref$1[0];
  var setFocusable = ref$1[1];
  var closeModal = React.useCallback(function () {
    if (focusRef !== undefined) {
      focusRef.current.focus();
    }

    toggle(false);
  }, [toggle, focusRef]);
  var fade = reactSpring.useTransition(show, null, {
    from: {
      opacity: 0
    },
    enter: {
      opacity: 1
    },
    leave: {
      opacity: 0
    }
  }); // Handle Focus

  React.useEffect(function () {
    if (show) {
      var elements = modalRef.current.querySelectorAll(focusElements);
      document.body.style.overflow = 'hidden';

      if (elements.length !== 0) {
        setFocusable({
          count: elements.length,
          elements: elements,
          first: elements[0],
          last: elements[elements.length - 1]
        });
        elements[0].focus();
      } else {
        modalRef.current.focus();
      }
    } else {
      document.body.style.overflow = null;
    }
  }, [show, setFocusable]); // Handle Keyboard

  React.useEffect(function () {
    function handleKeyDown(e) {
      switch (e.keyCode) {
        case 27:
          // esc
          return closeModal();

        case 9:
          // tab
          if (focusable.count <= 1) {
            e.preventDefault();
            return;
          } else {
            if (e.shiftKey && document.activeElement === focusable.first) {
              e.preventDefault();
              return focusable.last.focus();
            }

            if (!e.shiftKey && document.activeElement === focusable.last) {
              e.preventDefault();
              return focusable.first.focus();
            }

            if (![].concat( focusable.elements ).includes(document.activeElement)) {
              return focusable.first.focus();
            }

            return;
          }

        default:
          return;
      }
    }

    if (show) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return function () { return window.removeEventListener("keydown", handleKeyDown); };
  }, [show, focusable, closeModal]);
  return React__default.createElement( Portal, { root: id },
      fade.map(function (ref) {
      var item = ref.item;
      var key = ref.key;
      var props = ref.props;

      return item && React__default.createElement( AnimatedBox, { key: key, ref: modalRef, role: "dialog", 'aria-label': title, 'aria-modal': "true", style: Object.assign({}, style,
      props), tabIndex: focusable.count === 0 ? '0' : undefined, __css: Object.assign({}, position,
      centered(center),
      {zIndex: 100}) },
              React__default.createElement( themeUi.Box, { onClick: function (e) { return closeOnBlur ? closeModal() : null; }, className: "modal-overlay", __css: Object.assign({}, position,
        {zIndex: -1,
        bg: bg}) }),
              React__default.createElement( themeUi.Box, Object.assign({}, { __css: {
        zIndex: 1,
        overflow: 'scroll'
      } }, rest),
                children
              )
            );
  })
    );
};

var OptionsMenu = function () {
  return React__default.createElement( 'div', null, "TODO" );
};

var Subscribe = function () {
  return React__default.createElement( 'div', null, "TODO" );
};

function objectWithoutProperties$4 (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }

var defaults = [1, 2, 3].map(function (i) { return ({
  label: ("Tab " + i),
  ariaLabel: ("Tab " + i),
  component: ("Tab " + i + ": Add text or a custom component")
}); });
var Tabs = React__default.forwardRef(function (ref$1, ref) {
  var items = ref$1.items; if ( items === void 0 ) items = defaults;
  var nav = ref$1.nav; if ( nav === void 0 ) nav = 'top';
  var variant = ref$1.variant; if ( variant === void 0 ) variant = 'tabs';
  var stack = ref$1.stack; if ( stack === void 0 ) stack = false;
  var breakIndex = ref$1.breakIndex; if ( breakIndex === void 0 ) breakIndex = 0;
  var rest = objectWithoutProperties$4( ref$1, ["items", "nav", "variant", "stack", "breakIndex"] );
  var props = rest;

  var ref$2 = React.useState(items[0]);
  var show = ref$2[0];
  var set = ref$2[1];
  var isVertical = nav !== 'left' && nav !== 'right' ? true : false;
  return React__default.createElement( themeUi.Box, Object.assign({}, { ref: ref, variant: variant }, props, { __css: {
    display: elementsUi.setBreakpoint(breakIndex, ['block', 'flex']),
    flexDirection: isVertical ? 'column' : null,
    flexWrap: 'wrap'
  } }),
        React__default.createElement( themeUi.Flex, { variant: (variant + ".navigation"), className: "tabs-navigation", role: "tablist", sx: {
      flexDirection: isVertical ? stack ? elementsUi.setBreakpoint(breakIndex, ['column', 'row']) : 'row' : stack ? 'column' : elementsUi.setBreakpoint(breakIndex, ['row', 'column']),
      overflowX: stack ? null : 'scroll',
      flexWrap: stack ? 'wrap' : 'nowrap',
      order: isVertical ? nav === 'top' ? 1 : 2 : nav === 'left' ? 1 : 2
    } },
          items.map(function (item, index) { return React__default.createElement( themeUi.Button, { key: index, title: item.label, role: "tab", 'aria-label': item.ariaLabel || item.label, 'aria-controls': "tab-panel", 'aria-selected': show === item ? 'true' : 'false', variant: (variant + ".button"), className: show === item ? 'active-tab tabs-button' : 'tabs-button', onClick: function (e) { return set(items[index]); }, sx: {
        flex: stack ? null : '1 0 auto'
      } },
              item.label
            ); })
        ),
        React__default.createElement( themeUi.Box, { id: "tab-panel", role: "tabpanel", 'aria-label': ((show.ariaLabel || show.label) + " Panel"), variant: (variant + ".panel"), className: "tabs-panel", sx: {
      flex: 1,
      order: 1
    } },
          show.component
        )
      );
});

function objectWithoutProperties$5 (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }
var Tree = React__default.memo(function (ref) {
  var children = ref.children;
  var name = ref.name;
  var style = ref.style;
  var open = ref.open; if ( open === void 0 ) open = false;

  var ref$1 = React.useState(open);
  var isOpen = ref$1[0];
  var setOpen = ref$1[1];
  var previous = usePrevious(isOpen);
  var ref$2 = useMeasure();
  var bind = ref$2[0];
  var viewHeight = ref$2[1].height;
  var ref$3 = reactSpring.useSpring({
    from: {
      height: 0
    },
    to: {
      height: isOpen ? viewHeight : 0
    }
  });
  var height = ref$3.height;
  return React__default.createElement( themeUi.Box, { className: "tree-item", sx: {
    position: 'relative',
    pt: '5px',
    pl: '5px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle'
  } },
      React__default.createElement( themeUi.Box, { as: "button", onClick: function () { return setOpen(!isOpen); }, sx: {
      background: 'none',
      border: 'none',
      p: 0,
      mr: '10px',
      cursor: 'pointer',
      color: 'primary',
      svg: {
        height: '16px',
        fill: 'currentColor'
      },
      verticalAlign: 'middle'
    } },
        children ? isOpen ? React__default.createElement( MinusIcon, null ) : React__default.createElement( PlusIcon, null ) : React__default.createElement( ExIcon, null )
      ),
      React__default.createElement( themeUi.Box, { as: "span", style: style },
        name
      ),
      React__default.createElement( reactSpring.animated.div, { style: {
      willChange: 'height',
      paddingLeft: 10,
      overflow: 'hidden',
      height: isOpen && previous === isOpen ? 'auto' : height
    } },
        React__default.createElement( themeUi.Box, bind, children)
      )
    );
});
var TreeMenu = React__default.forwardRef(function (ref$1, ref) {
  var variant = ref$1.variant; if ( variant === void 0 ) variant = 'tree';
  var rest = objectWithoutProperties$5( ref$1, ["variant"] );
  var props = rest;

  return React__default.createElement( themeUi.Box, Object.assign({}, { ref: ref, variant: variant }, props),
      React__default.createElement( Tree, { name: "main", open: true },
        React__default.createElement( Tree, { name: "hello" }),
        React__default.createElement( Tree, { name: "subtree with children" },
          React__default.createElement( Tree, { name: "hello" }),
          React__default.createElement( Tree, { name: "sub-subtree with children" },
            React__default.createElement( Tree, { name: "child 1" }),
            React__default.createElement( Tree, { name: "child 2" }),
            React__default.createElement( Tree, { name: "child 3" }),
            React__default.createElement( Tree, { name: "custom content" },
              React__default.createElement( 'div', null, "Test!" )
            )
          ),
          React__default.createElement( Tree, { name: "hello" })
        ),
        React__default.createElement( Tree, { name: "world" }),
        React__default.createElement( Tree, { name: React__default.createElement( 'span', null, "something something" ) })
      )
    );
});

exports.Accordion = Accordion;
exports.AccordionGroup = AccordionGroup;
exports.Announcement = Announcement;
exports.CookieNotice = CookieNotice;
exports.Modal = Modal;
exports.OptionsMenu = OptionsMenu;
exports.Subscribe = Subscribe;
exports.Tabs = Tabs;
exports.TreeMenu = TreeMenu;
//# sourceMappingURL=index.js.map
