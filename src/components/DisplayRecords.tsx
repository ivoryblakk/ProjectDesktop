import React, { useState, useEffect } from "react";
import { IRecords } from '../interface/interfaces';
import RecordComponent from './RecordComponent'

type Props = { records: IRecords[]; updateRecord:(updatedRecord: IRecords) => void };

const DisplayRecords: React.FC<Props> = ({ records, updateRecord}) => {
    const[division,setDivison ] = useState('0')
    const[budget,setBudget ] = useState('')
    const[status,setStatus ] = useState('')
    const[created,setCreated ] = useState('')
    const[modified,setModified ] = useState('')
    const [filtered , setFiltered] = useState( records)

    const divisionFilter = () => {
        return( <>
                 <label htmlFor="division">Division</label>
                <select  onChange={(e)=>setDivison(e.target.value)} value={division} name="division">
                <option  value={''}> Division</option>
                <option  value='accounting'>Accounting</option>
                <option  value='administration'>Administration</option>
                <option  value='administration'>Marketing</option>
                <option  value='administration'>Sales</option>
                <option  value='production'>Production</option>
                </select>
                </>)

    }

    const budgetFilter = () => {

      return ( <div className="slidecontainer">
             <label htmlFor="budget">Budget</label>
  <input type="range" min="0" max="100" value={budget} className="slider" name="budget"  onChange={(e)=>setBudget(e.target.value)}/> {budget}
</div>);

    }

    const statusFilter = () => {
        return( <>
            <label htmlFor="status">Division</label>
           <select  onChange={(e)=>setStatus(e.target.value)} value={status} name="status">
           <option  value={''}> Status</option>
           <option  value='new'>New</option>
           <option  value='working'>Working</option>
           <option  value='delivered'>Delivered</option>
           <option  value='archived'>Archived</option>
           </select>
           </>)

    }

    const createdFilter = () => {

    
    }

    const modifiedFilter = () =>{

    }

  
    const searchFilterBar = () => {
     return  (<>
        <div>
            <input type='text'/>
        </div>
        <div>
            {divisionFilter()}
            {budgetFilter()}
            {statusFilter()}
            {createdFilter()}
            {modifiedFilter()}
        </div>

        </>)
    }

        return (<div>{searchFilterBar()}
        { filtered.map((record, index)=> <RecordComponent key={record.title + index}  record={record} updateRecord={updateRecord} index={index} /> )  }
        </div>)
    ;
}

export default DisplayRecords