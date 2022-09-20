import React, { useContext } from "react";
import { Box, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import contextApi from "../../Context/contextApi";
import HorizontalSplitIcon from "@mui/icons-material/HorizontalSplit";

import "./Header.css";

const Header = () => {
  const { bar, setBar, setSearchItems, disableBar } = useContext(contextApi);
  const showSideBar = () => {
    setBar(false);
  };
  const showCloseIcon = () => {
    setBar(true);
  };
  return (
    <>
      <div className="header__searchbar__brandname">
        <h1 className="menu__icon">
          {bar ? (
            <HorizontalSplitIcon
              onClick={() => showSideBar()}
              className={disableBar ? "disable__bars" : "bars"}
            />
          ) : (
            <CloseIcon
              onClick={() => showCloseIcon()}
              className={disableBar ? "disable__bars" : "bars"}
            />
          )}
        </h1>
        <h1 className="brand__title">CARZOID</h1>
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <TextField
            className="search__field"
            id="input-with-icon-textfield"
            onChange={(e) => setSearchItems(e.target.value)}
            label="Search Cars....."
          />
        </Box>
      </div>
    </>
  );
};

export default Header;
