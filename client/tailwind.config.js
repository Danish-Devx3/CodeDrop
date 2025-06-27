module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./providers/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      color: {
        background:"var(--background)",
        foreground:"var(--foreground)",
        "0":"var(--color--bg-0)",
        "1":"var(--color--bg-1)",
        "2":"var(--color--bg-2)",
        "3":"var(--color--bg-3)",
        "4":"var(--color--bg-4)",
        "5":"var(--color--bg-5)",
        "gray-0":"var(--color--gray-0)",
        "gray-1":"var(--color--gray-1)",
        "gray-2":"var(--color--gray-2)",
        "gray-3":"var(--color--gray-3)",
        "gray-4":"var(--color--gray-4)",
        "gray-5":"var(--color--gray-5)",
        "green-light":"var(--color--green-light)",
        "green-dark":"var(--color--green-dark)",
        "rgba-0":"var(--color--rgba-0)",
        "rgba-1":"var(--color--rgba-1)",
        "rgba-2":"var(--color--rgba-2)",
        "rgba-3":"var(--color--rgba-3)",
        "rgba-4":"var(--color--rgba-4)",
      }
    },
  },
  plugins: [],
}