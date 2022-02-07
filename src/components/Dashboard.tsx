import React, {useState, useEffect} from "react";
import mockData from "../mockData";
import SummaryTable from "./Table";

const Dashboard : React.FC = () => {
    const [records, setRecords] = useState(mockData)
    useEffect(()=>{setRecords(mockData) }, [])







    return (<>
    <section> <SummaryTable /> </section>
    
    { records.map(record => <div>{record.title}</div>)}</>);
}

export default Dashboard