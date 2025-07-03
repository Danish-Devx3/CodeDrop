module.exports = {
    darkMode: ["class"],
    content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./providers/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			'0': 'var(--color--bg-0)',
  			'1': 'var(--color--bg-1)',
  			'2': 'var(--color--bg-2)',
  			'3': 'var(--color--bg-3)',
  			'4': 'var(--color--bg-4)',
  			'5': 'var(--color--bg-5)',
  			'gray-0': 'var(--color--gray-0)',
  			'gray-1': 'var(--color--gray-1)',
  			'gray-2': 'var(--color--gray-2)',
  			'gray-3': 'var(--color--gray-3)',
  			'gray-4': 'var(--color--gray-4)',
  			'gray-5': 'var(--color--gray-5)',
  			'green-light': 'var(--color--green-light)',
  			'green-dark': 'var(--color--green-dark)',
  			'rgba-0': 'var(--color--rgba-0)',
  			'rgba-1': 'var(--color--rgba-1)',
  			'rgba-2': 'var(--color--rgba-2)',
  			'rgba-3': 'var(--color--rgba-3)',
  			'rgba-4': 'var(--color--rgba-4)',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}