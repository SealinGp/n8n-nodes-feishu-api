import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { ResourceOperation } from '../../../help/type/IResource';
import { WORDING } from '../../../help/wording';
import { OperationType } from '../../../help/type/enums';
import RequestUtils from '../../../help/utils/RequestUtils';

export default {
	name: WORDING.GetApprovalInstance,
	value: OperationType.GetApprovalInstance,
	order: 90,
	options: [
		{
			displayName: 'Instance Code(审批实例 Code)',
			name: 'instance_code',
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
				{ name: 'Union ID', value: 'union_id' },
				{ name: 'User ID', value: 'user_id' },
			],
			default: 'open_id',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const instanceCode = this.getNodeParameter('instance_code', index) as string;
		const userIdType = this.getNodeParameter('user_id_type', index) as string;

		const response = await RequestUtils.request.call(this, {
			method: 'GET',
			url: `/open-apis/approval/v4/instances/${instanceCode}`,
			qs: {
				user_id_type: userIdType,
			},
		});

		return response.data as IDataObject;
	},
} as ResourceOperation;
