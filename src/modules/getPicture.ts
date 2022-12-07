export function getPicture<T extends 'AsDataURL' | 'AsFile' | 'AsFileToLocal'>(
  e: T
): void | string | File {}
