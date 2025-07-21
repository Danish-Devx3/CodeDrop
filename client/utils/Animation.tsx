
export const animateY = {
  hidden: { opacity: 0, y: 200 },
  visible: {
    opacity: 1,
    y: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
      type: "spring",
    },
  },
};
