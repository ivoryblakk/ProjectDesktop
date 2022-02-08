import React, { useState, useEffect } from "react";
import { IRecords } from '../interface/interfaces';

type Props = { records: IRecords[]; updateRecord:(updatedRecord: IRecords) => void };

const DisplayRecords: React.FC<Props> = ({ records, updateRecord}) => {
  
    const searchFilterBar = () => {
     return  (<>
        <div>
            <input type='text'/>
        </div>
        <div>

        </div>

        </>)
    }

        return (<div>{searchFilterBar()}</div>)
    ;
}

export default DisplayRecords