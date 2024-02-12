import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { User } from "../../generated/schema";

export function getEntity(id: string): User {
  if (entityExists(id)) {
    const entity = User.load(id);
    // @ts-ignore
    return entity;
  } else {
    throw new Error("Entity doesn't exist");
  }
}

export function createUser(id: string, senderAddr: Address, tokenAddr: Address, tokenID: BigInt, txHash: Bytes): User {
  if (!entityExists(id)) {
    const entity = new User(id);
    entity.senderAddr = senderAddr;
    entity.tokenAddr = tokenAddr;
    entity.tokenID = tokenID;
    entity.transactionHash = txHash;
    return entity;
  } else {
    throw new Error("Entity already exists");
  }
}

export function getOrCreateUser(
  id: string,
  senderAddr: Address = Address.zero(),
  tokenAddr: Address = Address.zero(),
  tokenID: BigInt = BigInt.zero(),
  txHash: Bytes = Bytes.empty(),
): User {
  if (entityExists(id)) {
    // @ts-ignore
    return User.load(id);
  } else {
    return createUser(id, senderAddr, tokenAddr, tokenID, txHash);
  }
}

export function entityExists(id: string): bool {
  return User.load(id) != null;
}
