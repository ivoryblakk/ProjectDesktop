import React, { useState, useEffect, useCallback, useReducer } from "react";
import { IRecords } from '../interface/interfaces';
import RecordComponent from './RecordComponent'
import { recordsReducer, initialState } from "../store/reducer"

type Props = { updateRecord: (updatedRecord: IRecords) => void };

const DisplayRecords: React.FC<Props> = ({ updateRecord }) => {
    const [state] = useReducer(recordsReducer, initialState);
    const { records } = state;
    const [division, setDivison] = useState('')
    const [budgetMin, setBudgetMin] = useState(0)
    const [budgetMax, setBudgetMax] = useState(0)
    const [projectStatus, setProjectStatus] = useState('')
    const [title, setTitle] = useState('')
    const [createdMin, setCreatedMin] = useState('')
    const [createdMax, setCreatedMax] = useState('')
    const [modifiedMin, setModifiedMin] = useState('')
    const [modifiedMax, setModifiedMax] = useState('')
    const [filtered, setFiltered] = useState(records)

    const divisionFilter = () => {
        return (<>
            <label htmlFor="division">Division</label>
            <select onChange={(e) => setDivison(e.target.value)} value={division} name="division">
                <option value=''> Select Division</option>
                <option value='accounting'>Accounting</option>
                <option value='administration'>Administration</option>
                <option value='administration'>Marketing</option>
                <option value='administration'>Sales</option>
                <option value='production'>Production</option>
            </select>
        </>)
    }

    const budgetFilter = () => {
        const budgets: any = []
        records.forEach((record) => {
            budgets.push(record.budget)
        })

        return (<div className="slidecontainer">
            <label htmlFor="budgetMin">Budget Min</label>
            <input type="range" min="0" max={Math.max(...budgets) - 1} value={budgetMin} className="slider" name="budgetMin" onChange={(e) => setBudgetMin(Number(e.target.value))} /> ${budgetMin}
            <label htmlFor="budgetMax">Budget Max</label>
            <input type="range" min={budgetMin} max={Math.max(...budgets)} value={budgetMax} className="slider" name="budgetMax" onChange={(e) => setBudgetMax(Number(e.target.value))} /> ${budgetMax}
        </div>);

    }

    const statusFilter = () => {
        return (<>
            <label htmlFor="status">Division</label>
            <select onChange={(e) => setProjectStatus(e.target.value)} value={projectStatus} name="status">
                <option value=''> Select Status</option>
                <option value='new'>New</option>
                <option value='working'>Working</option>
                <option value='delivered'>Delivered</option>
                <option value='archived'>Archived</option>
            </select>
        </>)

    }

    const createdFilter = () => {
        return (<div className="datePicker">
            <label htmlFor="created">Created Range</label>
            <input type="date" value={createdMin} min="2015-01-01" max="2015-12-31" name="created" onChange={(e) => setCreatedMin(e.target.value)} />
            <input type="date" value={createdMax} min="2015-01-01" max="2015-12-31" name="created" onChange={(e) => setCreatedMax(e.target.value)} />
        </div>)

    }

    const modifiedFilter = () => {
        return (<div className="datePicker">
            <label htmlFor="modified">Modified Range</label>
            <input type="date" value={modifiedMin} min="2015-01-01" max="2015-12-31" name="modified" onChange={(e) => setModifiedMin(e.target.value)} />
            <input type="date" value={modifiedMax} min="2015-01-01" max="2015-12-31" name="modified" onChange={(e) => setModifiedMax(e.target.value)} />
        </div>)
    }

    const titleSearch = () => {
        return (<><label htmlFor="title">Search by Title</label>
            <input name='title' type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
        </>)
    }


    useEffect(() => {
        console.log('updated')
        let newFilter = records
        if (title) {
            newFilter = newFilter.filter((record) => record.title.toLowerCase().startsWith(title.toLowerCase()))
        }
        if (division) {
            newFilter = newFilter.filter((record) => record.division.toLowerCase() === division.toLowerCase())
        }
        if (projectStatus) {
            newFilter = newFilter.filter((record) => record.status.toLowerCase() === projectStatus.toLowerCase())
        }

        if (budgetMin > 0) {
            newFilter = newFilter.filter((record) => record.budget >= budgetMin)
        }
        if (budgetMax > 0 && budgetMax > budgetMin) {
            newFilter = newFilter.filter((record) => record.budget <= budgetMax)
        }

        if (createdMin || createdMax) {
            newFilter = newFilter.filter((record) => {
                const D1 = new Date(normalizeDate(createdMin));
                const D2 = new Date(normalizeDate(createdMax));
                const D3 = new Date(record.created);
                return (D3.getTime() <= D2.getTime()
                    && D3.getTime() >= D1.getTime()) ? true : false
            })
        }

        if (modifiedMin || modifiedMax) {
            newFilter = newFilter.filter((record) => {
                if (record.modified == null) return false

                const D1 = new Date(normalizeDate(modifiedMin));
                const D2 = new Date(normalizeDate(modifiedMax));
                const D3 = new Date(record.modified);

                return (D3.getTime() <= D2.getTime()
                    && D3.getTime() >= D1.getTime()) ? true : false
            })
        }


        setFiltered(newFilter)
    }, [title, records, division, projectStatus, budgetMin, budgetMax, createdMin, createdMax, modifiedMin, modifiedMax])

    const normalizeDate = (date: string) => {
        const splitDate = date.split('-')
        return `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`
    }

    const searchFilterBar = () => {
        return (<>
            <div>
                {titleSearch()}
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

    return (

        <div>
            <div className="export">  <button>Add Record</button><button>Export Records</button></div>
            <div className="searchBar"> {searchFilterBar()}</div>
            {filtered.length === 0 ? <span> No Records Match the Search Criteria</span> : filtered.map((record, index) => <RecordComponent key={record.title + index} record={record} updateRecord={updateRecord} index={index} />)}
        </div>);
}

export default DisplayRecords