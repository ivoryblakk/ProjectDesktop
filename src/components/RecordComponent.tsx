import React, { useState } from "react";
import { IRecords } from '../interface/interfaces';

type Props = { record: IRecords; updateRecord: (updatedRecord: IRecords) => void; index: number};

const RecordComponent: React.FC<Props> = ({ record, updateRecord,index }) => {
    const [editRecord, setEditRecord] = useState(false);
    const [projectOwner, setProjectOwner] = useState(record.project_owner);
    const [budget, setBudget] = useState(record.budget);
    const [status, setStatus] = useState(record.status);

    const handleEditRecord = (record: IRecords) => {
        if (editRecord) {
            console.log('updatedRecord: ', { ...record, project_owner: projectOwner, budget, status })
            updateRecord({ ...record, project_owner: projectOwner, budget, status })
        }
        setEditRecord(!editRecord)
    }

    return (<div>

        <button onClick={() => handleEditRecord(record)}> {editRecord ? 'Update' : 'Edit'} </button>
        <a href={`https://locahost:3000/${record.title}`}> More Details </a>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Title: </td>
                    <td>{record.title} </td>
                </tr>
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
                    {editRecord ?<td> <input value={budget} type='text' onChange={(e) => setBudget(Number(e.target.value))} /> </td> : <td>{record.budget} </td>}
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
                    <td>{record.modified == null ? record.created : record.modified} </td></tr>
            </tbody>
        </table>
    </div>)
}

export default RecordComponent