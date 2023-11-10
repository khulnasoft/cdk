# Kengine CDK
[![Documentation][docs_badge]][docs]
[![Latest Release][release_badge]][release]
[![License][license_badge]][license]

Kengine CDK offers the most effective approach to adding observability to a serverless CDK application.


```typescript
kengine.Config.init(stack, {
  apiKey: 'xxxxxx',
});

new Alert("service-errors", {
  parameters: {
    query: {
      filters: [
        filter.inArray("LogLevel", ["ERROR", "WARN"]),
      ],
    },
    channels: [{ type: "slack", targets: ["kengine-alerts"] }]
  },
});
```

## Installation

```
npm i @khulnasoft/cdk
```
## Usage

Get your kengine api key from the [Kengine console](https://console.kengine.khulnasoft.com) or using the [Kengine CLI](https://kengine.khulnasoft.com/docs/cli/install) with the command `kengine iam`. 

```typescript
// Initialize Config, you must do this in a construct before adding querys, alerts and dashboards.
kengine.Config.init(stack, {
  apiKey: 'xxxxxx',
});

// Create Query
const query = new kengine.Query("ColdStarts", {
  description: "optional",
  parameters: {
    datasets: [
      "lambda-logs",
    ],
    calculations: [
      max("@initDuration"),
      p90("@initDuration"),
      min("@initDuration"),
    ],
    filters: [
      eq("@type", "REPORT"),
    ],
  }
});

// Add an alert
query.addAlert({
  enabled: true,
  parameters: {
    frequency: '30mins',
    threshold: gt(500),
    window: '1 hour',
  },
  channels: [{ targets: ['kengine-alerts'], type: 'slack' }],
});

// Create Dashboard
new kengine.Dashboard('ServiceHealth', {
  parameters: {
    widgets: [{ query, type: WidgetType.TIMESERIES}],
  },
});
```

## License

&copy; Kengine Limited, 2023

Distributed under MIT License (`The MIT License`).

See [LICENSE](LICENSE) for more information.

<!-- Badges -->

[docs]: https://kengine.khulnasoft.com/docs/
[docs_badge]: https://img.shields.io/badge/docs-reference-blue.svg?style=flat-square
[release]: https://github.com/khulnasoft/cdk/releases/latest
[release_badge]: https://img.shields.io/github/release/khulnasoft/cdk.svg?style=flat-square&ghcache=unused
[license]: https://opensource.org/licenses/MIT
[license_badge]: https://img.shields.io/github/license/khulnasoft/cdk.svg?color=blue&style=flat-square&ghcache=unused

