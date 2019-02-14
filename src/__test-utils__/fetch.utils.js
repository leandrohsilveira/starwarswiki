function mockFetch(mappings) {
  return url =>
    Promise.resolve({
      json: () => Promise.resolve(mappings[url])
    });
}

export default mockFetch;
