import { CfnResource, Stack } from "aws-cdk-lib";
import { Kengine as Config } from "../config";

import { DashboardProps } from "../types/dashboard";
export { WidgetType } from "../types/dashboard";
export class Dashboard extends CfnResource {
	constructor(id: string, props: DashboardProps) {

		const parameters = {
			...props.parameters,
			widgets: props.parameters.widgets.map(el => ({ ...el, query: el.query.ref }))
		}

		super(Config.getConstruct(), id, {
			type: "Custom::KengineDashboard",
			properties: {
				id,
				ServiceToken: Config.getServiceToken(),
				KengineApiKey: Config.getApiKey(),
				Description: props.description,
				Parameters: parameters,
				Origin: "cdk"
			},
		});
	}
}
