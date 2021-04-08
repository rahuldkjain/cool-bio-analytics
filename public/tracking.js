(_ => {
  if(typeof window !== 'undefined') {
    const {
      screen: { width, height },
      navigator: { language },
      location: { hostname, pathname, search },
      localStorage,
      sessionStorage,
      document,
      history,
    } = window
    console.log('cool.bio')
  }
})();