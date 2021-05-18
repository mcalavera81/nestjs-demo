import { Period } from 'src/aggregations/dto/get-averages.dto';

export function array_chunks<T>(array: T[], chunk_size: Period): T[][] {
  return Array.from(Array(Math.ceil(array.length / chunk_size))) //Array length === Number of chunks
    .map((_, index) => index * chunk_size) //Index to slice from
    .map((begin) => array.slice(begin, begin + chunk_size));
}

export function array_chunks_processor<T, R>(
  array: T[],
  chunk_size: Period,
  chunk_processor: (chunk: T[]) => R,
): R[] {
  const chunks = array_chunks(array, chunk_size);
  return chunks.map(chunk_processor);
}
