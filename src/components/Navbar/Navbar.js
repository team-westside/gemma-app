import React from "react";
import logoname from "../../assets/logoname.svg";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import WalletCard from "../WalletCard/WalletCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
// import PersonAdd from "@mui/icons-material/PersonAdd";
// import Settings from "@mui/icons-material/Settings";
// import Logout from "@mui/icons-material/Logout";

const Navbar = () => {
  const items = ["High Jewellery", "Fine Jewellery", "Wedding Jewellery"];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="w-[100vw] bg-white text-black flex flex-row justify-between py-4 px-10 items-center">
        <div className="max-w-[14vw]">
          <img src={logoname.src} alt="logo" className="object-contain" />
        </div>
        <div className="flex flex-row justify-evenly gap-x-10">
          {items.map((item) => {
            return (
              <div className="text-lg transition-all hover:text-[#F9A826] cursor-pointer">
                {item}
              </div>
            );
          })}
        </div>

        <div className="flex flex-row justify-evenly gap-x-3 items-center">
          {/* <WalletCard /> */}
          <React.Fragment>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                padding: 0,
              }}
            >
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{
                    ml: 2,
                  }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      backgroundColor: loggedIn ? "#A5CC82" : "#FF0000",
                    }}
                  >
                    <FaUser className="text-2xl cursor-pointer transition-all" />
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  padding: "10px 10px",
                  position: "relative",
                  width: "max-content",
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <WalletCard setLoggedIn={setLoggedIn} />
              <MenuItem>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem>
                <Avatar /> My account
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  {/* <PersonAdd fontSize="small" /> */}
                </ListItemIcon>
                Add another account
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  {/* <Settings fontSize="small" /> */}
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem>
                <ListItemIcon>{/* <Logout fontSize="small" /> */}</ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </React.Fragment>
          {/* <FaUser className="text-2xl hover:text-[#F9A826]  cursor-pointer transition-all" /> */}
          <AiFillHeart className="text-2xl hover:text-[#F9A826] cursor-pointer transition-all" />
          <BsCart2 className="text-2xl hover:text-[#F9A826] cursor-pointer transition-all" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
