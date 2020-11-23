import * as React from 'react'
import { Div, DivProps } from 'maker-ui'
import { MinusIcon, PlusIcon, ExIcon } from '../icons'

import { TreeContext, TreeContextProps } from './TreeContext'
import { TreeItem } from './TreeItem'

interface TreeMenuProps
  extends TreeContextProps,
    Omit<DivProps, 'children' | 'variant'> {}

/**
 * The `TreeMenu` wraps all child `TreeItem` components to control the styles
 * and behaviors for all nested expanded or collapsed states.
 *
 * @see https://maker-ui.com/docs/components/tree-menu
 */

export const TreeMenu = ({
  variant = 'tree',
  buttons = {
    expand: <PlusIcon />,
    collapse: <MinusIcon />,
    neutral: <ExIcon />,
  },
  indentation = '20px', // Note for Docs - can be responsive array
  clickableText = false,
  sx,
  ...props
}: TreeMenuProps) => {
  return (
    <TreeContext
      variant={variant}
      buttons={buttons}
      indentation={indentation}
      clickableText={clickableText}>
      {/* @ts-ignore */}
      <Div sx={{ variant, ...sx }} {...props} />
    </TreeContext>
  )
}

TreeMenu.displayName = 'TreeMenu'
TreeMenu.Item = TreeItem
