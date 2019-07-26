/** @jsx jsx */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';

const TabBar = props => {
  const { backgroundColor, borderTop, boxShadow } = props;

  return (
    <div
      {...props}
      sx={{
        display: ['block', 'none'],
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        overflowX: 'scroll',
        p: 2,
        bg: backgroundColor || 'bg_tabbar',
        borderTop: borderTop || 'tabbar',
        boxShadow: boxShadow || 'tabbar'
      }}
    />
  );
};

TabBar.propTypes = {
  backgroundColor: PropTypes.string,
  boxShadow: PropTypes.string,
  borderTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired
};

export default TabBar;
