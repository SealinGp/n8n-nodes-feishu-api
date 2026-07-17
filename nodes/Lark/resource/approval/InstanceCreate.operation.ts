import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { ResourceOperation } from '../../../help/type/IResource';
import { WORDING } from '../../../help/wording';
import { OperationType } from '../../../help/type/enums';
import NodeUtils from '../../../help/utils/node';
import RequestUtils from '../../../help/utils/RequestUtils';

function normalizeStringArray(value: unknown): string[] {
	if (Array.isArray(value)) return value.map((item) => String(item)).filter(Boolean);
	if (typeof value === 'string') {
		const trimmed = value.trim();
		if (!trimmed) return [];
		try {
			const parsed = JSON.parse(trimmed);
			if (Array.isArray(parsed)) return parsed.map((item) => String(item)).filter(Boolean);
		} catch (_) {
			return trimmed
				.split(',')
				.map((item) => item.trim())
				.filter(Boolean);
		}
	}
	return [];
}

export default {
	name: WORDING.CreateApprovalInstance,
	value: OperationType.CreateApprovalInstance,
	order: 100,
	options: [
		{
			displayName: `<a target="_blank" href="https://open.feishu.cn/document/server-docs/approval-v4/instance/create">${WORDING.OpenDocument}</a>`,
			name: 'notice',
			type: 'notice',
			default: '',
		},
		{
			displayName: 'Approval Code(审批定义 Code)',
			name: 'approval_code',
			type: 'string',
			required: true,
			default: '',
		},
		{
			displayName: 'User ID Type(用户 ID 类型)',
			name: 'user_id_type',
			type: 'options',
			options: [
				{ name: 'Open ID', value: 'open_id' },
				{ name: 'User ID', value: 'user_id' },
			],
			default: 'open_id',
			description:
				'This endpoint identifies the applicant/approvers by dedicated body fields (user_id vs open_id), NOT by a query parameter. Union ID is not supported here.',
		},
		{
			displayName: 'Applicant User ID(发起人用户 ID)',
			name: 'user_id',
			type: 'string',
			required: true,
			default: '',
		},
		{
			displayName: 'Title Widget ID(标题控件 ID)',
			name: 'title_widget_id',
			type: 'string',
			required: true,
			default: '',
		},
		{
			displayName: 'Title(标题)',
			name: 'title',
			type: 'string',
			required: true,
			default: '',
		},
		{
			displayName: 'Description Widget ID(描述控件 ID)',
			name: 'description_widget_id',
			type: 'string',
			required: true,
			default: '',
		},
		{
			displayName: 'Description(描述)',
			name: 'description',
			type: 'string',
			typeOptions: {
				rows: 4,
			},
			required: true,
			default: '',
		},
		{
			displayName: 'Approver Node ID(审批节点 ID)',
			name: 'approver_node_id',
			type: 'string',
			default: '',
			description: 'Node ID from the approval definition when approvers are chosen at submit time',
		},
		{
			displayName: 'Approver User IDs(审批人用户 ID 列表)',
			name: 'approver_user_ids',
			type: 'string',
			default: '',
			description: 'JSON array or comma-separated user IDs. Uses the selected user ID type.',
		},
		{
			displayName: 'Request Body Extra(额外请求体)',
			name: 'body',
			type: 'json',
			default: '{}',
			description:
				'Extra fields merged into the request body. Values here override generated defaults.',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const approvalCode = this.getNodeParameter('approval_code', index) as string;
		const userIdType = this.getNodeParameter('user_id_type', index) as string;
		const userId = this.getNodeParameter('user_id', index) as string;
		const titleWidgetId = this.getNodeParameter('title_widget_id', index) as string;
		const title = this.getNodeParameter('title', index) as string;
		const descriptionWidgetId = this.getNodeParameter('description_widget_id', index) as string;
		const description = this.getNodeParameter('description', index) as string;
		const approverNodeId = this.getNodeParameter('approver_node_id', index) as string;
		const approverUserIds = normalizeStringArray(
			this.getNodeParameter('approver_user_ids', index, '') as string,
		);
		const extraBody = NodeUtils.getNodeJsonData(this, 'body', index, {}) as IDataObject;

		const form = JSON.stringify([
			{
				id: titleWidgetId,
				type: 'input',
				value: title,
			},
			{
				id: descriptionWidgetId,
				type: 'textarea',
				value: description,
			},
		]);

		const isOpenId = userIdType === 'open_id';

		// The approval "create instance" endpoint does NOT honor the `user_id_type`
		// query parameter. The applicant and approvers are identified by dedicated
		// body fields instead, and the caller must place the value in the field that
		// matches the selected ID type:
		//   applicant -> `open_id`  OR `user_id`
		//   approvers -> `node_approver_open_id_list` OR `node_approver_user_id_list`
		// Passing an open_id in the `user_id` field triggers `1390001 用户ID不正确`.
		const body: IDataObject = {
			approval_code: approvalCode,
			form,
			...(isOpenId ? { open_id: userId } : { user_id: userId }),
		};

		if (approverNodeId && approverUserIds.length > 0) {
			const approverListKey = isOpenId
				? 'node_approver_open_id_list'
				: 'node_approver_user_id_list';
			body[approverListKey] = [
				{
					key: approverNodeId,
					value: approverUserIds,
				},
			];
		}

		const response = await RequestUtils.request.call(this, {
			method: 'POST',
			url: '/open-apis/approval/v4/instances',
			body: {
				...body,
				...extraBody,
			},
		});

		return {
			...(response.data as IDataObject),
			__approval_started_at: new Date().toISOString(),
		};
	},
} as ResourceOperation;
