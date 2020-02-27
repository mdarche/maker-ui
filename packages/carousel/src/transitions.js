export default type => {
  switch (type) {
    // case "slide":
    //   return {}
    // case "fade-down":
    //   return {
    //     from: { opacity: 0, translate: "transformY(-10px)" },
    //     enter: { opacity: 1, translate: "transformY(0)" },
    //     leave: { opacity: 0, translate: "transformY(10px)" },
    //   }
    default:
      return {
        from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
      }
  }
}
