/* eslint-disable @typescript-eslint/no-explicit-any */
import { environment } from "$lib/environment";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { print } from "graphql/language/printer.js";
export type Fetch = (
  info: RequestInfo,
  init?: RequestInit
) => Promise<Response>;

export type GqlFetchResult<TData = any> = {
  data?: TData;
  errors?: any;
};

export type UseQuery = <TData, TVariables>(input: {
  fetch: Fetch;
  operation: TypedDocumentNode<TData, TVariables>;
  variables?: TVariables;
}) => Promise<GqlFetchResult<TData>>;

export const useQuery: UseQuery = async ({ fetch, operation, variables }) => {
  let res: Response;
  try {
    res = await fetch(environment.graphqlEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": environment.graphqlAdminSecret,
      },
      body: JSON.stringify({
        query: print(operation),
        variables,
      }),
    });
  } catch (error) {
    return { errors: error, data: null };
  }

  if (res.ok) {
    const { data, errors } = await res.json();
    return {
      data,
      errors: errors,
    } as GqlFetchResult;
  }
  // Shouldn't ever get this far!
  return { errors: new Error(await res.text()), data: null } as GqlFetchResult;
};
