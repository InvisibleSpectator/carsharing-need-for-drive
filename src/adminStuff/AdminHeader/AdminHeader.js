import React from "react";
import "./AdminHeader.scss";
import avatar from "../../assets/icons/user-avatar.png";

class AdminHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { drawerIsOpened: false };
  }

  toggleDrawer = () => {
    this.setState((state) => ({ drawerIsOpened: !state.drawerIsOpened }));
  };

  render = () => {
    return (
      <header className="AdminHeader">
        <div className="AdminHeader-SearchBar" />
        <div className="AdminHeader-Notification">
          <div className="AdminHeader-Notification-Count">{1}</div>
        </div>
        <div className="AdminHeader-Profile">
          <img
            src={avatar}
            alt="avatar"
            className="AdminHeader-Profile-Avatar"
          />
          <span className="AdminHeader-Profile-Name">Admin</span>
          <div
            onClick={this.toggleDrawer}
            className={`AdminHeader-Profile-ToggleButton ${
              this.state.drawerIsOpened
                ? "AdminHeader-Profile-ToggleButton_isOpened"
                : ""
            }`}
          />
          <div
            className={`AdminHeader-Profile-Drawer ${
              this.state.drawerIsOpened
                ? "AdminHeader-Profile-Drawer_isOpened"
                : ""
            }`}
           />
        </div>
      </header>
    );
  };
}

export default AdminHeader;
