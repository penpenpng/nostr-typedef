export interface Event<K = number> {
  id: string;
  sig: string;
  kind: K;
  tags: string[][];
  pubkey: string;
  content: string;
  created_at: number;
}

export interface UnsignedEvent<K = number> {
  kind: K;
  tags: string[][];
  pubkey: string;
  content: string;
  created_at: number;
}

export interface EventParameters<K = number> {
  id?: string;
  sig?: string;
  kind: K;
  tags?: string[][];
  pubkey?: string;
  content: string;
  created_at?: number;
}

export enum Kind {
  Metadata = 0,
  Text = 1,
  RecommendRelay = 2,
  Contacts = 3,
  EncryptedDirectMessage = 4,
  EventDeletion = 5,
  Repost = 6,
  Reaction = 7,
  BadgeAward = 8,
  GenericRepost = 16,
  ChannelCreation = 40,
  ChannelMetadata = 41,
  ChannelMessage = 42,
  ChannelHideMessage = 43,
  ChannelMuteUser = 44,
  Blank = 255,
  FileMetadata = 1063,
  Reporting = 1984,
  Label = 1985,
  ZapRequest = 9734,
  Zap = 9735,
  MuteList = 10000,
  PinList = 10001,
  RelayListMetadata = 10002,
  WalletInfo = 13194,
  ClientAuthentication = 22242,
  WalletRequest = 23194,
  WalletResponse = 23195,
  NostrConnect = 24133,
  HttpAuth = 27235,
  CategorizedPeopleList = 30000,
  CategorizedBookmarkList = 30001,
  ProfileBadges = 30008,
  BadgeDefinition = 30009,
  CreateOrUpdateStall = 30017,
  CreateOrUpdateProduct = 30018,
  LongFormContent = 30023,
  ApplicationSpecificData = 30078,
  HandlerRecommendation = 31989,
  HandlerInformation = 31990,
}

/** Key for tag query. Normally only the form `#` followed by a single-letter is permitted. See also [NIP-12](https://github.com/nostr-protocol/nips/blob/master/12.md). */
export type TagName = `#${string}`;

export type Filter = {
  ids?: string[];
  kinds?: number[];
  authors?: string[];
  since?: number;
  until?: number;
  limit?: number;
  search?: string; // cf. NIP-50
} & {
  [key in TagName]?: string[];
};

/** JSON messages sent from clients to relays via WebSocket, and related types. */
export namespace ToRelayMessage {
  /** Possbile messages from relays to clients. */
  export type Any = AUTH | CLOSE | COUNT | EVENT | REQ;
  /** Message type, which is put at the first of message tuples. */
  export type Type = Any[0];
  /** Map message type to message. */
  export type Message<T extends Type> = {
    [T in Any as T[0]]: T;
  }[T];

  /** AUTH message. See also [NIP-42](https://github.com/nostr-protocol/nips/blob/master/42.md). */
  export type AUTH = [type: "AUTH", event: Event<Kind.ClientAuthentication>];
  /** CLOSE message. See also [NIP-01](https://github.com/nostr-protocol/nips/blob/master/01.md). */
  export type CLOSE = [type: "CLOSE", subId: string];
  /** COUNT message. See also [NIP-45](https://github.com/nostr-protocol/nips/blob/master/45.md). */
  export type COUNT = [type: "COUNT", subId: string, ...filters: Filter[]];
  /** EVENT message. See also [NIP-01](https://github.com/nostr-protocol/nips/blob/master/01.md). */
  export type EVENT = [type: "EVENT", event: Event];
  /** REQ message. See also [NIP-01](https://github.com/nostr-protocol/nips/blob/master/01.md). */
  export type REQ = [type: "REQ", subId: string, ...filters: Filter[]];
}

/** JSON messages sent from relays to clients via WebSocket, and related types. */
export namespace ToClientMessage {
  /** Possbile messages from clients to relays. */
  export type Any = AUTH | COUNT | EOSE | EVENT | NOTICE | OK;
  /** Message type, which is put at the first of message tuples. */
  export type Type = Any[0];
  /** Map message type to message. */
  export type Message<T extends Type> = {
    [T in Any as T[0]]: T;
  }[T];

  /** Message types exchanged in REQ subscriptions. */
  export type Sub = EVENT | EOSE;

  /** AUTH message. See also [NIP-42](https://github.com/nostr-protocol/nips/blob/master/42.md). */
  export type AUTH = [type: "AUTH", challengeMessage: string];
  /** COUNT message. See also [NIP-45](https://github.com/nostr-protocol/nips/blob/master/45.md). */
  export type COUNT = [type: "COUNT", subId: string, count: CountResponse];
  /** EOSE message. See also [NIP-01](https://github.com/nostr-protocol/nips/blob/master/01.md). */
  export type EOSE = [type: "EOSE", subId: string];
  /** EVENT message. See also [NIP-01](https://github.com/nostr-protocol/nips/blob/master/01.md). */
  export type EVENT = [type: "EVENT", subId: string, event: Event];
  /** NOTICE message. See also [NIP-01](https://github.com/nostr-protocol/nips/blob/master/01.md). */
  export type NOTICE = [type: "NOTICE", message: string];
  /** OK message. See also [NIP-20](https://github.com/nostr-protocol/nips/blob/master/20.md). */
  export type OK = [
    type: "OK",
    eventId: string,
    succeeded: boolean,
    message?: string
  ];

  interface CountResponse {
    count: number;
  }
}

export namespace Nip07 {
  export interface Nostr {
    getPublicKey: () => Promise<string>;
    signEvent: (event: {
      kind: number;
      tags: string[][];
      content: string;
      created_at: number;
    }) => Promise<{
      id: string;
      sig: string;
      kind: number;
      tags: string[][];
      pubkey: string;
      content: string;
      created_at: number;
    }>;
    getRelays?: () => Promise<GetRelayResult>;
    nip04?: Nip04Crypto;
  }

  export interface GetRelayResult {
    [url: string]: { read: boolean; write: boolean };
  }

  export interface Nip04Crypto {
    encrypt: (pubkey: string, plaintext: string) => string;
    decrypt: (pubkey: string, ciphertext: string) => string;
  }
}

export namespace Nip11 {
  export interface RelayInfo {
    /** https://github.com/nostr-protocol/nips/blob/master/11.md#name */
    name?: string;
    /** https://github.com/nostr-protocol/nips/blob/master/11.md#description */
    description?: string;
    /** https://github.com/nostr-protocol/nips/blob/master/11.md#pubkey */
    pubkey?: string;
    /** https://github.com/nostr-protocol/nips/blob/master/11.md#contact */
    contact?: string;
    /** https://github.com/nostr-protocol/nips/blob/master/11.md#supported-nips */
    supported_nips?: number[];
    /** https://github.com/nostr-protocol/nips/blob/master/11.md#software */
    software?: string;
    /** https://github.com/nostr-protocol/nips/blob/master/11.md#version */
    version?: string;
    /** https://github.com/nostr-protocol/nips/blob/master/11.md#server-limitations */
    limitation?: ServerLimitations;
    /** https://github.com/nostr-protocol/nips/blob/master/11.md#event-retention */
    retention?: EventRetention[];
    /** https://github.com/nostr-protocol/nips/blob/master/11.md#content-limitations */
    relay_countries?: string[];
    /** https://github.com/nostr-protocol/nips/blob/master/11.md#community-preferences */
    language_tags?: string[];
    /** https://github.com/nostr-protocol/nips/blob/master/11.md#community-preferences */
    tags?: string[];
    /** https://github.com/nostr-protocol/nips/blob/master/11.md#community-preferences */
    posting_policy?: string;
    /** https://github.com/nostr-protocol/nips/blob/master/11.md#pay-to-relay */
    payments_url?: string;
    /** https://github.com/nostr-protocol/nips/blob/master/11.md#pay-to-relay */
    fees?: RelayFees;
    /** https://github.com/nostr-protocol/nips/blob/master/11.md#icon */
    icon?: string;
    [key: string]: unknown;
  }

  export interface ServerLimitations {
    max_message_length?: number;
    max_subscriptions?: number;
    max_filters?: number;
    max_limit?: number;
    max_subid_length?: number;
    min_prefix?: number;
    max_event_tags?: number;
    max_content_length?: number;
    min_pow_difficulty?: number;
    auth_required?: boolean;
    payment_required?: boolean;
  }

  export interface EventRetention {
    kinds?: (number | [start: number, end: number])[];
    time?: number | null;
    count?: number;
  }

  export interface RelayFees {
    admission?: RelayFeeAmount[];
    subscription?: RelayFeeAmount[];
    publication?: RelayFeeAmount[];
  }

  export interface RelayFeeAmount {
    amount?: number;
    unit?: string;
    period?: number;
    kinds?: number[];
  }
}

export {};
