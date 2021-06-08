import * as React from 'react'
import { Div, DivProps, mergeSelectors } from 'maker-ui'
import { MinusIcon, PlusIcon, ExIcon } from '../icons'

import { TreeContext, TreeContextProps } from './TreeContext'
import { TreeItem } from './TreeItem'

interface TreeMenuProps extends TreeContextProps, DivProps {}

/**
 * The `TreeMenu` wraps all child `TreeItem` components to control the styles
 * and behaviors for all nested expanded or collapsed states.
 *
 * @link https://maker-ui.com/docs/components/tree-menu
 */

export const TreeMenu = ({
  buttons = {
    expand: <PlusIcon />,
    collapse: <MinusIcon />,
    neutral: <ExIcon />,
  },
  indentation = '20px',
  clickableText = false,
  className,
  css,
  ...props
}: TreeMenuProps) => {
  return (
    <TreeContext
      buttons={buttons}
      indentation={indentation}
      clickableText={clickableText}>
      <Div
        className={mergeSelectors(['tree-menu', className])}
        css={{ ...(css as object) }}
        {...props}
      />
    </TreeContext>
  )
}

TreeMenu.displayName = 'TreeMenu'
TreeMenu.Item = TreeItem
