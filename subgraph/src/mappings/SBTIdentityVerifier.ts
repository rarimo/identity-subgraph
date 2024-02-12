import { createUser } from "../entities/User";
import { SBTIdentityProved } from "../../generated/SBTIdentityVerifier/SBTIdentityVerifier";

export function onSBTIdentityProved(event: SBTIdentityProved): void {
  createUser(
    event.params.identityId.toString(),
    event.params.senderAddr,
    event.params.tokenAddr,
    event.params.tokenID,
    event.transaction.hash,
  ).save();
}
