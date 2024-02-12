# GraphQL Query
```graphql
query info($address: String!) {
    users(where:{senderAddr: $address}){
        id
    }
}
```

# JS Expression
```js
function(resp) {
  if (resp != null && (resp.users != null && resp.users.length > 0)) {
     return 1
  }
  return 0
}   
```
