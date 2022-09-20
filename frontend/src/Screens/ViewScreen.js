import React, { useState } from "react";
import { HeaderComponent, ViewBodyComponent } from "../Components";
import contextApi from "../Context/contextApi";

const ViewScreen = () => {
  const [bar, setBar] = useState(true);
  const [searchItems, setSearchItems] = useState("");
  const [searchModel, setSearchModel] = useState("");
  const [brandName, setBrandName] = useState([]);
  const [brandYear, setBrandYear] = useState([]);
  const [brandColor, setBrandColor] = useState([]);
  const [disableBar, setDisableBar] = useState(true);
  return (
    <contextApi.Provider
      value={{
        bar,
        setBar,
        disableBar,
        setDisableBar,
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
      <HeaderComponent disableBar={disableBar} setDisableBar={setDisableBar} />

      <ViewBodyComponent />
    </contextApi.Provider>
  );
};

export default ViewScreen;
