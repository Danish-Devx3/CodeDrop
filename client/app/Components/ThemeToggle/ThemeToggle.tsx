"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Button from "../Button/Button";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-10 h-10 p-0 rounded-full bg-background border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-[3] transition-all dark:-rotate-90 dark:scale-0 text-foreground" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-foreground" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
