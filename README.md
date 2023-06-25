# nostr-typedef

```sh
npm install -D nostr-typedef
```

```ts
import Nostr from 'nostr-typedef';

// You can use type definitions in your application:
const message: Nostr.ToRelayMessage.REQ = ["REQ", 'subId', { kinds: [0] }];
```
