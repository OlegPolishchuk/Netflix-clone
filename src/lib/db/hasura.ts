import * as process from "process";

const HASURA_ADMIN_URL = process.env.NEXT_PUBLIC_HASURA_ADMIN_URL as string;
const HASURA_ADMIN_SECRET = process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET as string;


export const queryHasuraGQL = async (
  operationsDoc: string,
  operationName: string,
  variables: Record<string, any>
) => {
  const result = await fetch(HASURA_ADMIN_URL, {
    method: 'POST',
    headers: {
      'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik9sZWciLCJpYXQiOjE2Nzg5NjA2MzUsImV4cCI6MTY3OTU2NTUyMiwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIiwiYWRtaW4iXSwieC1oYXN1cmEtdXNlci1pZCI6Im5vdE9sZWcifX0.38i_5bPxukHVRX1mMATYzeUQPL---VEpJqPq9zyIbKk'
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables,
      operationName,
    }),
  });


  return await result.json();
}
