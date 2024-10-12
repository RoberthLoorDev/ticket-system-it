import { icons } from "../assets/icons/icons";
import { images } from "../assets/images/images";

import FilterDataHook from "../hooks/FilterDataHook";
import { formatDateForTable } from "../utils/dateUtils";

export default function UserPageDashboard() {
     const { filterData, filteredData, activeButton } = FilterDataHook();

     //active table filter
     const activeTableFilterStyle = ``;

     return (
          <>
               <nav className="flex justify-between px-[107px] mt-[47px]">
                    <img src={icons.iconPage} className="w-auto h-[33px]" />

                    <div className="flex items-center">
                         <img src={images.imageProfile} className="min-w-[37px] mr-[10px]" />

                         <div className="flex flex-col justify-center">
                              <span className="text-base ">Roberth Loor</span>
                              <span className="text-xs -mt-1 text-[#6D6D6D]">Recursos humanos</span>
                         </div>
                         <img src={icons.iconCoseSession} className="ml-[35px] w-[23px] h-[23px]" alt="" />
                    </div>
               </nav>

               <header className="px-[107px] mt-[49px] flex flex-col">
                    <h1 className="text-[41px] font-semibold">Tickets</h1>

                    <span className="text-sm">Hoy es 15 de agosto</span>

                    <span className="text-sm">Se han creado 20 tickets</span>
               </header>

               {/* table */}

               {/* 
                    [x] hook para los datos, por defecto, todos los datos son visibles, si preciono un boton, se hace el filtrado
                    [x] filtar por nuevos
                    [x] filtrar por en progreso
                    [x] filtrar resueltos
                    [] animacion de indicativo de donde estamos
          */}
               <div className="mt-[65px] px-[27px]">
                    <div className="flex gap-6">
                         <button
                              className={`text-sm ${activeButton === 1 ? "font-semibold text-black" : "font-normal "}`}
                              onClick={() => filterData("Todos", 1)}
                         >
                              Todos
                         </button>

                         <button
                              className={`text-sm text-[#5F5F5F] ${
                                   activeButton === 2 ? "font-semibold text-black" : "font-normal "
                              }`}
                              onClick={() => filterData("Nueva", 2)}
                         >
                              Nueva
                         </button>

                         <button
                              className={`text-sm text-[#5F5F5F] ${
                                   activeButton === 3 ? "font-semibold text-black" : "font-normal "
                              }`}
                              onClick={() => filterData("En progreso", 3)}
                         >
                              En progreso
                         </button>

                         <button
                              className={`text-sm text-[#5F5F5F] ${
                                   activeButton === 4 ? "font-semibold text-black" : "font-normal "
                              }`}
                              onClick={() => filterData("Resuelto", 4)}
                         >
                              Resuelto
                         </button>
                    </div>

                    {/* table */}
                    <div className="w-full mt-8 mb-20 ">
                         <table className="w-full">
                              <thead>
                                   <tr className="text-start text-sm">
                                        <th className="text-[#5F5F5F] font-normal text-start">Estado</th>
                                        <th className="text-start text-[#5F5F5F] font-normal">Asunto</th>
                                        <th className="text-start text-[#5F5F5F] font-normal">Área</th>
                                        <th className="text-start text-[#5F5F5F] font-normal">Fecha de creación</th>
                                        <th className="text-start text-[#5F5F5F] font-normal">Fecha de resolución</th>
                                        <th className="text-start text-[#5F5F5F] font-normal">Prioridad</th>
                                        <th className="text-start text-[#5F5F5F] font-normal">Profesional asignado</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {filteredData.map((item) => {
                                        const status = item.status;
                                        const colorStatus =
                                             status === "Resuelto" ? "#00A958" : status === "Nueva" ? "#0077FF" : "#EBC800";

                                        const priority = item.priority;
                                        const colorPriority =
                                             priority === "Alta" ? "#FF0000" : priority === "Media" ? "#EBC800" : "#00A958";

                                        const creationDate = formatDateForTable(item.creation_date);
                                        const resolutionDate = formatDateForTable(item.resolution_date);

                                        return (
                                             <tr className="text-sm h-[61px] hover:bg-[#F8F8F8] duration-150 " key={item.id}>
                                                  <td className="pl-4">
                                                       <span className="text-xl mr-2" style={{ color: colorStatus }}>
                                                            ●
                                                       </span>
                                                       <span className="">{item.status}</span>
                                                  </td>
                                                  <td>{item.subject}</td>
                                                  <td>{item.department}</td>
                                                  <td>{creationDate}</td>
                                                  <td>{item.resolution_date ? resolutionDate : "Sin resolver"}</td>
                                                  <td className="">
                                                       <span>{item.priority}</span>
                                                       <div
                                                            className="h-[4px] w-[26px] rounded-full"
                                                            style={{ backgroundColor: colorPriority }}
                                                       ></div>
                                                  </td>
                                                  <td>{item.tech_name ? item.tech_name : "Sin asignar"}</td>
                                             </tr>
                                        );
                                   })}
                              </tbody>
                         </table>
                    </div>
               </div>
          </>
     );
}
