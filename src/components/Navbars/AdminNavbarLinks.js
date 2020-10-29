import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// @material-ui/core components
import { makeStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import User from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

import { logout } from '../../views/Auth/authActions';

export default function AdminNavbarLinks() {
  const [anchorEl, setAnchorEl] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleOpenClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick = (event) => {
    dispatch(logout());
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  return (
    <div>
      <span className={classes.userName}>{user.name}</span>
      <IconButton className={classes.margin} onClick={handleOpenClick}>
        <User />
      </IconButton>
      <StyledMenu
        id="simple-menu"
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <div className={classes.menu}>
            <div
              className={classes.itemsMenu}
            >{`${user.name} ${user.lastName}`}</div>
            <div className={classes.itemsMenu}>{user.email}</div>
          </div>
        </MenuItem>
        <Divider light />
        <MenuItem onClick={handleClick}>Sair</MenuItem>
      </StyledMenu>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    marginRight: '0px',
    marginLeft: '0px',
  },
  extendedIcon: {
    marginRight: theme.spacing(0),
  },
  userName: {
    fontSize: '0.8rem',
    alignItems: 'center',
    paddingRight: '0px',
    color: '#34495e',
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'flex-start',
    padding: '5px 0px 20px',
  },
  itemsMenu: {
    fontWeight: '300',
    fontSize: '0.8em',
    color: '#4b6584',
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));
