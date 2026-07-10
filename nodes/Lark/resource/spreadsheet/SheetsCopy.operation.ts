import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';
import { WORDING } from '../../../help/wording';
import { OperationType } from '../../../help/type/enums';
import { DESCRIPTIONS } from '../../../help/description';

export default {
	name: WORDING.CopySheet,
	value: OperationType.CopySheet,
	order: 186,
	options: [
		{
			displayName: `<a target="_blank" href="https://open.feishu.cn/document/server-docs/docs/sheets-v2/spreadsheet-sheet/copy">${WORDING.OpenDocument}</a>`,
			name: 'notice',
			type: 'notice',
			default: '',
		},
		DESCRIPTIONS.SPREADSHEET_ID,
		DESCRIPTIONS.SHEET_ID,
		DESCRIPTIONS.TITLE,
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const spreadsheetId = this.getNodeParameter('spreadsheet_id', index, undefined, {
			extractValue: true,
		}) as string;
		const sheetId = this.getNodeParameter('sheet_id', index, undefined, {
			extractValue: true,
		}) as string;
		const title = this.getNodeParameter('title', index) as IDataObject;

		const body: IDataObject = {
			requests: [
				{
					copySheet: {
						source: {
							sheetId,
						},
						destination: {
							title,
						},
					},
				},
			],
		};

		const {
			data: { replies },
		} = await RequestUtils.request.call(this, {
			method: 'POST',
			url: `/open-apis/sheets/v2/spreadsheets/${spreadsheetId}/sheets_batch_update`,
			body,
		});

		const {
			copySheet: { properties },
		} = replies[0];

		return properties;
	},
} as ResourceOperation;
