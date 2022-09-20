import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBody.css";
import { getCars } from "../../api/carsApi";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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

function getPriceNameStyles(price, brandPrice, theme) {
  return {
    fontWeight:
      brandPrice.indexOf(price) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const SearchBody = ({
  searchItems,
  brandName,
  brandYear,
  brandColor,
  searchModel,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [carsDataApi, setCarsDataApi] = useState([]);
  const [loadMore, setLoadMore] = useState(6);
  const [priceName, setPriceName] = useState([]);
  const [priceCounter, setPriceCounter] = useState(5);

  const loadMoreData = () => {
    setLoadMore(loadMore + 3);
  };

  const brandPriceChange = (event) => {
    setPriceName(event.target.value);
  };

  const showCarDetails = (item) => {
    console.log(item.id);
    navigate(`/view/${item.id}`);
  };

  useEffect(() => {
    getCars()
      .then((res) => {
        console.log(res.data.cars);
        setCarsDataApi(res.data.cars);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box style={{ margin: "32px" }} sx={{ flexGrow: 1 }}>
      <div className="soart__container">
        <FormControl sx={{ m: 1, width: 200 }}>
          <InputLabel id="demo-multiple-name-label">Soartby Price</InputLabel>
          <Select
            MenuProps={MenuProps}
            id="demo-multiple-name"
            value={priceName}
            onChange={brandPriceChange}
            input={<OutlinedInput label="Choose Price" />}
          >
            {carsDataApi
              .filter((item, index) => index < priceCounter)
              .map((price) => {
                return (
                  <MenuItem
                    key={price.id}
                    value={price.price}
                    style={getPriceNameStyles(price, priceName, theme)}
                  >
                    {price.price}
                  </MenuItem>
                );
              })}
            <Button
              variant="contained"
              className="showmore__btn"
              onClick={() => setPriceCounter(priceCounter + 5)}
            >
              ShowMore
            </Button>
          </Select>
        </FormControl>
      </div>
      <Grid
        container
        spacing={{ xs: 1, md: 3 }}
        columns={{ xs: 1, sm: 8, md: 12 }}
      >
        {carsDataApi
          .filter((item, index) => {
            return index < loadMore;
          })
          .filter(
            (s) =>
              s.car.toLowerCase().includes(searchItems) ||
              s.car_model_year.toString().includes(searchItems) ||
              s.price.toLowerCase().includes(searchItems)
          )
          .filter((s) => s.car_model.toLowerCase().includes(searchModel))
          .filter((s) => s.car.includes(brandName))
          .filter((s) => s.car_model_year.toString().includes(brandYear))
          .filter((s) => s.car_color.includes(brandColor))
          .filter((s) => s.price.includes(priceName))
          .map((item, key) => {
            return (
              <Grid key={item.id} item xs={2} sm={4} md={4}>
                <Item className="item__classname">
                  <div className="title">
                    <h1>{item.car}</h1>
                    <div>
                      <span>Make Year : {item.car_model_year}</span>
                    </div>
                    <div className="cars__images">
                      <img
                        width={"75%"}
                        src="https://images.garipoint.com/images/vehicle_notavailable.jpg"
                        alt="not__found"
                      />
                    </div>
                    <div className="price__btn-viewmore">
                      <h1>{item.price}</h1>
                      <Button
                        onClick={() => showCarDetails(item)}
                        variant="contained"
                        className="btn__primary"
                      >
                        View More Details
                      </Button>
                    </div>
                  </div>
                </Item>
              </Grid>
            );
          })}
      </Grid>
      {window.addEventListener("scroll", loadMoreData)}
    </Box>
  );
};

export default SearchBody;
