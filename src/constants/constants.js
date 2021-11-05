export const GRAPHQL_API = 'https://api.partly.com/node-api/graphql'

export const SEARCH_MAKES_QUERY = `
query {
    uvdb{
        search_uvdb_makes(limit:50){
            items{
                id
                name
            }
        }
    }
}
`

export const SEARCH_MODELS_QUERY = `
query getModels($make_id: ID!){
    uvdb{
    search_uvdb_models(uvdb_make_id:$make_id){
        items {
        id
        name
        }
    }
    }
}
`

export const SEARCH_YEAR_QUERY = `
query getYears($model_id: ID!){
    uvdb{
    search_uvdb_years(uvdb_model_id:$model_id){
        items {
        id
        name
        }
    }
    }
} 
`

export const queryFetch = (query, variables) => {
  return fetch(GRAPHQL_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  }).then((res) => res.json())
}
