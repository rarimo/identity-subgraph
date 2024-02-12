import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts";
import { newMockEvent, describe, test, assert } from "matchstick-as";
import { getBlock, getTransaction } from "./utils";
import { onSBTIdentityProved } from "../src/mappings/SBTIdentityVerifier";
import { SBTIdentityProved } from "../generated/SBTIdentityVerifier/SBTIdentityVerifier";

function createMint(
  identityId: BigInt,
  senderAddr: Address,
  tokenAddr: Address,
  tokenID: BigInt,
  sender: Address,
  block: ethereum.Block,
  tx: ethereum.Transaction,
): SBTIdentityProved {
  let event = changetype<SBTIdentityProved>(newMockEvent());
  event.parameters = new Array();

  event.parameters.push(new ethereum.EventParam("identityId", ethereum.Value.fromUnsignedBigInt(identityId)));
  event.parameters.push(new ethereum.EventParam("senderAddr", ethereum.Value.fromAddress(senderAddr)));
  event.parameters.push(new ethereum.EventParam("tokenAddr", ethereum.Value.fromAddress(tokenAddr)));
  event.parameters.push(new ethereum.EventParam("tokenID", ethereum.Value.fromUnsignedBigInt(tokenID)));

  event.address = sender;
  event.block = block;
  event.transaction = tx;

  return event;
}

const sender = Address.fromString("0x86e98f7d84603AEb97cd1c89A80A9e914f181679");
const block = getBlock(BigInt.fromI32(1), BigInt.fromI32(1));
const tx = getTransaction(Bytes.fromByteArray(Bytes.fromBigInt(BigInt.fromI32(1))));

describe("NFT", () => {
  test("onMint", () => {
    const identityId = BigInt.fromI32(550);
    const senderAddr = Address.fromString("0x86e98f7d84603AEb97cd1c89A80A9e914f181670");
    const tokenAddr = Address.fromString("0x86e98f7d84603AEb97cd1c89A80A9e914f181671");
    const tokenID = BigInt.fromI32(1);

    const event = createMint(identityId, senderAddr, tokenAddr, tokenID, sender, block, tx);

    onSBTIdentityProved(event);

    assert.fieldEquals("User", identityId.toString(), "senderAddr", senderAddr.toHexString());
    assert.fieldEquals("User", identityId.toString(), "tokenAddr", tokenAddr.toHexString());
    assert.fieldEquals("User", identityId.toString(), "tokenID", tokenID.toString());
    assert.fieldEquals("User", identityId.toString(), "transactionHash", tx.hash.toHexString());
  });
});
