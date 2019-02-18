function mockFetch(mappings) {
  return url =>
    Promise.resolve({
      json: () => Promise.resolve(mappings[url])
    });
}

export function mockResult(results, count = results.length) {
  return {
    count,
    results
  };
}

export default mockFetch;
