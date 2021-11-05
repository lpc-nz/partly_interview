export const SEARCH_REVERSE_YEAR_QUERY = `
query {
    uvdb{
        search_uvdb_years(limit:50){
            items{
                id
                name
            }
        }
    }
} 
`

export const SEARCH_REVERSE_MAKES_QUERY = `
query getMakes($year_id: Int){
    uvdb{
      search_uvdb_makes(uvdb_year_id:$year_id){
        items {
          id
          name
        }
      }
    }
  }  
`
