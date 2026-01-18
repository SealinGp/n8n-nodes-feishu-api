import { ResourceType } from '../../help/type/enums';
import { ResourceOptions } from '../../help/type/IResource';
import { WORDING } from '../../help/wording';

export default {
	name: WORDING.ResourceDocument,
	value: ResourceType.Document,
	order: 180,
} as ResourceOptions;
