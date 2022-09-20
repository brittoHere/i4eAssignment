import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import contextApi from "../../Context/contextApi";
import RemoveIcon from "@mui/icons-material/Remove";
import "./SideBar.css";
import { getCars } from "../../api/carsApi";

//-----Dropdown mui style-----
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

function getBrandNameStyles(name, brandName, theme) {
  return {
    fontWeight:
      brandName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function getBrandYearStyles(name, brandYear, theme) {
  return {
    fontWeight:
      brandYear.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function getBrandColorStyles(name, brandColor, theme) {
  return {
    fontWeight:
      brandColor.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const SideBar = () => {
  //----style and dropdown logic-----
  const theme = useTheme();
  const {
    brandName,
    setBrandName,
    brandYear,
    setBrandYear,
    brandColor,
    setBrandColor,
    searchModel,
    setSearchModel,
  } = useContext(contextApi);

  const [brandNameCounter, setBrandNameCounter] = useState(5);
  const [brandYearCounter, setBrandYearCounter] = useState(5);
  const [brandColorCounter, setBrandColorCounter] = useState(5);

  const [carsDataApi, setCarsDataApi] = useState([]);

  useEffect(() => {
    getCars()
      .then((res) => {
        setCarsDataApi(res.data.cars);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let names = [];

  carsDataApi.map((res, key) => {
    return names.push(res.car);
  });

  let year = [];

  carsDataApi.map((res, key) => {
    return year.push(res.car_model_year);
  });

  let color = [];

  carsDataApi.map((res, key) => {
    return color.push(res.car_color);
  });

  //----functionality of dropdown-----
  const brandNameChange = (event) => {
    setBrandName(event.target.value);
  };

  const brandYearChange = (event) => {
    setBrandYear(event.target.value.toString());
  };

  const brandColorChange = (event) => {
    setBrandColor(event.target.value);
  };

  //----Hooks for hide and show plus and minus icon------

  const [brandNameRightIcon, setBrandNameRightIcon] = useState(true);
  const [yearRightIcon, setYearRightIcon] = useState(true);
  const [colorRightIcon, setColorRightIcon] = useState(true);

  //----brandname close and bar icons hide and show----
  const brandNameHideShowIcon = () => {
    setBrandNameRightIcon(false);
  };
  const brandNameHideShowCloseIcon = () => {
    setBrandNameRightIcon(true);
  };

  //----brandyear close and bar icons hide and show----
  const brandYearHideShowIcon = () => {
    setYearRightIcon(false);
  };
  const brandYearHideShowCloseIcon = () => {
    setYearRightIcon(true);
  };

  //-----brandcolor close and bar icons hide and show-----
  const brandColorHideShowIcon = () => {
    setColorRightIcon(false);
  };
  const brandColorHideShowCloseIcon = () => {
    setColorRightIcon(true);
  };

  return (
    <div className="sidebar__container">
      <div className="search__model">
        <TextField
          label="Search Model"
          value={searchModel}
          onChange={(e) => setSearchModel(e.target.value)}
        />
      </div>
      <hr style={{ border: "1px solid #EEEEEE" }} />

      {brandNameRightIcon ? (
        <div
          className="budget__add-icon"
          onClick={() => brandNameHideShowIcon()}
        >
          <span className="budget__title">BrandName</span>
          <ControlPointIcon className="right__icon" />
        </div>
      ) : (
        <div
          className="budget__add-icon"
          onClick={() => brandNameHideShowCloseIcon()}
        >
          <span className="budget__title">BrandName</span>
          <RemoveIcon className="right__icon" />
        </div>
      )}

      {brandNameRightIcon ? null : (
        <div className="dropdown__container">
          <FormControl sx={{ m: 1, width: 200 }}>
            <InputLabel id="demo-multiple-name-label">BrandName</InputLabel>
            <Select
              id="demo-multiple-name"
              value={brandName}
              onChange={brandNameChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {names
                .filter((item, index) => index < brandNameCounter)
                .map((name) => {
                  return (
                    <MenuItem
                      key={name.id}
                      value={name}
                      style={getBrandNameStyles(name, brandName, theme)}
                    >
                      {name}
                    </MenuItem>
                  );
                })}
              <Button
                variant="contained"
                className="showmore__btn"
                onClick={() => setBrandNameCounter(brandNameCounter + 5)}
              >
                ShowMore
              </Button>
            </Select>
          </FormControl>
        </div>
      )}

      {yearRightIcon ? (
        <div
          className="budget__add-icon"
          onClick={() => brandYearHideShowIcon()}
        >
          <span className="budget__title">BrandYear</span>
          <ControlPointIcon className="right__icon" />
        </div>
      ) : (
        <div
          className="budget__add-icon"
          onClick={() => brandYearHideShowCloseIcon()}
        >
          <span className="budget__title">BrandYear</span>
          <RemoveIcon className="right__icon" />
        </div>
      )}

      {yearRightIcon ? null : (
        <div className="dropdown__container">
          <FormControl sx={{ m: 1, width: 200 }}>
            <InputLabel id="demo-multiple-name-label">BrandYear</InputLabel>
            <Select
              id="demo-multiple-name"
              value={brandYear}
              onChange={brandYearChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {year
                .filter((item, index) => index < brandYearCounter)
                .map((year) => {
                  return (
                    <MenuItem
                      key={year.id}
                      value={year}
                      style={getBrandYearStyles(year, brandYear, theme)}
                    >
                      {year}
                    </MenuItem>
                  );
                })}
              <Button
                variant="contained"
                className="showmore__btn"
                onClick={() => setBrandYearCounter(brandNameCounter + 5)}
              >
                ShowMore
              </Button>
            </Select>
          </FormControl>
        </div>
      )}

      {colorRightIcon ? (
        <div
          className="budget__add-icon"
          onClick={() => brandColorHideShowIcon()}
        >
          <span className="budget__title">BrandColor</span>
          <ControlPointIcon className="right__icon" />
        </div>
      ) : (
        <div
          className="budget__add-icon"
          onClick={() => brandColorHideShowCloseIcon()}
        >
          <span className="budget__title">BrandColor</span>
          <RemoveIcon className="right__icon" />
        </div>
      )}

      {colorRightIcon ? null : (
        <div className="dropdown__container">
          <FormControl sx={{ m: 1, width: 200 }}>
            <InputLabel id="demo-multiple-name-label">BrandColor</InputLabel>
            <Select
              id="demo-multiple-name"
              value={brandColor}
              onChange={brandColorChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {color
                .filter((item, index) => index < brandColorCounter)
                .map((color) => {
                  return (
                    <MenuItem
                      key={color.id}
                      value={color}
                      style={getBrandColorStyles(color, brandColor, theme)}
                    >
                      {color}
                    </MenuItem>
                  );
                })}
              <Button
                variant="contained"
                className="showmore__btn"
                onClick={() => setBrandColorCounter(brandNameCounter + 5)}
              >
                ShowMore
              </Button>
            </Select>
          </FormControl>
        </div>
      )}
    </div>
  );
};

export default SideBar;
