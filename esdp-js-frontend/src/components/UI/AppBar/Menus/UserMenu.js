import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import config from "../../../../config";
import AccountCircle from '@material-ui/icons/AccountCircle';

export default function UserMenu(props) {
  return (
    <IconButton
      edge="end"
      aria-owns={props.isMenuOpen ? 'material-appbar' : undefined}
      aria-haspopup="true"
      onClick={props.handleProfileMenuOpen}
      color="inherit"
    >
      {props.user.avatarImage
        ?
        <Avatar alt="avatarImage" src={!props.user.facebookId
          ? `${config.apiURL}/uploads/${props.user.avatarImage}`
          : props.user.avatarImage} className={props.avatar} />
        :
        <AccountCircle />}
    </IconButton>
  )
}
