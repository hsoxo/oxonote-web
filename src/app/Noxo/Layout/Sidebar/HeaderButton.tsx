import React from 'react'
import styled from 'styled-components'
import {
  bindPopover,
  bindTrigger,
  usePopupState
} from 'material-ui-popup-state/hooks'
import { Avatar, ListItem, Popover } from '@material-ui/core'
import sagaAction, { useSelector } from '@/store'
import { SAGA_LOGOUT } from '@/store/global/actions'
import { DenseListItem } from '@/components/OxOUI/List'
import { MarginDivider5 } from '@/components/OxOUI/Divider'
import { GlobalState } from '@/types/states'

const HeaderButton = () => {
  const { userInfo }: GlobalState = useSelector(state => state.get('global'))

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'sideHeader'
  })
  return (
    <div>
      <Wrapper {...bindTrigger(popupState)}>
        <SizedAvatar>{userInfo?.username[0].toUpperCase()}</SizedAvatar>
        <div>{`${userInfo?.workspaces[0].name}`}</div>
      </Wrapper>
      <Popover
        {...bindPopover(popupState)}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 45, left: 20 }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <PopoverInnerBox>
          <ListItem style={{ height: 50 }}></ListItem>
          <MarginDivider5 />
          <DenseListItem
            button
            style={{ fontSize: 12 }}
            onClick={() => sagaAction({ type: SAGA_LOGOUT })}
          >
            {`Log out (${userInfo?.email})`}
          </DenseListItem>
        </PopoverInnerBox>
      </Popover>
    </div>
  )
}

const PopoverInnerBox = styled.div`
  padding: 5px 0;
  width: 240px;
`
const SizedAvatar = styled(Avatar)`
  width: 24px;
  height: 24px;
  font-size: 0.9rem;
  margin-right: 5px;
`
const Wrapper = styled.div`
  height: 48px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  color: var(--primary-color);
  font-size: x-large;
  font-family: 'SwankyandMooMoo';
  text-align: center;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    cursor: pointer;
  }
`

export default HeaderButton
