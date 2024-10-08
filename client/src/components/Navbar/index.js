import { Menu, MoreVert } from '@mui/icons-material'
import { AppBar, Box, IconButton, Toolbar } from '@mui/material'
import * as React from 'react'
import { LoginContext } from '../../context'
import { Consume } from '../../context/Consumer'
import Drawer from './Drawer'

function BottomAppBar({ fwdRef }) {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  let drawerProps = { open, handleClose, handleOpen }

  // const renderAddButton = () => {
  //   const pulseValue =
  //     path == '/'
  //       ? GroupData?.data?.items?.length
  //       : MemberData?.data?.items?.length

  //   let fabProps = {
  //     Icon: Add,
  //     pulseValue,
  //     handler: () => history.push(`${toPath}/add`),
  //   }

  //   return renderVal && <FabComp {...fabProps} />
  // }
  return (
    <React.Fragment>
      <AppBar position='fixed' color='primary' sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar ref={fwdRef}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleOpen}
          >
            <Menu />
          </IconButton>
          {/* {renderAddButton()} */}
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color='inherit'>
            <MoreVert />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer {...drawerProps} />
    </React.Fragment>
  )
}

export default Consume(BottomAppBar, [LoginContext])
