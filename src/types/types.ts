import { GraphQLResolveInfo } from 'graphql';
import { DataSourceContext } from './context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AllUsersResponse = {
  __typename?: 'AllUsersResponse';
  data?: Maybe<Array<Friend>>;
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
  totalUsers?: Maybe<Scalars['Int']['output']>;
};

export type ChatRoom = {
  __typename?: 'ChatRoom';
  email: Scalars['String']['output'];
  fName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isLastMessageSeen: Scalars['Boolean']['output'];
  lName: Scalars['String']['output'];
  lastMessage?: Maybe<Scalars['String']['output']>;
  lastmessageAuthor: Scalars['String']['output'];
  profile?: Maybe<Scalars['String']['output']>;
  unSeenMessageCount: Scalars['Int']['output'];
  userId: Scalars['String']['output'];
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  authorId: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  likes: Array<CommentLikes>;
  post: Post;
  postId: Scalars['String']['output'];
  replies: Array<CommentReply>;
  updatedAt: Scalars['String']['output'];
};

export type CommentLikes = {
  __typename?: 'CommentLikes';
  comment: Comment;
  commentId: Scalars['String']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type CommentReply = {
  __typename?: 'CommentReply';
  reply: Comment;
  replyId: Scalars['String']['output'];
};

export type CreateChatRoomResponse = {
  __typename?: 'CreateChatRoomResponse';
  data?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type File = {
  __typename?: 'File';
  encoding: Scalars['String']['output'];
  fileName: Scalars['String']['output'];
  mimeType: Scalars['String']['output'];
};

export type Friend = {
  __typename?: 'Friend';
  email: Scalars['String']['output'];
  fName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  lName: Scalars['String']['output'];
  profile?: Maybe<Scalars['String']['output']>;
};

export type FriendRequest = {
  __typename?: 'FriendRequest';
  from: Friend;
  status: Status;
  to: Friend;
};

export type FriendRequestResponse = {
  __typename?: 'FriendRequestResponse';
  count: Scalars['Int']['output'];
  data: Array<FriendRequest>;
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type GetAllPostArgs = {
  page: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export type GetAllPostResponse = {
  __typename?: 'GetAllPostResponse';
  message: Scalars['String']['output'];
  posts?: Maybe<Array<Post>>;
  status: Scalars['Boolean']['output'];
  totalNumberOfPosts?: Maybe<Scalars['Int']['output']>;
};

export type GetChatRoomResponse = {
  __typename?: 'GetChatRoomResponse';
  data: Array<ChatRoom>;
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type GetMessageByRoomResponse = {
  __typename?: 'GetMessageByRoomResponse';
  _count?: Maybe<Scalars['Int']['output']>;
  data: Array<Message>;
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type GetPostByUserIdResponse = {
  __typename?: 'GetPostByUserIdResponse';
  message: Scalars['String']['output'];
  posts?: Maybe<Array<Post>>;
  status: Scalars['Boolean']['output'];
};

export type LoggedInUserResponse = {
  __typename?: 'LoggedInUserResponse';
  data?: Maybe<User>;
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type Message = {
  __typename?: 'Message';
  author: User;
  authorId: Scalars['String']['output'];
  chatRoomId: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  groupChatId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isSeen: Scalars['Boolean']['output'];
};

export type MessageByRoomIdParams = {
  roomId: Scalars['String']['input'];
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Accept incoming request */
  acceptFriendRequest?: Maybe<CreateChatRoomResponse>;
  /** Delete Friend Request */
  deleteFriendRequest?: Maybe<SentRequestResponse>;
  deleteMessage?: Maybe<Response>;
  deletePost: GetPostByUserIdResponse;
  likePost: GetPostByUserIdResponse;
  logout?: Maybe<Response>;
  sendMessage?: Maybe<SendMessageResponse>;
  /** Send friend request to other user */
  sendRequest?: Maybe<SentRequestResponse>;
  unlikePost: GetPostByUserIdResponse;
  updatePost?: Maybe<UploadAPostResponse>;
  updateUser?: Maybe<UpdateUserResponse>;
  uploadPost: UploadAPostResponse;
};


export type MutationAcceptFriendRequestArgs = {
  fromId: Scalars['String']['input'];
  toId: Scalars['String']['input'];
};


export type MutationDeleteFriendRequestArgs = {
  fromId: Scalars['String']['input'];
  toId: Scalars['String']['input'];
};


export type MutationDeleteMessageArgs = {
  messageId: Scalars['String']['input'];
};


export type MutationDeletePostArgs = {
  id: Scalars['String']['input'];
};


export type MutationLikePostArgs = {
  postId: Scalars['String']['input'];
};


export type MutationLogoutArgs = {
  email: Scalars['String']['input'];
};


export type MutationSendMessageArgs = {
  author: Scalars['String']['input'];
  content: Scalars['String']['input'];
  roomId: Scalars['String']['input'];
};


export type MutationSendRequestArgs = {
  toId: Scalars['String']['input'];
};


export type MutationUnlikePostArgs = {
  postId: Scalars['String']['input'];
};


export type MutationUpdatePostArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserArgs = {
  bio?: InputMaybe<Scalars['String']['input']>;
  coverPicture?: InputMaybe<Scalars['String']['input']>;
  fName?: InputMaybe<Scalars['String']['input']>;
  lName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  profile?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUploadPostArgs = {
  body?: InputMaybe<PostInput>;
};

export enum Order {
  Asc = 'asc',
  Desc = 'desc'
}

export type Post = {
  __typename?: 'Post';
  _count?: Maybe<_Count>;
  author?: Maybe<User>;
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  hasLiked: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  images: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type PostInput = {
  content: Scalars['String']['input'];
  images?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title: Scalars['String']['input'];
};

export type PostLike = {
  __typename?: 'PostLike';
  id: Scalars['ID']['output'];
  post: Post;
  postId: Scalars['String']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** a list of all the users */
  allUsers?: Maybe<AllUsersResponse>;
  getAllChatRooms: GetChatRoomResponse;
  getAllPosts?: Maybe<GetAllPostResponse>;
  getChatRoomById: ChatRoom;
  /** Get all incoming request */
  getFriendRequest?: Maybe<FriendRequestResponse>;
  getMessagesByRoomId?: Maybe<GetMessageByRoomResponse>;
  getPostByUserId?: Maybe<GetPostByUserIdResponse>;
  /** Get list of ALL SENT request */
  getSentFriendRequest?: Maybe<FriendRequestResponse>;
  /** a list of all the users */
  loggedInUser?: Maybe<LoggedInUserResponse>;
};


export type QueryAllUsersArgs = {
  params?: InputMaybe<AllUser>;
};


export type QueryGetAllChatRoomsArgs = {
  contains?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetAllPostsArgs = {
  args?: InputMaybe<GetAllPostArgs>;
};


export type QueryGetChatRoomByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetMessagesByRoomIdArgs = {
  input?: InputMaybe<MessageByRoomIdParams>;
};


export type QueryGetPostByUserIdArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetSentFriendRequestArgs = {
  page: Scalars['Int']['input'];
  search: Scalars['String']['input'];
  take: Scalars['Int']['input'];
};

export type Response = {
  __typename?: 'Response';
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type SendMessageResponse = {
  __typename?: 'SendMessageResponse';
  data?: Maybe<Message>;
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type SentRequestResponse = {
  __typename?: 'SentRequestResponse';
  data?: Maybe<FriendRequest>;
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type Session = {
  __typename?: 'Session';
  associate: User;
  timeStamps: Scalars['String']['output'];
  token: Scalars['String']['output'];
  userEmail: Scalars['String']['output'];
};

export type SignUpUserParams = {
  email: Scalars['String']['input'];
  fName: Scalars['String']['input'];
  lName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export enum Status {
  Accepted = 'ACCEPTED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type Subscription = {
  __typename?: 'Subscription';
  newMessage?: Maybe<Message>;
  newPost?: Maybe<Post>;
};

export type UpdateUserResponse = {
  __typename?: 'UpdateUserResponse';
  data?: Maybe<User>;
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type UploadAPostResponse = {
  __typename?: 'UploadAPostResponse';
  message: Scalars['String']['output'];
  result?: Maybe<Post>;
  status: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']['output']>;
  coverPicture?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  fName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  lName: Scalars['String']['output'];
  profile?: Maybe<Scalars['String']['output']>;
};

export type _Count = {
  __typename?: '_count';
  comments: Scalars['Int']['output'];
  likes: Scalars['Int']['output'];
};

export type AllUser = {
  order: Order;
  page: Scalars['Int']['input'];
  search: Scalars['String']['input'];
  take: Scalars['Int']['input'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AllUsersResponse: ResolverTypeWrapper<AllUsersResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ChatRoom: ResolverTypeWrapper<ChatRoom>;
  Comment: ResolverTypeWrapper<Comment>;
  CommentLikes: ResolverTypeWrapper<CommentLikes>;
  CommentReply: ResolverTypeWrapper<CommentReply>;
  CreateChatRoomResponse: ResolverTypeWrapper<CreateChatRoomResponse>;
  File: ResolverTypeWrapper<File>;
  Friend: ResolverTypeWrapper<Friend>;
  FriendRequest: ResolverTypeWrapper<FriendRequest>;
  FriendRequestResponse: ResolverTypeWrapper<FriendRequestResponse>;
  GetAllPostArgs: GetAllPostArgs;
  GetAllPostResponse: ResolverTypeWrapper<GetAllPostResponse>;
  GetChatRoomResponse: ResolverTypeWrapper<GetChatRoomResponse>;
  GetMessageByRoomResponse: ResolverTypeWrapper<GetMessageByRoomResponse>;
  GetPostByUserIdResponse: ResolverTypeWrapper<GetPostByUserIdResponse>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LoggedInUserResponse: ResolverTypeWrapper<LoggedInUserResponse>;
  Message: ResolverTypeWrapper<Message>;
  MessageByRoomIdParams: MessageByRoomIdParams;
  Mutation: ResolverTypeWrapper<{}>;
  Order: Order;
  Post: ResolverTypeWrapper<Post>;
  PostInput: PostInput;
  PostLike: ResolverTypeWrapper<PostLike>;
  Query: ResolverTypeWrapper<{}>;
  Response: ResolverTypeWrapper<Response>;
  SendMessageResponse: ResolverTypeWrapper<SendMessageResponse>;
  SentRequestResponse: ResolverTypeWrapper<SentRequestResponse>;
  Session: ResolverTypeWrapper<Session>;
  SignUpUserParams: SignUpUserParams;
  Status: Status;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  UpdateUserResponse: ResolverTypeWrapper<UpdateUserResponse>;
  UploadAPostResponse: ResolverTypeWrapper<UploadAPostResponse>;
  User: ResolverTypeWrapper<User>;
  _count: ResolverTypeWrapper<_Count>;
  allUser: AllUser;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AllUsersResponse: AllUsersResponse;
  Boolean: Scalars['Boolean']['output'];
  ChatRoom: ChatRoom;
  Comment: Comment;
  CommentLikes: CommentLikes;
  CommentReply: CommentReply;
  CreateChatRoomResponse: CreateChatRoomResponse;
  File: File;
  Friend: Friend;
  FriendRequest: FriendRequest;
  FriendRequestResponse: FriendRequestResponse;
  GetAllPostArgs: GetAllPostArgs;
  GetAllPostResponse: GetAllPostResponse;
  GetChatRoomResponse: GetChatRoomResponse;
  GetMessageByRoomResponse: GetMessageByRoomResponse;
  GetPostByUserIdResponse: GetPostByUserIdResponse;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  LoggedInUserResponse: LoggedInUserResponse;
  Message: Message;
  MessageByRoomIdParams: MessageByRoomIdParams;
  Mutation: {};
  Post: Post;
  PostInput: PostInput;
  PostLike: PostLike;
  Query: {};
  Response: Response;
  SendMessageResponse: SendMessageResponse;
  SentRequestResponse: SentRequestResponse;
  Session: Session;
  SignUpUserParams: SignUpUserParams;
  String: Scalars['String']['output'];
  Subscription: {};
  UpdateUserResponse: UpdateUserResponse;
  UploadAPostResponse: UploadAPostResponse;
  User: User;
  _count: _Count;
  allUser: AllUser;
};

export type AllUsersResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['AllUsersResponse'] = ResolversParentTypes['AllUsersResponse']> = {
  data?: Resolver<Maybe<Array<ResolversTypes['Friend']>>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  totalUsers?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatRoomResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['ChatRoom'] = ResolversParentTypes['ChatRoom']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isLastMessageSeen?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastmessageAuthor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  unSeenMessageCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  authorId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likes?: Resolver<Array<ResolversTypes['CommentLikes']>, ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  replies?: Resolver<Array<ResolversTypes['CommentReply']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentLikesResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['CommentLikes'] = ResolversParentTypes['CommentLikes']> = {
  comment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType>;
  commentId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentReplyResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['CommentReply'] = ResolversParentTypes['CommentReply']> = {
  reply?: Resolver<ResolversTypes['Comment'], ParentType, ContextType>;
  replyId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateChatRoomResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['CreateChatRoomResponse'] = ResolversParentTypes['CreateChatRoomResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FileResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  encoding?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fileName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mimeType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FriendResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Friend'] = ResolversParentTypes['Friend']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FriendRequestResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['FriendRequest'] = ResolversParentTypes['FriendRequest']> = {
  from?: Resolver<ResolversTypes['Friend'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['Friend'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FriendRequestResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['FriendRequestResponse'] = ResolversParentTypes['FriendRequestResponse']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  data?: Resolver<Array<ResolversTypes['FriendRequest']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetAllPostResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['GetAllPostResponse'] = ResolversParentTypes['GetAllPostResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  posts?: Resolver<Maybe<Array<ResolversTypes['Post']>>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  totalNumberOfPosts?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetChatRoomResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['GetChatRoomResponse'] = ResolversParentTypes['GetChatRoomResponse']> = {
  data?: Resolver<Array<ResolversTypes['ChatRoom']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetMessageByRoomResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['GetMessageByRoomResponse'] = ResolversParentTypes['GetMessageByRoomResponse']> = {
  _count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  data?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetPostByUserIdResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['GetPostByUserIdResponse'] = ResolversParentTypes['GetPostByUserIdResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  posts?: Resolver<Maybe<Array<ResolversTypes['Post']>>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoggedInUserResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['LoggedInUserResponse'] = ResolversParentTypes['LoggedInUserResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  authorId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  chatRoomId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  groupChatId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isSeen?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  acceptFriendRequest?: Resolver<Maybe<ResolversTypes['CreateChatRoomResponse']>, ParentType, ContextType, RequireFields<MutationAcceptFriendRequestArgs, 'fromId' | 'toId'>>;
  deleteFriendRequest?: Resolver<Maybe<ResolversTypes['SentRequestResponse']>, ParentType, ContextType, RequireFields<MutationDeleteFriendRequestArgs, 'fromId' | 'toId'>>;
  deleteMessage?: Resolver<Maybe<ResolversTypes['Response']>, ParentType, ContextType, RequireFields<MutationDeleteMessageArgs, 'messageId'>>;
  deletePost?: Resolver<ResolversTypes['GetPostByUserIdResponse'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'id'>>;
  likePost?: Resolver<ResolversTypes['GetPostByUserIdResponse'], ParentType, ContextType, RequireFields<MutationLikePostArgs, 'postId'>>;
  logout?: Resolver<Maybe<ResolversTypes['Response']>, ParentType, ContextType, RequireFields<MutationLogoutArgs, 'email'>>;
  sendMessage?: Resolver<Maybe<ResolversTypes['SendMessageResponse']>, ParentType, ContextType, RequireFields<MutationSendMessageArgs, 'author' | 'content' | 'roomId'>>;
  sendRequest?: Resolver<Maybe<ResolversTypes['SentRequestResponse']>, ParentType, ContextType, RequireFields<MutationSendRequestArgs, 'toId'>>;
  unlikePost?: Resolver<ResolversTypes['GetPostByUserIdResponse'], ParentType, ContextType, RequireFields<MutationUnlikePostArgs, 'postId'>>;
  updatePost?: Resolver<Maybe<ResolversTypes['UploadAPostResponse']>, ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'id'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['UpdateUserResponse']>, ParentType, ContextType, Partial<MutationUpdateUserArgs>>;
  uploadPost?: Resolver<ResolversTypes['UploadAPostResponse'], ParentType, ContextType, Partial<MutationUploadPostArgs>>;
};

export type PostResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  _count?: Resolver<Maybe<ResolversTypes['_count']>, ParentType, ContextType>;
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasLiked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostLikeResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['PostLike'] = ResolversParentTypes['PostLike']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  allUsers?: Resolver<Maybe<ResolversTypes['AllUsersResponse']>, ParentType, ContextType, Partial<QueryAllUsersArgs>>;
  getAllChatRooms?: Resolver<ResolversTypes['GetChatRoomResponse'], ParentType, ContextType, Partial<QueryGetAllChatRoomsArgs>>;
  getAllPosts?: Resolver<Maybe<ResolversTypes['GetAllPostResponse']>, ParentType, ContextType, Partial<QueryGetAllPostsArgs>>;
  getChatRoomById?: Resolver<ResolversTypes['ChatRoom'], ParentType, ContextType, RequireFields<QueryGetChatRoomByIdArgs, 'id'>>;
  getFriendRequest?: Resolver<Maybe<ResolversTypes['FriendRequestResponse']>, ParentType, ContextType>;
  getMessagesByRoomId?: Resolver<Maybe<ResolversTypes['GetMessageByRoomResponse']>, ParentType, ContextType, Partial<QueryGetMessagesByRoomIdArgs>>;
  getPostByUserId?: Resolver<Maybe<ResolversTypes['GetPostByUserIdResponse']>, ParentType, ContextType, RequireFields<QueryGetPostByUserIdArgs, 'userId'>>;
  getSentFriendRequest?: Resolver<Maybe<ResolversTypes['FriendRequestResponse']>, ParentType, ContextType, RequireFields<QueryGetSentFriendRequestArgs, 'page' | 'search' | 'take'>>;
  loggedInUser?: Resolver<Maybe<ResolversTypes['LoggedInUserResponse']>, ParentType, ContextType>;
};

export type ResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SendMessageResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['SendMessageResponse'] = ResolversParentTypes['SendMessageResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SentRequestResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['SentRequestResponse'] = ResolversParentTypes['SentRequestResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['FriendRequest']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SessionResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Session'] = ResolversParentTypes['Session']> = {
  associate?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  timeStamps?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userEmail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  newMessage?: SubscriptionResolver<Maybe<ResolversTypes['Message']>, "newMessage", ParentType, ContextType>;
  newPost?: SubscriptionResolver<Maybe<ResolversTypes['Post']>, "newPost", ParentType, ContextType>;
};

export type UpdateUserResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['UpdateUserResponse'] = ResolversParentTypes['UpdateUserResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UploadAPostResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['UploadAPostResponse'] = ResolversParentTypes['UploadAPostResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  result?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coverPicture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _CountResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['_count'] = ResolversParentTypes['_count']> = {
  comments?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  likes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = DataSourceContext> = {
  AllUsersResponse?: AllUsersResponseResolvers<ContextType>;
  ChatRoom?: ChatRoomResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  CommentLikes?: CommentLikesResolvers<ContextType>;
  CommentReply?: CommentReplyResolvers<ContextType>;
  CreateChatRoomResponse?: CreateChatRoomResponseResolvers<ContextType>;
  File?: FileResolvers<ContextType>;
  Friend?: FriendResolvers<ContextType>;
  FriendRequest?: FriendRequestResolvers<ContextType>;
  FriendRequestResponse?: FriendRequestResponseResolvers<ContextType>;
  GetAllPostResponse?: GetAllPostResponseResolvers<ContextType>;
  GetChatRoomResponse?: GetChatRoomResponseResolvers<ContextType>;
  GetMessageByRoomResponse?: GetMessageByRoomResponseResolvers<ContextType>;
  GetPostByUserIdResponse?: GetPostByUserIdResponseResolvers<ContextType>;
  LoggedInUserResponse?: LoggedInUserResponseResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostLike?: PostLikeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Response?: ResponseResolvers<ContextType>;
  SendMessageResponse?: SendMessageResponseResolvers<ContextType>;
  SentRequestResponse?: SentRequestResponseResolvers<ContextType>;
  Session?: SessionResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  UpdateUserResponse?: UpdateUserResponseResolvers<ContextType>;
  UploadAPostResponse?: UploadAPostResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  _count?: _CountResolvers<ContextType>;
};

