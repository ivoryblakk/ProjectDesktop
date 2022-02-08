import React, { useEffect, useState, useCallback } from 'react';
import { IRecords } from '../interface/interfaces';

type Props = { records: IRecords[] };

// interface tableInfo {
//     divison: "Marketing"| "Sales"|"Accounting"|"Production"| "Administration";
//     projectCount: number;
//     budgetAvg: Array<number>;
//     type: string;
// }

const SummaryTable: React.FC<Props> = ({ records }) => {
	//let tableData: tableInfo | {} = {}
	const [bodyRows, setBodyRows] = useState([]);
	const tableRows = useCallback(async () => {
		const tableData: any = {};
		const renderTable: any = [];
		await records.forEach((record) => {
			const divisionName = record.division.toLowerCase();
			if (tableData[divisionName] === undefined) {
				tableData[divisionName] = {};
			}
            if (tableData[divisionName]['division'] === undefined) {
				tableData[divisionName]['division'] = record.division;
			}	
			if (isNaN(tableData[divisionName]['projectCount'])) {
				tableData[divisionName]['projectCount'] = 0;
			}
			tableData[divisionName]['projectCount'] += 1;

			if (isNaN(tableData[divisionName]['budgetTotal'])) {
				tableData[divisionName]['budgetTotal'] = 0;
			}
			tableData[divisionName]['budgetTotal'] += record.budget;

			if (tableData[divisionName]['status'] === undefined) {
				tableData[divisionName]['status'] = '';
			}

			tableData[divisionName]['status'] += record.status;
		});

		for (let key in tableData) {
			renderTable.push(tableData[key]);
		}

		setBodyRows(renderTable);
	}, [records]);

	const renderTableBody = () => {
		return (
			bodyRows &&
			bodyRows.map((item: any, index) => {
				var statusNew = (item.status.match(/new/gi) || []).length;
				var statusDelivered = (item.status.match(/delivered/gi) || []).length;
				var statusArchived = (item.status.match(/archived/gi) || []).length;
				var statusWorking = (item.status.match(/working/gi) || []).length;
				return (
					<tr key = {index}>
						<td>{item.division}</td>
						<td>{item.projectCount}</td>
						<td>${Math.floor(item.budgetTotal / item.projectCount)}</td>
						<td>
							{statusNew ?<> {`${statusNew} new` } <br/></>: ''} 
                            {statusWorking ?<> {`${statusWorking} working `}<br/></> : ''}
							{statusDelivered ?<>  {`${statusDelivered} delivered`}<br/> </>: ''}
							{statusArchived ?<>  {`${statusArchived} archived`} </>: ''}
						</td>
					</tr>
				);
			})
		);
	};

	useEffect(() => {
		tableRows();
	}, [tableRows]);

	return (
		<table>
			<thead>
				<tr>
					<th>Division </th>
					<th>Number of Projects</th>
					<th>Budget Average</th>
					<th>Overall Status of Projects</th>
				</tr>
			</thead>
			<tbody>{renderTableBody()}</tbody>
		</table>
	);
};

export default SummaryTable;
