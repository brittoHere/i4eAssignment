import React, { useState } from "react";
import contextApi from "../Context/contextApi";
import {
  HeaderComponent,
  SideBarComponent,
  SearchBodyComponent,
} from "../Components";

const SearchScreen = () => {
  const [bar, setBar] = useState(true);
  const [searchItems, setSearchItems] = useState("");
  const [searchModel, setSearchModel] = useState("");
  const [brandName, setBrandName] = useState([]);
  const [brandYear, setBrandYear] = useState([]);
  const [brandColor, setBrandColor] = useState([]);

  return (
    <contextApi.Provider
      value={{
        bar,
        setBar,
        searchItems,
        setSearchItems,
        searchModel,
        setSearchModel,
        brandName,
        setBrandName,
        brandYear,
        setBrandYear,
        brandColor,
        setBrandColor,
      }}
    >
      <HeaderComponent />
      {bar ? null : <SideBarComponent />}
      <SearchBodyComponent
        searchModel={searchModel}
        brandName={brandName}
        brandYear={brandYear}
        brandColor={brandColor}
        searchItems={searchItems}
      />
    </contextApi.Provider>
  );
};

export default SearchScreen;
