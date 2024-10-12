import { useState } from "react";
import { TicketInterface } from "../interfaces/interfaces";
import data from "../data/localData.json";

export default function FilterDataHook() {
     const [filteredData, setFilteredData] = useState<TicketInterface[]>(data);
     const [activeButton, setActiveButton] = useState(1);

     const filterData = (dataForFilter: string, index: number) => {
          if (index === 1) {
               setFilteredData(data);
               setActiveButton(index);
               return;
          }

          const dataForShow = data.filter((item) => item.status === dataForFilter);
          setFilteredData(dataForShow);

          //change button status
          setActiveButton(index);
     };

     return {
          filteredData,
          filterData,
          activeButton,
     };
}
