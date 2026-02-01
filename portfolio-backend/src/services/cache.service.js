let cache = { data: null, expiry: 0 };

export function getCache() {
  return Date.now() < cache.expiry ? cache.data : null;
}

export function setCache(data, ttl) {
  cache = {
    data,
    expiry: Date.now() + ttl * 1000
  };
}
