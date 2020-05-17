import styled from 'styled-components'
import { Box, ListItem } from '@material-ui/core'

export const DenseListItem = styled(ListItem)`
  height: 1.8rem;
  font-size: 0.9rem;
  color: var(--secondary-text);
`

export const DenseListItemBox = styled(Box)`
  height: 1.8rem;
  font-size: 0.9rem;
  color: var(--secondary-text);
  width: 100%;
  display: flex;
  position: relative;
  box-sizing: border-box;
  text-align: left;
  align-items: center;
  padding: 0.5rem 0.8rem;
  justify-content: flex-start;
  text-decoration: none;
  -webkit-user-select: none;
  user-select: none;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`

export const DenseListItemBoxNoHover = styled(Box)`
  height: 1.8rem;
  font-size: 0.9rem;
  color: var(--secondary-text);
  width: 100%;
  display: flex;
  position: relative;
  box-sizing: border-box;
  text-align: left;
  align-items: center;
  padding: 0.5rem 0.8rem;
  justify-content: flex-start;
  text-decoration: none;
  -webkit-user-select: none;
  user-select: none;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`

export const DenseListItemHeader = styled(Box)`
  height: 1.8rem;
  font-size: 0.7rem;
  color: var(--secondary-text);
  width: 100%;
  display: flex;
  position: relative;
  box-sizing: border-box;
  text-align: left;
  align-items: center;
  padding: 0.5rem 0.8rem;
  justify-content: flex-start;
  text-decoration: none;
  -webkit-user-select: none;
  user-select: none;
`

export const DenseListItemIcon = styled(Box)`
  min-width: 1.5rem;
  font-size: 1.2rem;
  display: flex;
`
