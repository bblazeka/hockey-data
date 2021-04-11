export function geocode(query)
{
  return `{
    geocode(query: "${query}") {
      text,
      placeName,
      center
    }
  }`
}