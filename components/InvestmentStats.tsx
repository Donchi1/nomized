import { DocumentData } from 'firebase/firestore'
import dynamic from 'next/dynamic';
import React from 'react'


const Charts = dynamic(() => import("react-apexcharts"), {ssr: false})

function InvestmentStats({investments}:{investments: DocumentData[]}) {

    const startingDate = investments[0]?.date ? investments[0]?.date.toDate(): new Date();
    const today = new Date();
    const fixedDate = new Date(investments[0]?.date ? investments[0]?.date.toDate() : new Date())
    const endingDate = new Date(new Date(fixedDate).setDate(fixedDate.getDate() + 5));
    const timeDiff = Math.abs(endingDate.getTime() - today.getTime())
       
    const remainingDays = Math.round(timeDiff / (1000 * 60 * 60 * 24));
  
  
    
  
    const getProgressInfo = () => {
      switch (remainingDays) {
        case 0:
          return {
            profit: (investments[0]?.profit * 100) / 100,
            progress: 100,
            text: "completed",
          };
        case 1:
          return { profit: (investments[0]?.profit * 20) / 100, progress: 80, text: "progress" };
  
        case 2:
          return { profit: (investments[0]?.profit * 40) / 100, progress: 60, text: "progress" };
  
        case 3:
          return { profit: (investments[0]?.profit * 60) / 100, progress: 40, text: "progress" };
  
        case 4:
          return { profit: (investments[0]?.profit * 80) / 100, progress: 20, text: "progress" };
        default:
          return {
            profit: investments[0]?.profit ? investments[0]?.profit : 0,
            progress: investments[0]?.profit ? 100 : 0,
            text: investments[0]?.profit ? "Ended" : "No trade",
          };
      }
    };
  
    const progressInfo = {
      series: [getProgressInfo().progress],
      options: {
        labels: [getProgressInfo().text],
        chart: {
          height: 350,
          width: 20,
        },
      },
    };
  
    const checkDays = () => {
      if(investments.length > 0){
        if(remainingDays > 5){
          return "Ended"
        }else{
         return remainingDays
        }
      }
      return "None"
       
    } 
  return (
    <>
   
        <div className="xl:col-start-1  xl:col-end-4 lg:px-4 mb-8">
          <div className="box">
            <h4 className="text-red-500 text-xl mb-2">Latest Investment Stats</h4>
            <p className="mb-2 ">
              <span className="font-small ">
                Investment Amount :{" "}
              </span>
              <span className="badge-small badge bg-success ">
                {investments[0]?.investedAmount || "000"}
              </span>{" "}
            </p>
            <p className="mb-2">
              <span className="font-small ">
                Expected Profit :{" "}
              </span>
              <span className="badge-small badge bg-success ">
              {investments[0]?.expectedProfit || "000"}{" "}
              </span>{" "}
              and above
            </p>
            <p className="mb-2">
              <span className="font-small ">
                Investment Date :{" "}
              </span>
              {investments.length > 0 ? startingDate.toLocaleString("default", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                weekday: "short",
              }): "None"}
            </p>
            <p className="mb-2">
              <span className="font-small ">
                Investment Ending Date :{" "}
              </span>
              {investments.length > 0 ? new Date(endingDate).toLocaleString("default", {
                day: "2-digit",
                weekday: "short",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }): "None"}
            </p>
            <p className="mb-2">
              <span className="font-small ">
                Remaing Days :{" "}
              </span>
              {checkDays()}
            </p>
            <p className="mb-2">
              <span className="font-small ">
                Complete In :{" "}
              </span>
              5Days
            </p>
            <p className="mb-2">
              <span className="font-small ">
                Earning Percent :{" "}
              </span>
              {investments.length > 0 ? "20%" : "None"}
            </p>
            <p>
              <span className="font-small ">
                Charges: {""}
              </span>
              {investments.length > 0 ? "5%" : "None"}
            </p>
          </div>
        </div>

        <div className="xl:col-start-4 xl:col-end-6 lg:px-4 mb-8">
          <div className="box ">
            <div className=" d-flex flex-column flex-lg-row">
              <div className="d-flex mt-4 ">
                <div className="img-box ">
                  
                </div>
                <div>
                  <h4 className="">
                    Investment Progress Info
                  </h4>
                  <p>€{getProgressInfo().profit}</p>
                </div>
              </div>

              <Charts
                type="radialBar"
                series={progressInfo.series}
                options={{
                  ...progressInfo.options,
           
                  fill: { colors: ["#008000"] },
                  chart: {
                    height: 20,
                    width: 10,
                  },
                  plotOptions: {
                    radialBar: {
                      dataLabels: {
                        name: {
                          color: "#f44336",
                        },
                        value: {
                          fontSize: "20px",
                          color: "white",
                        },
                      },
                      hollow: {
                        size: "80px",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
    
  </>
  )
}

export default InvestmentStats