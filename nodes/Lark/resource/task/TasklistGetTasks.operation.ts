import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { ResourceOperation } from '../../../help/type/IResource';
import { WORDING } from '../../../help/wording';
import RequestUtils from '../../../help/utils/RequestUtils';

export default {
	name: 'Get Tasks in Tasklist | 获取清单任务列表',
	value: 'getTasklistTasks',
	order: 94,
	options: [
		{
			displayName: `<a target="_blank" href="https://open.feishu.cn/document/task-v2/tasklist/tasks">${WORDING.OpenDocument}</a>`,
			name: 'notice',
			type: 'notice',
			default: '',
		},
		{
			displayName: 'Tasklist GUID(清单 GUID)',
			name: 'tasklist_guid',
			type: 'string',
			required: true,
			default: '',
			description: 'GUID of the tasklist to query tasks from',
		},
		{
			displayName: 'User ID Type(用户 ID 类型)',
			name: 'user_id_type',
			type: 'options',
			options: [
				{ name: 'Open ID', value: 'open_id' },
				{ name: 'Union ID', value: 'union_id' },
				{ name: 'User ID', value: 'user_id' },
			],
			default: 'open_id',
		},
		{
			displayName: 'Return All(返回全部)',
			name: 'return_all',
			type: 'boolean',
			default: true,
			description:
				'Whether to auto-paginate and return all tasks in the tasklist. When disabled, only one page is returned.',
		},
		{
			displayName: 'Page Size(分页大小)',
			name: 'page_size',
			type: 'number',
			typeOptions: {
				minValue: 1,
				maxValue: 100,
				numberPrecision: 0,
			},
			default: 50,
			description: 'Number of tasks per page (max 100)',
		},
		{
			displayName: 'Page Token(分页标记)',
			name: 'page_token',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Token for the next page. Only used when Return All is disabled.',
			displayOptions: {
				show: {
					return_all: [false],
				},
			},
		},
		{
			displayName: 'Options(可选参数)',
			name: 'options',
			type: 'collection',
			placeholder: 'Add Field',
			default: {},
			options: [
				{
					displayName: 'Completed(是否完成)',
					name: 'completed',
					type: 'options',
					options: [
						{ name: 'All', value: '' },
						{ name: 'Completed', value: 'true' },
						{ name: 'Uncompleted', value: 'false' },
					],
					default: '',
					description: 'Filter by completion status',
				},
				{
					displayName: 'Created From(任务创建起始时间)',
					name: 'created_from',
					type: 'string',
					default: '',
					description:
						'Filter tasks created at or after this timestamp (millisecond, e.g. 1675844827000)',
				},
				{
					displayName: 'Created To(任务创建结束时间)',
					name: 'created_to',
					type: 'string',
					default: '',
					description:
						'Filter tasks created at or before this timestamp (millisecond, e.g. 1675844827000)',
				},
			],
		},
		{
			displayName:
				'<a target="_blank" href="https://open.feishu.cn/document/task-v2/tasklist/tasks">Open Document</a>',
			name: 'notice',
			type: 'notice',
			default: '',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const tasklist_guid = this.getNodeParameter('tasklist_guid', index) as string;
		const user_id_type = this.getNodeParameter('user_id_type', index) as string;
		const return_all = this.getNodeParameter('return_all', index, true) as boolean;
		const page_size = this.getNodeParameter('page_size', index, 50) as number;
		const options = this.getNodeParameter('options', index, {}) as IDataObject;
		const completed = (options.completed as string) || '';
		const created_from = (options.created_from as string) || '';
		const created_to = (options.created_to as string) || '';

		let pageToken = return_all ? '' : (this.getNodeParameter('page_token', index, '') as string);
		const allItems: IDataObject[] = [];
		let hasMore = false;
		let lastPageToken = '';

		do {
			const { code, msg, data } = await RequestUtils.request.call(this, {
				method: 'GET',
				url: `/open-apis/task/v2/tasklists/${tasklist_guid}/tasks`,
				qs: {
					user_id_type,
					page_size,
					...(pageToken && { page_token: pageToken }),
					...(completed !== '' && { completed }),
					...(created_from && { created_from }),
					...(created_to && { created_to }),
				},
			});

			if (code !== 0) {
				throw new Error(`Get tasks in tasklist failed, code: ${code}, message: ${msg}`);
			}

			const { has_more, page_token, items } = data as {
				has_more: boolean;
				page_token: string;
				items: IDataObject[];
			};

			hasMore = has_more;
			lastPageToken = page_token;
			pageToken = page_token;
			if (items) {
				allItems.push(...items);
			}
		} while (return_all && hasMore);

		return {
			has_more: hasMore,
			page_token: lastPageToken,
			items: allItems,
		};
	},
} as ResourceOperation;
