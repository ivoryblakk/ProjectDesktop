import React, { useState, useReducer } from "react";
//import mockData from "../mockData";
import SummaryTable from "./Table";
import { IRecords } from "../interface/interfaces";
import DisplayRecords from "./DisplayRecords";
import { recordsReducer, initialState } from "../store/reducer"


const Dashboard: React.FC = () => {
    const [state, dispatch] = useReducer(recordsReducer, initialState);
    const { records, loading } = state;
    const [showUpdated, setShowUpdated] = useState(false)
    const updateRecord = async (updatedRecord: IRecords) => {
        const indexOfUpdatedRecord = records.findIndex(record => updatedRecord.title === record.title)
        records[indexOfUpdatedRecord] = updatedRecord
        dispatch({ type: 'initUpdateRecords' })
        await dispatch({ type: 'updateRecords', payload: records });
        dispatch({ type: 'completedUpdateRecords' })
        await setShowUpdated(!showUpdated)
        await setTimeout(() => {
            setShowUpdated(false)
        }, 5000);
        
    }

    return (loading) ?
        <div>Loading ...</div>
        :
        (<div className="row">
              <div className="col"/>
              <div className="col-10">
            <section className="table" style={{ paddingTop:'2rem'}}>
                <SummaryTable />
            </section>
          {showUpdated  && <div> Record updated! </div>}
            <section className="records">
                <DisplayRecords  updateRecord={updateRecord} />
            </section>
            </div>
            <div className="col"/>
        </div>);
}

export default Dashboard
