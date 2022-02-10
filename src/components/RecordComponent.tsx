import React, { useState } from "react";
import { IRecords } from '../interface/interfaces';

type Props = { record: IRecords; updateRecord: (updatedRecord: IRecords) => void; index: number};

const RecordComponent: React.FC<Props> = ({ record, updateRecord,index }) => {
    const [editRecord, setEditRecord] = useState(false);
    const [projectOwner, setProjectOwner] = useState(record.project_owner);
    const [budget, setBudget] = useState(record.budget);
    const [status, setStatus] = useState(record.status);

    //TODO: Refactor updateRecord handleEditRecord
    const handleEditRecord = (record: IRecords) => {
        if (editRecord) {
            updateRecord({ ...record, project_owner: projectOwner, budget, status })
        }
        setEditRecord(!editRecord)
    }

    return (<div className="record" style={{padding:'2rem',borderStyle: 'solid', borderRadius:'10px', borderWidth:'1px', marginTop:'2rem'}}>
<div style={{display:'flex', justifyContent:'space-between' }}>
    <h1>{record.title} </h1>
    <span>
        <button onClick={() => handleEditRecord(record)}> {editRecord ? 'Update' : 'Edit'} </button>
        <a href={`https://locahost:3000/${record.title}`}> More Details </a> </span>
        </div>
        <table style={{width:'20%'}}>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Division:</td>
                    <td>{record.division} </td>
                </tr>
                <tr>
                    <td>Project Owner:</td>
                    {editRecord ? <td><input value={projectOwner} type='text' onChange={(e) => setProjectOwner(e.target.value)} /></td> : <td>{record.project_owner} </td>}
                </tr>
                <tr>
                    <td>Budget:</td>
                    {editRecord ?<td> <input value={budget} type='text' onChange={(e) => setBudget(Number(e.target.value))} /> </td> : <td>${record.budget} </td>}
                </tr>
                <tr>
                    <td>Status:</td>
                    {editRecord ?<td> <input value={status} type='text' onChange={(e) => setStatus(e.target.value)} /> </td> : <td>{record.status} </td>}
                </tr>
                <tr>
                    <td>Created:</td>
                    <td>{record.created} </td>
                </tr>
                <tr>
                    <td>Modified:</td>
                    <td>{record.modified == null ? 'Has not been modified': record.modified} </td></tr>
            </tbody>
        </table>
    </div>)
}

export default RecordComponent