import type { IRunExecutionData } from 'n8n-workflow';
import { LoggerProxy as Logger } from 'n8n-workflow';

import { InvalidExecutionMetadataError } from '@/errors/invalid-execution-metadata.error';

export const KV_LIMIT = 10;
export const MAX_KEY_LENGTH = 50;
export const MAX_VALUE_LENGTH = 512;

export function setWorkflowExecutionMetadata(
	executionData: IRunExecutionData,
	key: string,
	value: unknown,
) {
	if (!executionData.resultData.metadata) {
		executionData.resultData.metadata = {};
	}
	// Currently limited to 10 metadata KVs
	if (
		!(key in executionData.resultData.metadata) &&
		Object.keys(executionData.resultData.metadata).length >= KV_LIMIT
	) {
		return;
	}
	if (typeof key !== 'string') {
		throw new InvalidExecutionMetadataError('key', key);
	}
	if (key.replace(/[A-Za-z0-9_]/g, '').length !== 0) {
		throw new InvalidExecutionMetadataError(
			'key',
			key,
			`Custom date key can only contain characters "A-Za-z0-9_" (key "${key}")`,
		);
	}
	if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'bigint') {
		throw new InvalidExecutionMetadataError('value', key);
	}
	const val = String(value);
	// Only log when data is actually lost, and name the key so the offending
	// workflow can be found without grepping every execution.
	if (key.length > MAX_KEY_LENGTH) {
		Logger.warn(
			`Custom data key over ${MAX_KEY_LENGTH} characters long. Truncating to ${MAX_KEY_LENGTH} characters. (key "${key}")`,
		);
	}
	if (val.length > MAX_VALUE_LENGTH) {
		Logger.warn(
			`Custom data value over ${MAX_VALUE_LENGTH} characters long. Truncating to ${MAX_VALUE_LENGTH} characters. (key "${key}")`,
		);
	}
	executionData.resultData.metadata[key.slice(0, MAX_KEY_LENGTH)] = val.slice(0, MAX_VALUE_LENGTH);
}

export function setAllWorkflowExecutionMetadata(
	executionData: IRunExecutionData,
	obj: Record<string, string>,
) {
	const errors: Error[] = [];
	Object.entries(obj).forEach(([key, value]) => {
		try {
			setWorkflowExecutionMetadata(executionData, key, value);
		} catch (e) {
			errors.push(e as Error);
		}
	});
	if (errors.length) {
		throw errors[0];
	}
}

export function getAllWorkflowExecutionMetadata(
	executionData: IRunExecutionData,
): Record<string, string> {
	// Make a copy so it can't be modified directly
	return executionData.resultData.metadata ? { ...executionData.resultData.metadata } : {};
}

export function getWorkflowExecutionMetadata(
	executionData: IRunExecutionData,
	key: string,
): string {
	return getAllWorkflowExecutionMetadata(executionData)[String(key).slice(0, 50)];
}
