import React, { useState, useEffect } from "react";
import mockData from "../mockData";
import SummaryTable from "./Table";
import { IRecords } from "../interface/interfaces";
import DisplayRecords from "./DisplayRecords";


const Dashboard: React.FC = () => {
    const [records, setRecords] = useState<IRecords[]>(mockData)
    const updateRecord = ( updatedRecord:IRecords)=> {
       const allRecords = records
       const indexOfUpdatedRecord =  records.findIndex(record=>  updatedRecord.title === record.title)
       allRecords[indexOfUpdatedRecord] = updatedRecord
       setRecords(allRecords)
    }

    useEffect(() => { setRecords(mockData) }, [])

    if (records) {
        return (<>
            <section className="table">
                <SummaryTable records={records} />
            </section>
            <section className="records">
                <DisplayRecords  records={records} updateRecord={updateRecord}  />
            </section>

            {records.map((record,index) => <div key={index}>{record.title}</div>)}</>)

    } else {
        return <div>Loading</div>
    }

    ;
}

export default Dashboard