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
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables,
      operationName,
    }),
  });


  return await result.json();
}
