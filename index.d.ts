/**
 * Event, which is the basic data structure exchanged over WebSocket.
 *
 * See also [NIP-01](https://github.com/nostr-protocol/nips/blob/master/01.md#events-and-signatures).
 */
export interface Event<K extends number = number> {
  id: string;
  sig: string;
  kind: K;
  tags: Tag.Any[];
  pubkey: string;
  content: string;
  created_at: number;
  /** See also [NIP-03](https://github.com/nostr-protocol/nips/blob/master/03.md). */
  ots?: string;
}

/**
 * All information needed to calculate the Event ID and signature.
 */
export interface UnsignedEvent<K extends number = number> {
  kind: K;
  tags: Tag.Any[];
  pubkey: string;
  content: string;
  created_at: number;
}

/**
 * The minimum information that the end user should have in order to create a signed Event.
 */
export interface EventParameters<K extends number = number> {
  id?: string;
  sig?: string;
  kind: K;
  tags?: Tag.Any[];
  pubkey?: string;
  content: string;
  created_at?: number;
  /** See also [NIP-03](https://github.com/nostr-protocol/nips/blob/master/03.md). */
  ots?: string;
}

export namespace Kind {
  /**
   * Contains a JSON object describing the user who created the Event.
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
   * Contains the URL of a relay that the Event creator wants to recommend to its followers.
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
   * Contains a kind1 (`Kind.Text`) Event JSON that the user wants to share.
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
   * Contains a single `a` tag referencing BadgeDefinition Event
   * and one or more `p` tag, one for each pubkey the badge issuer wishes to award.
   *
   * See also kind30009 (`Kind.BadgeDefinition`), kind30008 (`Kind.ProfileBadges`),
   * and [NIP-58](https://github.com/nostr-protocol/nips/blob/master/58.md)
   */
  export type BadgeAward = 8;
  /**
   * Contains an Event JSON that the user wants to share.
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
  export type OpenTimestamps = 1040;
  export type FileMetadata = 1063;
  export type LiveChatMessage = 1311;
  export type ProblemTracker = 1971;
  export type Reporting = 1984;
  export type Label = 1985;
  export type CommunityPostApproval = 4550;
  export type JobRequest = 5999;
  export type JobResult = 6999;
  export type JobFeedback = 7000;
  export type ZapGoal = 9041;
  export type ZapRequest = 9734;
  export type Zap = 9735;
  export type Highlights = 9802;
  export type MuteList = 10000;
  export type PinList = 10001;
  export type RelayListMetadata = 10002;
  export type BookmarkList = 10003;
  export type CommunitiesList = 10004;
  export type PublicChatsList = 10005;
  export type BlockedRelaysList = 10006;
  export type SearchRelaysList = 10007;
  export type InterestsList = 10015;
  export type UserEmojiList = 10030;
  export type WalletInfo = 13194;
  export type LightningPubRPC = 21000;
  export type ClientAuthentication = 22242;
  export type WalletRequest = 23194;
  export type WalletResponse = 23195;
  export type NostrConnect = 24133;
  export type HttpAuth = 27235;
  export type CategorizedPeopleList = 30000;
  export type CategorizedBookmarkList = 30001;
  export type Relaysets = 30002;
  export type Bookmarksets = 30003;
  export type Curationsets = 30004;
  export type ProfileBadges = 30008;
  export type BadgeDefinition = 30009;
  export type Interestsets = 30015;
  export type CreateOrUpdateStall = 30017;
  export type CreateOrUpdateProduct = 30018;
  export type LongFormContent = 30023;
  export type DraftLong = 30024;
  export type Emojisets = 30030;
  export type ApplicationSpecificData = 30078;
  export type LiveEvent = 30311;
  export type UserStatuses = 30315;
  export type ClassifiedListing = 30402;
  export type DraftClassifiedListing = 30403;
  export type Date = 31922;
  export type Time = 31923;
  export type Calendar = 31924;
  export type CalendarEventRSVP = 31925;
  export type HandlerRecommendation = 31989;
  export type HandlerInformation = 31990;
  export type CommunityDefinition = 34550;
}

/**
 * Key for tag query. Normally only the form `#` followed by a single-letter is permitted,
 * but the restriction is relaxed here for convenience.
 *
 * See also [NIP-12](https://github.com/nostr-protocol/nips/blob/master/12.md).
 */
export type TagQuery = `#${string}`;

/**
 * @deprecated It has been renamed to `TagQuery`. Use `TagQuery` instead.
 */
export type TagName = TagQuery;

export type Filter = {
  ids?: string[];
  kinds?: number[];
  authors?: string[];
  since?: number;
  until?: number;
  limit?: number;
  /** See [NIP-50](https://github.com/nostr-protocol/nips/blob/master/50.md). */
  search?: string;
} & {
  [key in TagQuery]?: string[];
};

export namespace Tag {
  export type Any = string[];

  /**
   * Associate the tagged Event with the specified Replaceable Event.
   *
   * See also [NIP-01](https://github.com/nostr-protocol/nips/blob/master/01.md#tags) and [NIP-10](https://github.com/nostr-protocol/nips/blob/master/10.md).
   */
  export type a = [
    tagName: "a",
    specifier: ReplaceableEventSpecifier,
    relayUrl?: string
  ];

  /**
   * Associate the tagged Event with the specified Event.
   *
   * See also [NIP-01](https://github.com/nostr-protocol/nips/blob/master/01.md#tags) and [NIP-10](https://github.com/nostr-protocol/nips/blob/master/10.md).
   */
  export type e = [
    tagName: "e",
    eventId: string,
    relayUrl?: string,
    marker?: EventMarker
  ];

  /**
   * Associate the tagged Kind0 (Metadata) Event with the specified external identity.
   *
   * See also [NIP-39](https://github.com/nostr-protocol/nips/blob/master/39.md)
   */
  export type i = [
    tagName: "i",
    identity: IdentificationSpecifier,
    proof: string
  ];

  /**
   * Introduce label namespace.
   *
   * See also [NIP-32](https://github.com/nostr-protocol/nips/blob/master/32.md).
   */
  export type L = [tagName: "L", namespace: string | "ugc"];

  /**
   * Associate the tagged Event with a label.
   * Note that the 4th element must be a JSON string that can be parsed into `LabelAnnotation`.
   *
   * See also [NIP-32](https://github.com/nostr-protocol/nips/blob/master/32.md).
   */
  export type l = [
    tagName: "l",
    labelValue: string,
    namespace: string,
    annotation?: string
  ];

  /**
   * Associate the tagged Event with the specified pubkey.
   *
   * See also [NIP-01](https://github.com/nostr-protocol/nips/blob/master/01.md#tags).
   */
  export type p = [tagName: "p", pubkey: string, relayUrl?: string];

  export type r =
    | [tagName: "r", reference: string]
    | [tagName: "r", relayUrl: string, mode?: "read" | "write"];

  export type t = [tagName: "t", hashtag: string];

  /**
   * Used for PoW.
   *
   * See also [NIP-13](https://github.com/nostr-protocol/nips/blob/master/13.md).
   */
  export type nonce = [tagName: "nonce", nonce: string, defficulty: string];

  /**
   * Associate the tagged Kind1 Event with the specified title.
   *
   * See also [NIP-14](https://github.com/nostr-protocol/nips/blob/master/14.md).
   */
  export type subject = [tagName: "subject", subject: string];

  /**
   * Associate the tagged Kind30023 (LongFormContent) Event with the specified title.
   *
   * See also [NIP-23](https://github.com/nostr-protocol/nips/blob/master/23.md#metadata).
   */
  export type title = [tagName: "title", title: string];

  /**
   * Associate the tagged Kind30023 (LongFormContent) Event with the specified title.
   *
   * See also [NIP-23](https://github.com/nostr-protocol/nips/blob/master/23.md#metadata).
   */
  export type image = [tagName: "image", src: string];

  /**
   * Associate the tagged Kind30023 (LongFormContent) Event with the specified summary.
   *
   * See also [NIP-23](https://github.com/nostr-protocol/nips/blob/master/23.md#metadata).
   */
  export type summary = [tagName: "summary", summary: string];

  /**
   * Associate the tagged Kind30023 (LongFormContent) Event with the specified publish datetime.
   *
   * See also [NIP-23](https://github.com/nostr-protocol/nips/blob/master/23.md#metadata).
   */
  export type published_at = [tagName: "published_at", published_at: string];

  /**
   * Enable a custom emoji.
   *
   * See also [NIP-30](https://github.com/nostr-protocol/nips/blob/master/30.md) and [NIP-25](https://github.com/nostr-protocol/nips/blob/master/25.md).
   */
  export type emoji = [tagName: "emoji", shortcode: string, src: string];

  /**
   * Associate the tagged Event with an alt text for clients not supporting the Kind of the Event.
   *
   * See also [NIP-31](https://github.com/nostr-protocol/nips/blob/master/31.md)
   */
  export type alt = [tagName: "alt", altText: string];

  /**
   * Associate the tagged Event with a content warning.
   *
   * See also [NIP-36](https://github.com/nostr-protocol/nips/blob/master/36.md).
   */
  export type content_warning = [tagName: "content-warning", reason?: string];

  /**
   * See [NIP-40](https://github.com/nostr-protocol/nips/blob/master/40.md) and [NIP-38](https://github.com/nostr-protocol/nips/blob/master/36.md).
   */
  export type expiration = [tagName: "expiration", expiration: string];

  /**
   * See [NIP-42](https://github.com/nostr-protocol/nips/blob/master/42.md).
   */
  export type relay = [tagName: "relay", relayUrl: string];

  /**
   * See [NIP-42](https://github.com/nostr-protocol/nips/blob/master/42.md).
   */
  export type challenge = [tagName: "challenge", challengeString: string];

  // TODO (Pull-Request welcome!):
  // - https://github.com/nostr-protocol/nips/blob/master/48.md
  // - https://github.com/nostr-protocol/nips/blob/master/52.md
  // - https://github.com/nostr-protocol/nips/blob/master/53.md
  // - https://github.com/nostr-protocol/nips/blob/master/56.md
  // - https://github.com/nostr-protocol/nips/blob/master/57.md
  // - https://github.com/nostr-protocol/nips/blob/master/58.md
  // - https://github.com/nostr-protocol/nips/blob/master/75.md
  // - https://github.com/nostr-protocol/nips/blob/master/94.md
  // - https://github.com/nostr-protocol/nips/blob/master/98.md
  // - https://github.com/nostr-protocol/nips/blob/master/99.md
}

/**
 * Used in `a` tag.
 *
 * - The 1st part specifies a Kind.
 * - The 2nd part specifies a pubkey.
 * - The optional 3rd part specifies `d` tag value.
 */
export type ReplaceableEventSpecifier = `${number}:${string}:${string}`;

/**
 * Used in `e` tag.
 */
export type EventMarker = "reply" | "root" | "mention";

/**
 * Used in `i` tag.
 */
export type IdentificationSpecifier = `${ExternalPlatform}:${string}`;

/**
 * Used in `i` tag.
 */
export type ExternalPlatform = "github" | "twitter" | "mastodon" | "telegram";

/**
 * Used in `l` tag.
 */
export interface LabelAnnotation {
  quality?: number;
  confidence?: number;
  context?: string[];
  [key: string]: unknown;
}

export namespace Content {
  /**
   * Content of Kind0.
   */
  export interface Metadata {
    /**
     * Name of the user who created the Kind0 Event.
     *
     * See also [NIP-01](https://github.com/nostr-protocol/nips/blob/master/01.md#kinds)
     */
    name?: string;
    /** @deprecated Should use `name` instead. */
    username?: string;
    /**
     * A bigger name with richer characters than `name`.
     * Implementations should fallback to `name` when this is not available.
     *
     * See also [NIP-24](https://github.com/nostr-protocol/nips/blob/master/24.md#kind-0).
     */
    display_name?: string;
    /** @deprecated Should use `display_name` instead. */
    displayName?: string;
    /**
     * Describe the user who created the Kind0 Event.
     *
     * See also [NIP-01](https://github.com/nostr-protocol/nips/blob/master/01.md#kinds)
     */
    about?: string;
    /**
     * An URL to picture to be displayed as the user's avatar.
     *
     * See also [NIP-01](https://github.com/nostr-protocol/nips/blob/master/01.md#kinds)
     */
    picture?: string;
    /**
     * An URL to a wide (~1024x768) picture to be optionally displayed in the background of a profile screen.
     *
     * See also [NIP-24](https://github.com/nostr-protocol/nips/blob/master/24.md#kind-0).
     */
    banner?: string;
    /**
     * An web URL related in any way to the event author.
     *
     * See also [NIP-24](https://github.com/nostr-protocol/nips/blob/master/24.md#kind-0).
     */
    website?: string;
    /**
     * NIP-05(https://github.com/nostr-protocol/nips/blob/master/05.md) identifier.
     */
    nip05?: string;
    lud06?: string;
    lud16?: string;
    [key: string]: unknown;
  }

  /**
   * Content of Kind40-44.
   * Metadata of a Public Chat channel.
   *
   * See also [NIP-28](https://github.com/nostr-protocol/nips/blob/master/28.md).
   */
  export interface PublicChatChannelMetadata {
    name: string;
    about: string;
    picture: string;
  }

  /**
   * Content of Kind24133.
   *
   * See also [NIP-46](https://github.com/nostr-protocol/nips/blob/master/46.md).
   */
  export interface NostrConnectRequest<
    Method extends NostrConnectMethod = NostrConnectMethod
  > {
    id: string;
    method: Method;
    params: NostrConnectPayloadMap[Method]["params"];
  }

  /**
   * Content of Kind24133.
   *
   * See also [NIP-46](https://github.com/nostr-protocol/nips/blob/master/46.md).
   */
  export interface NostrConnectResponse<
    Method extends NostrConnectMethod = NostrConnectMethod
  > {
    id: string;
    result: NostrConnectPayloadMap[Method]["result"];
    error: string;
  }

  // TODO (Pull-Request welcome!): https://github.com/nostr-protocol/nips/blob/master/15.md
  // TODO (Pull-Request welcome!): https://github.com/nostr-protocol/nips/blob/master/47.md
}

export interface NostrConnectPayloadMap {
  describe: {
    params: [];
    result: NostrConnectMethod[];
  };
  get_public_key: {
    params: [];
    result: string;
  };
  sign_event: {
    params: [];
    result: Event;
  };
  connect: {
    params: [pubkey: string];
    result: never;
  };
  disconnect: {
    params: [];
    result: never;
  };
  delegate: {
    params: [delegatee: string, { kind: number; since: number; until: number }];
    result: { from: string; to: string; cond: string; sig: string };
  };
  get_relays: {
    params: [];
    result: { [url: string]: { read: boolean; write: boolean } };
  };
  nip04_encrypt: {
    params: [pubkey: string, plaintext: string];
    result: string;
  };
  nip04_decrypt: {
    params: [pubkey: string, ciphertext: string];
    result: string;
  };
}

export type NostrConnectMethod = keyof NostrConnectPayloadMap;

/** JSON messages sent from clients to relays via WebSocket, and related types. */
export namespace ToRelayMessage {
  /** Possible messages from relays to clients. */
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
  /** Possible messages from clients to relays. */
  export type Any = AUTH | COUNT | EOSE | EVENT | CLOSED | NOTICE | OK;
  /** Message type, which is put at the first of message tuples. */
  export type Type = Any[0];
  /** Map message type to message. */
  export type Message<T extends Type> = {
    [T in Any as T[0]]: T;
  }[T];

  /** Message types exchanged in REQ subscriptions. */
  export type Sub = EVENT | EOSE | CLOSED;

  /** AUTH message. See also [NIP-42](https://github.com/nostr-protocol/nips/blob/master/42.md). */
  export type AUTH = [type: "AUTH", challengeMessage: string];
  /** COUNT message. See also [NIP-45](https://github.com/nostr-protocol/nips/blob/master/45.md). */
  export type COUNT = [type: "COUNT", subId: string, count: CountResponse];
  /** EOSE message. See also [NIP-01](https://github.com/nostr-protocol/nips/blob/master/01.md). */
  export type EOSE = [type: "EOSE", subId: string];
  /** EVENT message. See also [NIP-01](https://github.com/nostr-protocol/nips/blob/master/01.md). */
  export type EVENT = [type: "EVENT", subId: string, event: Event];
  /** CLOSED message. See also [NIP-01](https://github.com/nostr-protocol/nips/blob/master/01.md). */
  export type CLOSED = [
    type: "CLOSED",
    subId: string,
    message: MachineReadablePrefixedMessage | string
  ];
  /** NOTICE message. See also [NIP-01](https://github.com/nostr-protocol/nips/blob/master/01.md). */
  export type NOTICE = [type: "NOTICE", message: string];
  /** OK message. See also [NIP-20](https://github.com/nostr-protocol/nips/blob/master/20.md). */
  export type OK = [
    type: "OK",
    eventId: string,
    succeeded: boolean,
    message: MachineReadablePrefixedMessage | string
  ];
}

export interface CountResponse {
  count: number;
}

/**
 * See also [NIP-01](https://github.com/nostr-protocol/nips/blob/master/01.md#from-relay-to-client-sending-events-and-notices) and [NIP-42](https://github.com/nostr-protocol/nips/blob/master/42.md).
 */
export type MachineReadablePrefix =
  | "duplicate"
  | "pow"
  | "blocked"
  | "rate-limited"
  | "invalid"
  | "error"
  | "auth-required"
  | "restricted";

export type MachineReadablePrefixedMessage =
  `${MachineReadablePrefix}:${string}`;
/** @deprecated Renamed. Use `MachineReadablePrefixedMessage` instead */
export type OkMessageAnnotation = MachineReadablePrefixedMessage;

export namespace Nip05 {
  export interface NostrAddress {
    names: Record<string, string>;
    relays?: Record<string, string[]>;
  }
}

export namespace Nip07 {
  export interface Nostr {
    getPublicKey: () => Promise<string>;
    signEvent: <K extends number>(event: {
      kind: K;
      tags: Tag.Any[];
      content: string;
      created_at: number;
    }) => Promise<Event<K>>;
    getRelays?: () => Promise<GetRelayResult>;
    nip04?: Nip04Crypto;
  }

  export interface GetRelayResult {
    [url: string]: { read: boolean; write: boolean };
  }

  export interface Nip04Crypto {
    encrypt: (pubkey: string, plaintext: string) => Promise<string>;
    decrypt: (pubkey: string, ciphertext: string) => Promise<string>;
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
