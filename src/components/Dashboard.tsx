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
        (<>
            <section className="table">
                <SummaryTable />
            </section>
          {showUpdated  && <div> Record updated! </div>}
            <section className="records">
                <DisplayRecords  updateRecord={updateRecord} />
            </section>
        </>);
}

export default Dashboard


// const [state, dispatch] = useReducer(recordsReducer, initialState);
// const { records} = state;
// //  const [records, setRecords] = useState<IRecords[]>(mockData)
// const updateRecord = ( updatedRecord:IRecords)=> {
//  //  const allRecords = records;
//    const indexOfUpdatedRecord =  records.findIndex(record=>  updatedRecord.title === record.title)
// //    console.log( 'indexOfUpdatedRecord', indexOfUpdatedRecord)
//    records[indexOfUpdatedRecord] = updatedRecord
//    console.log( 'records' ,records[indexOfUpdatedRecord])
// //   console.log( 'allRecords' ,allRecords)
//   dispatch( { type: 'updateRecords', payload: records }) ;
// //   forceUpdate();
// }
// //     const [, updateState] = useState({});
// //   const forceUpdate = useCallback(() => updateState({}), []);


// // useEffect(() => {
// //      setRecords(records)
// //      }, [records])