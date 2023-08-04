type Query<T> = {
    data?: T
    isError: boolean
    isLoading: boolean
}

type QueryTuple<QueryType, QueryResults extends Query<QueryType>[]> = {
    [Key in keyof QueryResults]: QueryResults[Key]['data'] extends Query<infer U>
        ? U
        : QueryResults[Key]['data']
}

type MultipleQueryResult<QueryType, QueryResults extends Query<QueryType>[]> = {
    data: QueryTuple<QueryType, QueryResults>
    isLoading: boolean
    isError: boolean
}

export function getDataFromMultipleQueries<QueryType, QueryResults extends Query<QueryType>[]>(
    queries: readonly [...QueryResults],
): QueryTuple<QueryType, QueryResults> {
    return queries.map((query) => query.data) as QueryTuple<QueryType, QueryResults>
}

export default function useMultipleQuery<QueryType, QueryResults extends Query<QueryType>[]>(
    queries: readonly [...QueryResults],
): MultipleQueryResult<QueryType, QueryResults> {
    const isLoading = queries.reduce((acc, query) => acc || query.isLoading, false)
    const isError = queries.some((query) => query.isError)

    return {
        data: getDataFromMultipleQueries(queries),
        isLoading,
        isError,
    }
}
