/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export interface FitChainRewardsInterface extends Interface {
  getFunction(
    nameOrSignature: "etnToken" | "owner" | "rewardUser"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "RewardClaimed"): EventFragment;

  encodeFunctionData(functionFragment: "etnToken", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "rewardUser",
    values: [AddressLike, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "etnToken", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rewardUser", data: BytesLike): Result;
}

export namespace RewardClaimedEvent {
  export type InputTuple = [user: AddressLike, amount: BigNumberish];
  export type OutputTuple = [user: string, amount: bigint];
  export interface OutputObject {
    user: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface FitChainRewards extends BaseContract {
  connect(runner?: ContractRunner | null): FitChainRewards;
  waitForDeployment(): Promise<this>;

  interface: FitChainRewardsInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  etnToken: TypedContractMethod<[], [string], "view">;

  owner: TypedContractMethod<[], [string], "view">;

  rewardUser: TypedContractMethod<
    [user: AddressLike, steps: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "etnToken"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "rewardUser"
  ): TypedContractMethod<
    [user: AddressLike, steps: BigNumberish],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "RewardClaimed"
  ): TypedContractEvent<
    RewardClaimedEvent.InputTuple,
    RewardClaimedEvent.OutputTuple,
    RewardClaimedEvent.OutputObject
  >;

  filters: {
    "RewardClaimed(address,uint256)": TypedContractEvent<
      RewardClaimedEvent.InputTuple,
      RewardClaimedEvent.OutputTuple,
      RewardClaimedEvent.OutputObject
    >;
    RewardClaimed: TypedContractEvent<
      RewardClaimedEvent.InputTuple,
      RewardClaimedEvent.OutputTuple,
      RewardClaimedEvent.OutputObject
    >;
  };
}
