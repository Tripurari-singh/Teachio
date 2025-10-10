
interface ButtonInterface {
    label: string;
    onClick? : (event: React.MouseEvent<HTMLButtonElement>) => void;
    variant: "yellow" | "dark"; 
}

export function Button({ label, onClick, variant }: ButtonInterface) {
    // Define shared classes
    const baseClasses = "font-medium rounded-full text-lg px-8 py-4 text-center me-2 mb-2 focus:outline-none focus:ring-4 hover:cursor";

    // Define variant-specific classes
    const variantClasses = {
        yellow: "text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900",
        dark: "text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className={`${baseClasses} ${variantClasses[variant]}`}
        >
            {label}
        </button>
    );
}
