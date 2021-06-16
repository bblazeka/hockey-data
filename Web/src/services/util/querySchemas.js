export const geocode = /* GraphQL */ `
query geocode($query: String) {
    geocode(query: $query) {
      text,
      placeName,
      center
    }
  }`;