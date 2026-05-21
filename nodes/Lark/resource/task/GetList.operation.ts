import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { ResourceOperation } from '../../../help/type/IResource';
import RequestUtils from '../../../help/utils/RequestUtils';

export default {
	name: 'Get Task List | 列取任务列表',
	value: 'getList',
	order: 95,
	options: [
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
			description: 'Whether to auto-paginate and return all tasks. When disabled, only one page is returned.',
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
					displayName: 'Type(任务类型)',
					name: 'type',
					type: 'options',
					options: [
						{ name: 'My Tasks', value: 'my_tasks' },
						{ name: 'Followed Tasks', value: 'followed_tasks' },
					],
					default: 'my_tasks',
				},
				{
					displayName: 'Start Create Time(任务创建起始时间)',
					name: 'start_create_time',
					type: 'string',
					default: '',
					description: 'Filter tasks created after this timestamp (millisecond, e.g. 1675844827000)',
				},
				{
					displayName: 'End Create Time(任务创建结束时间)',
					name: 'end_create_time',
					type: 'string',
					default: '',
					description: 'Filter tasks created before this timestamp (millisecond, e.g. 1675844827000)',
				},
			],
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const user_id_type = this.getNodeParameter('user_id_type', index) as string;
		const return_all = this.getNodeParameter('return_all', index, true) as boolean;
		const page_size = this.getNodeParameter('page_size', index, 50) as number;
		const options = this.getNodeParameter('options', index, {}) as IDataObject;
		const completed = (options.completed as string) || '';
		const type = (options.type as string) || '';
		const start_create_time = (options.start_create_time as string) || '';
		const end_create_time = (options.end_create_time as string) || '';

		let pageToken = return_all ? '' : (this.getNodeParameter('page_token', index, '') as string);
		const allItems: IDataObject[] = [];
		let hasMore = false;
		let lastPageToken = '';

		do {
			const { code, msg, data } = await RequestUtils.request.call(this, {
				method: 'GET',
				url: '/open-apis/task/v2/tasks',
				qs: {
					user_id_type,
					page_size,
					...(pageToken && { page_token: pageToken }),
					...(completed !== '' && { completed }),
					...(type && { type }),
					...(start_create_time && { start_create_time }),
					...(end_create_time && { end_create_time }),
				},
			});

			if (code !== 0) {
				throw new Error(`Get task list failed, code: ${code}, message: ${msg}`);
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
