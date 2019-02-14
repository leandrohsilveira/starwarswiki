describe('The index file', () => {
  it('inserts App component into "root" element', done => {
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);
    import('./index')
      .then(() => {
        done();
      })
      .catch(done.fail);
  });
});
