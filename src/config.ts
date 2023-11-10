import { Construct } from "constructs";
import { Channel } from './types/alert';

interface KengineConfiguration {
	/**
	 * The Kengine API key
	 */
	readonly apiKey: string;
	/**
	 * The region to deploy this Observability as Code to.
	 *
	 * @default - Defaults to the CDK_DEPLOY_REGION environment variable
	 */
	readonly region?: string;
	/**
	 * The channel to send all the alerts by default.
	 */
	readonly defaultChannel?: Channel;
	/**
	 * Wether or not to add a filter on stack name to all the queries
	 * When `disableStackFilter` is set to `true`, this filter is removed:
	 * `$kengine.stackId = stackName`
	 * 
	 * @default - Defaults to false
	 */
	readonly disableStackFilter?: boolean;
	/**
	 * The AWS Account ID where Kengine is deployed.
	 * Change this property only if you have self-deployed the entire Kengine BackEnd
	 * 
	 * @default - Defaults to the Kengine AWS Account ID
	 */
	readonly _account?: string;
}

export namespace Kengine {
	let construct: Construct;
	let kengineSecret: string;
	let serviceToken: string;
	let defaultChannel: Channel | undefined;
	let disableStackFilter: boolean | undefined;

	/**
	 * Initialize Kengine CDK. Make sure to use this method in the beginning of the stack.
	 *
	 * @param {Construct} target
	 * @param {KengineConfiguration} options
	 * @example
	 * import { Kengine } from '@khulnasoft/cdk'
	 * import * as cdk from 'aws-cdk-lib'
	 * import { Construct } from 'constructs'
	 *
	 * export class ExamplesStack extends cdk.Stack {
	 *   constructor(scope: Construct, id: string, props?: cdk.StackProps) {
	 *     super(scope, id, props)
	 *
	 *     Kengine.init(this, {
	 *       apiKey: process.env.KENGINE_API_KEY, // Ideally use SSM or Secrets Manager
	 *		   defaultChannel: { type: "slack", targets: ["kengine-alerts"] },
	 *     });
	 */
	export function init(
		target: Construct,
		options: KengineConfiguration,
	) {
		construct = target;
		kengineSecret = options.apiKey;
		serviceToken = `arn:aws:lambda:${options.region || process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION || "eu-west-1"
			}:${options._account || "097948374213"}:function:kengine-orl-cloudformation`;
		defaultChannel = options.defaultChannel;
		disableStackFilter = options.disableStackFilter;
	}

	export function getConstruct() {
		return construct;
	}

	export function getApiKey() {
		return kengineSecret;
	}

	export function getServiceToken() {
		return serviceToken;
	}

	export function getDefaultChannel() {
		return defaultChannel;
	}

	export function getDisableStackFilter() {
		return disableStackFilter;
	}
}
