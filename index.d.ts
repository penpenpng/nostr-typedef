export interface Event<K extends number = number> {
  id: string;
  sig: string;
  kind: K;
  tags: string[][];
  pubkey: string;
  content: string;
  created_at: number;
}

export interface UnsignedEvent<K extends number = number> {
  kind: K;
  tags: string[][];
  pubkey: string;
  content: string;
  created_at: number;
}

export interface EventParameters<K extends number = number> {
  id?: string;
  sig?: string;
  kind: K;
  tags?: string[][];
  pubkey?: string;
  content: string;
  created_at?: number;
}

export namespace Kind {
  /**
   * Contains a JSON object describing the user who created the event.
   *
   * See also [NIP-01](https://github.com/nostr-protocol/nips/blob/master/01.md#basic-event-kinds).
   */
  export type Metadata = 0;
  /**
   * Contains a plaintext content of a note. Client should not parse the content according to any special rules.
   *
   * See also [NIP-01](https://github.com/nostr-protocol/nips/blob/master/01.md#basic-event-kinds).
   */
  export type Text = 1;
  /**
   * Contains the URL of a relay that the event creator wants to recommend to its followers.
   *
   * See also [NIP-01](https://github.com/nostr-protocol/nips/blob/master/01.md#basic-event-kinds).
   */
  export type RecommendRelay = 2;
  /**
   * Contains a followee list defined as having a list of `p` tags.
   *
   * See also [NIP-02](https://github.com/nostr-protocol/nips/blob/master/02.md).
   */
  export type Contacts = 3;
  /**
   * Contains an encrypted direct message.
   *
   * See also [NIP-04](https://github.com/nostr-protocol/nips/blob/master/04.md).
   */
  export type EncryptedDirectMessage = 4;
  /**
   * Contains a deletion request defined as having a list of `e` tags.
   *
   * See also [NIP-09](https://github.com/nostr-protocol/nips/blob/master/09.md).
   */
  export type EventDeletion = 5;
  /**
   * Contains a kind1 (`Kind.Text`) event JSON that the user wants to share.
   * It should be used for "pure" repost. Use kind1 for quote reposts,
   * or kind16 (`Kind.GenericRepost`)for sharing non-kind1 events instead.
   *
   * See also [NIP-18](https://github.com/nostr-protocol/nips/blob/master/18.md).
   */
  export type Repost = 6;
  /**
   * Contains a reaction to other events.
   * It can contain "+" or "-" string, or an emoji,
   * or [NIP-30](https://github.com/nostr-protocol/nips/blob/master/30.md) custom emoji as content.
   *
   * See also [NIP-25](https://github.com/nostr-protocol/nips/blob/master/25.md).
   */
  export type Reaction = 7;
  /**
   * Contains a single `a` tag referencing BadgeDefinition event
   * and one or more `p` tag, one for each pubkey the badge issuer wishes to award.
   *
   * See also kind30009 (`Kind.BadgeDefinition`), kind30008 (`Kind.ProfileBadges`),
   * and [NIP-58](https://github.com/nostr-protocol/nips/blob/master/58.md)
   */
  export type BadgeAward = 8;
  /**
   * Contains an event JSON that the user wants to share.
   * It should be used for non-kind1 events. Use kind6 (`Kind.Repost`) to share kind1 (`Kind.Text`) events.
   *
   * See also [NIP-18](https://github.com/nostr-protocol/nips/blob/master/18.md)
   */
  export type GenericRepost = 16;
  export type ChannelCreation = 40;
  export type ChannelMetadata = 41;
  export type ChannelMessage = 42;
  export type ChannelHideMessage = 43;
  export type ChannelMuteUser = 44;
  export type Blank = 255;
  export type FileMetadata = 1063;
  export type Reporting = 1984;
  export type Label = 1985;
  export type ZapRequest = 9734;
  export type Zap = 9735;
  export type MuteList = 10000;
  export type PinList = 10001;
  export type RelayListMetadata = 10002;
  export type WalletInfo = 13194;
  export type ClientAuthentication = 22242;
  export type WalletRequest = 23194;
  export type WalletResponse = 23195;
  export type NostrConnect = 24133;
  export type HttpAuth = 27235;
  export type CategorizedPeopleList = 30000;
  export type CategorizedBookmarkList = 30001;
  export type ProfileBadges = 30008;
  export type BadgeDefinition = 30009;
  export type CreateOrUpdateStall = 30017;
  export type CreateOrUpdateProduct = 30018;
  export type LongFormContent = 30023;
  export type ApplicationSpecificData = 30078;
  export type HandlerRecommendation = 31989;
  export type HandlerInformation = 31990;
}

/**
 * Key for tag query. Normally only the form `#` followed by a single-letter is permitted.
 *
 * See also [NIP-12](https://github.com/nostr-protocol/nips/blob/master/12.md).
 */
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

  /** AUTH message.See also [NIP-42](https://github.com/nostr-protocol/nips/blob/master/42.md). */
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
