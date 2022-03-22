import type {
  GetLeagueQuery,
  GetLeagueQueryVariables,
} from "$lib/graphql.types";
import { GetLeagueDocument } from "$lib/graphql.types";
import type { Fetch, GqlFetchResult } from "$lib/utils/useQuery";
import { useQuery } from "$lib/utils/useQuery";

export async function getleague(
  variables: GetLeagueQueryVariables,
  fetch: Fetch
): Promise<GqlFetchResult<GetLeagueQuery>> {
  return useQuery({
    fetch: fetch,
    operation: GetLeagueDocument,
    variables,
  });
}
