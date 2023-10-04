# nostr-typedef

**nostr-typdef** provides domain-specific type definitions (and useful doc comments) that are often needed to develop Nostr application with TypeScript.
It doesn't contain any implementations, but contains only type definitions.
Therefore, it doesn't affect the bundle size of your application at all.

## Installation

For example, if your product is a library and some applications may depend on it, the dependency must be declared in `dependencies` field.
In short, `-S` option is required.

```sh
npm install -S nostr-typedef
```

If not, that is, if your application is not depended on anything else, you can put the dependency in `devDependencies` field.

```sh
npm install -D nostr-typdef
```

## Example

```ts
import type * as Nostr from "nostr-typedef";

// OK. No type errors.
const message: Nostr.ToRelayMessage.REQ = ["REQ", "subId", { kinds: [0] }];

// NG. Required fields are missed so a type error occurs.
const event: Nostr.Event = {};
```

## Types

For a complete list, see [index.d.ts](./index.d.ts).

Particularly useful ones are listed below:

- types
  - `Event`
  - `UnsignedEvent`
  - `EventParameters`
  - `Filter`
- namespaces
  - `Kind`
  - `Tag`
  - `Content`
  - `ToRelayMessage`
  - `ToClientMessage`
  - `Nip07`
  - `Nip11`
