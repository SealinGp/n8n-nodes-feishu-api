import { ResourceType } from '../../help/type/enums';
import { ResourceOptions } from '../../help/type/IResource';
import { WORDING } from '../../help/wording';

export default {
	name: WORDING.ResourceMessage,
	value: ResourceType.Message,
	order: 200,
} as ResourceOptions;
